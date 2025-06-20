import { BoxHelper, Material, Mesh, Scene, Vector3 } from "three";
import { Chunk } from "./chunk";
import FastNoiseLite from 'fastnoise-lite';
import { ChunkBuilder } from "./chunkBuilder";
import { Player } from "./player";

const RENDER_DISTANCE = 6;
const CHUNK_SIZE = 32;

function hashVec3Int(p: Vector3): number {
    const C1 = 73856093;
    const C2 = 19349663;
    const C3 = 83492791;
    const ix = Math.floor(p.x) + 10000;
    const iy = Math.floor(p.y) + 10000;
    const iz = Math.floor(p.z) + 10000;
    return (ix * C1) ^ (iy * C2) ^ (iz * C3);
}

const noise = new FastNoiseLite(1234);
noise.SetNoiseType(FastNoiseLite.NoiseType.Perlin);             // choose Perlin
noise.SetFrequency(.05);

type BlockData = {
    blockType: number
}

export class ChunkManager {

    private chunks: {[key: number]: Chunk} = {};
    private hashToPos: {[key: number]: Vector3} = {};
    private pendingChunks: Record<number, boolean> = {};
    private loadedChunks: Record<number, boolean> = {};

    private chunkBuilder: ChunkBuilder = new ChunkBuilder(new Vector3(CHUNK_SIZE, CHUNK_SIZE, CHUNK_SIZE));

    private player: Player;
    private loadOffsets = this.precomputeLoadList();

    constructor(player: Player) {
        this.player = player;
    }

    private precomputeLoadList() {

        const loadList: Vector3[] = [];
        const playerPosition = new Vector3()
        for (let x = -RENDER_DISTANCE; x <= RENDER_DISTANCE; x++) {
            for (let y = -RENDER_DISTANCE; y <= RENDER_DISTANCE; y++) {
                for (let z = -RENDER_DISTANCE; z <= RENDER_DISTANCE; z++) {
                    const p = new Vector3(x, y, z).add(playerPosition);



                    loadList.push(p);
                }
            }
        }

        // Sort by distance

        loadList.sort((a, b) =>
            a.distanceToSquared(playerPosition) - b.distanceToSquared(playerPosition)
        );

        return loadList;
    }

    private createLoadList(playerPosition: Vector3, skipLoaded: boolean = true) {

        const loadList: Map<number, Vector3> = new Map<number, Vector3>();

        for (const pos of this.loadOffsets) {

            const p = pos.clone().add(playerPosition);
            const hash = hashVec3Int(p);

            if (this.loadedChunks[hash] && skipLoaded === true) {
                continue;
            }

            if (this.pendingChunks[hash] && skipLoaded === true) {
                continue;
            }

            loadList.set(hash, p);
        }


        return Array.from(loadList.entries());

    }

    private generateChunk(chunkPosition: Vector3) {

        const FREQ = 0.2;

        const ChunkData: Uint8Array = new Uint8Array(CHUNK_SIZE * CHUNK_SIZE * CHUNK_SIZE);
        let numNonAir = 0;
        for (let x = 0; x < CHUNK_SIZE; x++) {
            for (let y = 0; y < CHUNK_SIZE; y++) {
                for (let z = 0; z < CHUNK_SIZE; z++) {
                    const index = x + y * 32 + z * 32 * 32;

                    const v = noise.GetNoise((x + chunkPosition.x * CHUNK_SIZE) * FREQ, 0, (z + chunkPosition.z * CHUNK_SIZE) * FREQ);
                    const y_ = y + chunkPosition.y * CHUNK_SIZE;
                    const h = Math.pow(v, 4) * 200;
                    if (y_ < h) {
                        ChunkData[index] = 1;
                        numNonAir++;
                    } else {
                        ChunkData[index] = 0;
                    }



                }
            }
        }
        if (numNonAir === 0) {
            console.warn("Generated chunk filled with only air");
        }
        return ChunkData;
    }

    private hasAllNeighbors(chunkPosition: Vector3) {
        const sides = [
            new Vector3(1, 0, 0),
            new Vector3(-1, 0, 0),
            new Vector3(0, 1, 0),
            new Vector3(0, -1, 0),
            new Vector3(0, 0, 1),
            new Vector3(0, 0, -1),
        ];

        for (const side of sides) {
            const pos = chunkPosition.clone().add(side);
            const hash = hashVec3Int(pos);
            if (!this.chunks[hash]) {
                //console.log("Chunk: ", chunkPosition, " missing neighbor(s) including ", pos);
                return false;
            }
        }
        return true;
    }
    private getSides(chunkPosition: Vector3) {

        return {
            negZ: this.chunks[hashVec3Int(chunkPosition.clone().add(new Vector3(0, 0, -1)))]!,
            negX: this.chunks[hashVec3Int(chunkPosition.clone().add(new Vector3(-1, 0, 0)))]!,
            negY: this.chunks[hashVec3Int(chunkPosition.clone().add(new Vector3(0, -1, 0)))]!,
            posZ: this.chunks[hashVec3Int(chunkPosition.clone().add(new Vector3(0, 0, 1)))]!,
            posX: this.chunks[hashVec3Int(chunkPosition.clone().add(new Vector3(1, 0, 0)))]!,
            posY: this.chunks[hashVec3Int(chunkPosition.clone().add(new Vector3(0, 1, 0)))]!,
        }

    }

    private loadIfPossible(first: [number, Vector3], scene: Scene) {
        const hasNeighbors = this.hasAllNeighbors(first[1]);
        if (hasNeighbors == false) {
            if (!this.pendingChunks[first[0]]) {
                console.log("Pending: ", first[1]);
                this.pendingChunks[first[0]] = true;
            }
        } else {
            const chunk = this.chunks[first[0]];
            if (!chunk) {
                console.warn("Could not find chunk for: ", first[1]);
                return;
            };
            const sides = this.getSides(first[1]);
            chunk.buildChunk(sides.negZ, sides.posZ, sides.negX, sides.posX, sides.negY, sides.posY);
            this.loadedChunks[first[0]] = true;
            delete this.pendingChunks[first[0]];

            //const boxHelper = new BoxHelper(chunk.getMesh() as Mesh, 0xff0000);
            //scene.add(boxHelper);
            scene.add(chunk.getMesh()!);

            this.player.addChunk(first[1], chunk);

            console.log("Loaded chunk:", first[1]);
        }
    }



    update(currentPosition: Vector3, scene: Scene) {
        //console.log("Update");
        const loadArray = this.createLoadList(currentPosition);

        const first = loadArray[0];
        if (!first) {
            //console.warn("No chunks to load:", loadArray);
            return;
        }

        if (!this.chunks[first[0]]) {
            const generated = this.generateChunk(first[1]);
            const chunk = new Chunk(generated, first[1], this.chunkBuilder);
            this.chunks[hashVec3Int(first[1])] = chunk;

            this.hashToPos[first[0]] =  first[1];
            console.log("Generated: ", first[1]);


        }

        // Check the neighbors

        if (!this.loadedChunks[first[0]]) {
            this.loadIfPossible(first, scene);
        }

        // Load pending

        for (const pending of Object.keys(this.pendingChunks).map(k => Number(k))) {
            const p = this.hashToPos[pending];
            if (!p) {
                console.warn("unable to find pos for hash: ", pending);
                continue;
            }

            this.loadIfPossible([pending, p], scene);
        }

        // Unload any unecessary
        const loadArray2 = this.createLoadList(currentPosition, false);
        const loadMap: Record<number, boolean> = {};
        for (const c of loadArray2) {
            loadMap[c[0]] = true;
        }
        //console.log(set);

        for (const chunk of Object.keys(this.loadedChunks).map(k => Number(k))) {
            if (!loadMap[chunk]) {
                const targetChunk = this.chunks[chunk];
                if (targetChunk) {
                    if (targetChunk.getMesh()) {
                        const m = targetChunk.getMesh() as Mesh;
                        scene.remove(targetChunk.getMesh() as Mesh);
                        m.geometry.dispose();
                        targetChunk.disposeMesh();

                    }

                }
                delete this.loadedChunks[chunk];
                this.player.removeChunk(this.hashToPos[chunk] as Vector3);
                console.log("Unloaded chunk: ", this.hashToPos[chunk]);
            }
        }

    }
}