import { Box3, Box3Helper, PerspectiveCamera, Quaternion, Scene, Vector3 } from "three";
import { Chunk } from "./chunk";
import { clamp } from "three/src/math/MathUtils";

const C1 = 73856093, C2 = 19349663, C3 = 83492791;
function hashVec3Int(p: Vector3): number {
    const ix = Math.floor(p.x) + 10000;
    const iy = Math.floor(p.y) + 10000;
    const iz = Math.floor(p.z) + 10000;
    return (ix * C1) ^ (iy * C2) ^ (iz * C3);
}

const GRAVITY = new Vector3(0, -9, 0);
const COLLISION_RADIUS = 5;
const PLAYER_SIZE = new Vector3(1, 2, 1);
const EPSILON = 0.000; // Small value to prevent precision issues

export class PlayerOld {
    private position: Vector3;
    private velocity = new Vector3(0, 0, 0);
    private temporaryVelocity = new Vector3(0, 0, 0);
    private rotation: Quaternion = new Quaternion();
    private chunks = new Map<number, Chunk>();
    private offsets = new Set<Vector3>();
    private chunkSize = new Vector3(32, 32, 32);

    private mouseDeltaX = 0;
    private mouseDeltaY = 0;
    private theta = 0;
    private phi = 0;

    private camera: PerspectiveCamera;
    private scene: Scene;

    private keysPressed: Set<string> = new Set<string>();

    private previousPositions: Map<number, Box3Helper> = new Map<number, Box3Helper>();
    private currentPositions: Map<number, Box3Helper> = new Map<number, Box3Helper>();
    private hashToPositions: Map<number, Vector3> = new Map<number, Vector3>();

    constructor(startPos: Vector3, camera: PerspectiveCamera, scene: Scene) {
        this.position = startPos.clone();
        this.precomputeOffsets();
        this.keyboardEvents();
        this.mouseEvents();

        this.camera = camera;
        this.scene = scene;
    }

    addChunk(pos: Vector3, chunk: Chunk) {
        console.log("Player: added chunk: ", pos);
        this.chunks.set(hashVec3Int(pos), chunk);
    }

    update(delta: number) {
        this.temporaryVelocity = this.temporaryVelocity.multiplyScalar(0);
        this.currentPositions.clear();

        this.updateRotation();

        this.physicsSubstep(delta);

        this.updateCamera();
        this.removeOldHelpers();
        this.previousPositions.clear();
        this.currentPositions.forEach((helper, position) => {
            const positionClone = position;
            // Cloning Box3Helper isn’t built-in. You probably need to create a new helper based on the original's box

            this.previousPositions.set(positionClone, helper);
        });
    }
    getPosition() {
        return this.position;
    }

    private physicsSubstep(delta: number) {
        const N_SUBSTEPS = 4;
        for (let i = 0; i < N_SUBSTEPS; i++) {
            this.temporaryVelocity.set(0, 0, 0); // Reset temporary velocity each substep
            this.applyGravity(delta / N_SUBSTEPS);
            this.updateTranslation(delta / N_SUBSTEPS);
            const nextPos = this.integratePosition(delta / N_SUBSTEPS);
            const { min, max } = this.buildAABB(nextPos);
            this.resolveCollisions(nextPos, min, max);
            this.position.copy(nextPos);
        }
        const { min, max } = this.buildAABB(this.position);
        this.resolveCollisions(this.position, min, max);
    }

    private updateRotation() {
        const xh = this.mouseDeltaX / innerWidth;
        const yh = this.mouseDeltaY / innerHeight;

        this.phi += -xh * 5;
        this.theta = clamp(this.theta + -yh * 5, -Math.PI / 2, Math.PI / 2);

        const qx = new Quaternion();
        qx.setFromAxisAngle(new Vector3(0, 1, 0), this.phi);
        const qy = new Quaternion();
        qy.setFromAxisAngle(new Vector3(1, 0, 0), this.theta);

        const q = new Quaternion();
        q.multiply(qx);
        q.multiply(qy);

        this.rotation.copy(q);

        this.mouseDeltaX = 0;
        this.mouseDeltaY = 0;


    }

    private updateCamera() {
        this.camera.quaternion.copy(this.rotation);
        this.camera.position.copy(this.position.clone().add(PLAYER_SIZE.clone().multiplyScalar(0.4)));
    }

    private updateTranslation(dt: number) {
        const forwardVelocity = (this.keysPressed.has('w') ? 1 : 0) + (this.keysPressed.has('s') ? -1 : 0);
        const strafeVelocity = (this.keysPressed.has('a') ? 1 : 0) + (this.keysPressed.has('d') ? -1 : 0);

        const qx = new Quaternion();
        qx.setFromAxisAngle(new Vector3(0, 1, 0), this.phi);

        const forward = new Vector3(0, 0, -1);
        forward.applyQuaternion(qx);
        forward.multiplyScalar(forwardVelocity * 10 * dt);

        const left = new Vector3(-1, 0, 0);
        left.applyQuaternion(qx);
        left.multiplyScalar(strafeVelocity * 10 * dt);

        this.temporaryVelocity.add(left);
        this.temporaryVelocity.add(forward);

        if (this.keysPressed.has(" ")) {
            this.velocity.add(new Vector3(0, 0.5, 0));
        }
    }

    private keyboardEvents() {
        document.addEventListener("keydown", (e) => {
            this.keysPressed.add(e.key);
        })
        document.addEventListener("keyup", (e) => {
            this.keysPressed.delete(e.key);
        })
    }

    private mouseEvents() {
        document.addEventListener("mousemove", (e) => {
            this.mouseDeltaX = e.movementX;
            this.mouseDeltaY = e.movementY;
        })
    }

    private applyGravity(delta: number) {
        // Δv = g * dt
        this.velocity.addScaledVector(GRAVITY, delta);
    }

    private integratePosition(delta: number): Vector3 {
        // nextPos = pos + v * dt
        return this.position.clone().addScaledVector(this.velocity, delta).add(this.temporaryVelocity);
    }

    private buildAABB(pos: Vector3) {
        const half = PLAYER_SIZE.clone().divideScalar(2);
        return {
            min: pos.clone().sub(half),
            max: pos.clone().add(half),
        };
    }

    private addCollisionHelper(position: Vector3) {
        const hash = hashVec3Int(position);

        // Always mark as current (even if helper exists from previous frame)
        if (this.currentPositions.has(hash)) return;

        // Reuse existing helper from previous frame if available
        if (this.previousPositions.has(hash)) {
            const helper = this.previousPositions.get(hash)!;
            this.currentPositions.set(hash, helper);
            return;
        }

        // Create new helper
        //const half = new Vector3(0.5, 0.5, 0.5);
        const boxMin = position.clone()
        const boxMax = position.clone().addScalar(1);
        const box3 = new Box3(boxMin, boxMax);
        const helper = new Box3Helper(box3, 0x00ff00);

        this.currentPositions.set(hash, helper);
        this.scene.add(helper);
    }

    private removeOldHelpers() {
        // Remove helpers that were in previous frame but not current frame
        for (const [hash, helper] of this.previousPositions) {
            if (!this.currentPositions.has(hash)) {
                this.scene.remove(helper);
            }
        }
    }

    private resolveCollisions(nextPos: Vector3, min: Vector3, max: Vector3) {
        for (const offset of this.offsets) {
            const world = this.worldBlockPosition(nextPos, offset);
            const chunk = this.getChunkContaining(world);

            if (!chunk) {
                //console.warn("Failed to find chunk at: ", world);
                continue;
            };
            if (!this.isSolidBlock(chunk, world)) continue;
            this.addCollisionHelper(world);
            const { vMin, vMax } = this.voxelAABB(world);
            if (this.aabbIntersect(min, max, vMin, vMax)) {
                console.warn("Detected collision")
                this.pushOut(nextPos, min, max, world);
            }
        }
    }

    private precomputeOffsets() {
        for (let x = -COLLISION_RADIUS; x <= COLLISION_RADIUS; x++) {
            for (let y = -COLLISION_RADIUS; y <= COLLISION_RADIUS; y++) {
                for (let z = -COLLISION_RADIUS; z <= COLLISION_RADIUS; z++) {
                    const v = new Vector3(x, y, z);
                    if (v.lengthSq() <= COLLISION_RADIUS * COLLISION_RADIUS) {
                        this.offsets.add(v);
                    }
                }
            }
        }
    }

    private worldBlockPosition(pos: Vector3, offset: Vector3): Vector3 {
        // world-space integer block pos
        return pos.clone().add(offset).round();
    }

    private getChunkContaining(world: Vector3): Chunk | undefined {
        const cPos = new Vector3(
            Math.floor(world.x / this.chunkSize.x),
            Math.floor(world.y / this.chunkSize.y),
            Math.floor(world.z / this.chunkSize.z)
        );
        return this.chunks.get(hashVec3Int(cPos));
    }

    private isSolidBlock(chunk: Chunk, world: Vector3): boolean {
        const chunkX = Math.floor(world.x / this.chunkSize.x);
        const chunkY = Math.floor(world.y / this.chunkSize.y);
        const chunkZ = Math.floor(world.z / this.chunkSize.z);

        const localX = world.x - chunkX * this.chunkSize.x;
        const localY = world.y - chunkY * this.chunkSize.y;
        const localZ = world.z - chunkZ * this.chunkSize.z;

        const idx = localX
            + localY * this.chunkSize.x
            + localZ * this.chunkSize.x * this.chunkSize.y;
        const block = chunk.getData()[idx];
        if (!block) {
            console.warn("Block not found. Case should not happen unless at chunk render distance borde.r");
            return false;
        }
        return !!block && block !== 0;
    }

    private voxelAABB(world: Vector3) {
        return {
            vMin: world.clone(),
            vMax: world.clone().addScalar(1),
        };
    }

    private aabbIntersect(
        minA: Vector3,
        maxA: Vector3,
        minB: Vector3,
        maxB: Vector3
    ): boolean {
        return (
            maxA.x > minB.x &&
            minA.x < maxB.x &&
            maxA.y > minB.y &&
            minA.y < maxB.y &&
            maxA.z > minB.z &&
            minA.z < maxB.z
        );
    }

    private pushOut(
        nextPos: Vector3,
        min: Vector3,
        max: Vector3,
        world: Vector3
    ) {
        const { vMin, vMax } = this.voxelAABB(world);

        const penX = Math.min(max.x - vMin.x, vMax.x - min.x);
        const penY = Math.min(max.y - vMin.y, vMax.y - min.y);
        const penZ = Math.min(max.z - vMin.z, vMax.z - min.z);

        if (penX <= penY && penX <= penZ) {
            const dir = nextPos.x < world.x ? -1 : 1;
            nextPos.x += (penX + EPSILON) * dir;
            this.velocity.x = 0;
        } else if (penY <= penZ) {
            const dir = nextPos.y < world.y ? -1 : 1;
            nextPos.y += (penY + EPSILON) * dir;
            this.velocity.y = 0;
        } else {
            const dir = nextPos.z < world.z ? -1 : 1;
            nextPos.z += (penZ + EPSILON) * dir;
            this.velocity.z = 0;
        }
    }
}