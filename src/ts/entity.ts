import { Quaternion, Vector3 } from "three";
import { Collider } from "./collider";
import { Chunk } from "./chunk";

const COLLISION_RADIUS = 5;
const GRAVITY_ACCEL = new Vector3(0, -32, 0);
const GRAVITY_FLUID = new Vector3(0, -2, 0)
const FRICTION = new Vector3(3, 0.4, 3);
const FRICTION_UNDERWATER = new Vector3(1, 2, 1);

const DRAG_JUMP = new Vector3(1.8, 0, 1.8);
const DRAG_FALL = new Vector3(1.8, 0.4, 1.8);

const NON_COLLIDEABLE = new Set([5]);
const FLUID_BLOCKS = new Set([5]);

const C1 = 73856093, C2 = 19349663, C3 = 83492791;
function hashVec3Int(p: Vector3): number {
    const ix = Math.floor(p.x) + 10000;
    const iy = Math.floor(p.y) + 10000;
    const iz = Math.floor(p.z) + 10000;
    return (ix * C1) ^ (iy * C2) ^ (iz * C3);
}

export class Entity {

    position: Vector3 = new Vector3(0, 0, 0);
    rotation: Quaternion = new Quaternion(0, 0, 0, 0);
    velocity: Vector3 = new Vector3();
    accel: Vector3 = new Vector3();

    width: number = 0.6;
    height: number = 1.8;
    jumpHeight: number = 1.25;

    collider: Collider = new Collider(new Vector3(), new Vector3());
    offsets: Set<Vector3> = new Set<Vector3>();
    chunkSize: Vector3 = new Vector3(32, 32, 32);
    chunks: Map<number, Chunk> = new Map<number, Chunk>();
    isGrounded: boolean = false;
    standingBlock: number = 0;

    constructor(position: Vector3, rotation = new Quaternion(), width: number = 0.6, height: number = 1.8) {
        this.precomputeOffsets();
        this.position = position;
        this.rotation = rotation;
        this.width = width;
        this.height = height;
    }

    getFriction() {
        if (FLUID_BLOCKS.has(this.standingBlock)) {
            return FRICTION_UNDERWATER;
        }
        if (this.isGrounded) {
            return FRICTION;
        }
        if (this.velocity.y > 0) {
            return DRAG_JUMP;
        }
        return DRAG_FALL
    }

    jump() {
        if (!this.isGrounded) {
            console.warn("{Debug} Can't jump in air!");
            return;
        };

        this.velocity.add(new Vector3(
            0, Math.sqrt(-2 * GRAVITY_ACCEL.y * this.jumpHeight)
        ));
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

    private updateCollider() {
        this.collider.p1.set(
            this.position.x - this.width / 2,
            this.position.y,
            this.position.z - this.width / 2
        );
        this.collider.p2.set(
            this.position.x + this.width / 2,
            this.position.y + this.height / 2,
            this.position.z + this.width / 2
        )
    }


    private getBlock(chunk: Chunk, world: Vector3) : number {
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
        if (block === null || block === undefined) {
            console.warn("Block not found. Case should not happen unless at chunk render distance borde.r");
            return -1;
        }
        return block;
    }

    private isSolidBlock(chunk: Chunk, world: Vector3): boolean {
        const block = this.getBlock(chunk, world);
        if (block == -1) return false;
        return !!block && block !== 0 && NON_COLLIDEABLE.has(block) == false;
    }
    getCurrentStandingBlock() {
        const blockPos = new Vector3(
            Math.floor(this.position.x),
            Math.floor(this.position.y),
            Math.floor(this.position.z)
        );

        const chunk = this.getChunkContaining(blockPos);
        if (!chunk) return -1;
        return this.getBlock(chunk, blockPos);
    }
    isStandingInFluid() {
        return FLUID_BLOCKS.has(this.standingBlock);
    }

    private updateGravity(delta: number) {
        if (FLUID_BLOCKS.has(this.standingBlock)) {
            this.velocity.add(GRAVITY_FLUID.clone().multiplyScalar(delta));
        } else {
            this.velocity.add(GRAVITY_ACCEL.clone().multiplyScalar(delta));
        }
        
    }

    checkCollisions(delta: number) {
        const potential_collisions = [];
        const adjusted_velocity = this.velocity.clone().multiplyScalar(delta);
        const vx = adjusted_velocity.x;
        const vy = adjusted_velocity.y;
        const vz = adjusted_velocity.z;

        for (const offset of this.offsets) {
            const world = this.worldBlockPosition(this.position, offset);
            const chunk = this.getChunkContaining(world);

            if (!chunk) {
                //console.warn("Failed to find chunk at: ", world);
                continue;
            };





            if (!this.isSolidBlock(chunk, world)) continue;
            const collisionData = this.collider.collide(
                new Collider(
                    world, world.clone().addScalar(1)
                ), adjusted_velocity
            );

            if (collisionData) {
                potential_collisions.push(
                    {
                        entry: collisionData.entry,
                        norm: collisionData.normal
                    }
                );
            }

        }
        if (potential_collisions.length > 0) {
            let smallestCollision: { entry: number, norm: Vector3 } = { entry: 0, norm: new Vector3() };
            let smallestEntry: number = Number.POSITIVE_INFINITY;

            for (const collision of potential_collisions) {
                if (collision.entry < smallestEntry) {
                    smallestEntry = collision.entry;
                    smallestCollision = collision;
                }
            }
            let { entry, norm } = smallestCollision;
            entry -= 0.001;

            if (norm.x !== 0) {
                this.velocity.x = 0;
                this.position.x += vx * entry;
            }
            if (norm.y !== 0) {
                this.velocity.y = 0;
                this.position.y += vy * entry;
            }
            if (norm.z !== 0) {
                this.velocity.z = 0;
                this.position.z += vz * entry;
            }
            if (norm.y === 1) {
                this.isGrounded = true;
            }
        } else {
            //console.warn("{Debug} No collisions");
        }
    }

    update(delta: number) {
        this.isGrounded = false;

        this.standingBlock = this.getCurrentStandingBlock();

        this.updateGravity(delta);
        this.updateCollider();

        

        this.velocity.add(this.accel.multiplyScalar(delta).multiply(this.getFriction()));
        this.accel.multiplyScalar(0);

        for (let i = 0; i < 3; i++) {
            this.checkCollisions(delta);
        }

        //console.log("Adding: ", this.velocity);
        this.position.add(this.velocity.clone().multiplyScalar(delta));
        //this.velocity.multiplyScalar(0);

        this.velocity.sub(this.velocity.clone().multiply(this.getFriction()).multiplyScalar(delta));
    }

    addChunk(pos: Vector3, chunk: Chunk) {
        //console.log("Entity: added chunk: ", pos);
        this.chunks.set(hashVec3Int(pos), chunk);
    }
    removeChunk(pos: Vector3) {
        const hash = hashVec3Int(pos);
        if (this.chunks.has(hash)) {
            this.chunks.delete(hash);
        }
    }
}