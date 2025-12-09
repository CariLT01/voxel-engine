import { BoxHelper, CubicInterpolant, Material, Mesh, Scene, ShaderMaterial, Vector3 } from "three";
import { Chunk } from "./chunk";
import FastNoiseLite from 'fastnoise-lite';
import { ChunkBuilder } from "./chunkBuilder";
import { Player } from "./player";
import { createShaderMaterial } from "./shaderMaterialLoader";
import { clamp } from "three/src/math/MathUtils";
import { ChunkData } from "./chunkData";
import { BlockToIndexMap } from "./BlockTypes";

const RENDER_DISTANCE = 12;
const CHUNK_SIZE = 32;
const SEA_LEVEL = 20;

// SPLINES

/* 
    pv_curve = {
        {-1, 0.03},
        {-0.9,0.1},
        {-0.2, 0.25},
        {0, 0.3},
        {0.4, 0.8},
        {0.8, 1.0}
    }
}
*/

const times = [-1, -0.9, -0.2, 0, 0.4, 0.8];
const values = [0.03, 0.1, 0.25, 0.3, 0.8, 1.0];
const interp = new CubicInterpolant(times, values, 1);

function evalCurve(t: number): number {
    return interp.evaluate(t)[0] as number;
}

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
noise.SetNoiseType(FastNoiseLite.NoiseType.OpenSimplex2);             // choose Perlin
noise.SetFrequency(1);

type BlockData = {
    blockType: number
}
type ShaderLoaderResult = {
    atlas: {
        width: number;
        height: number;
        atlasData: {
            beginX: number;
            beginY: number;
            endX: number;
            endY: number;
        }[];
    };
    mat: ShaderMaterial;
    matTrans: ShaderMaterial
};

export class ChunkManager {

    private chunks: { [key: number]: Chunk } = {};
    private hashToPos: { [key: number]: Vector3 } = {};
    private pendingChunks: Record<number, boolean> = {};
    private loadedChunks: Record<number, boolean> = {};

    private chunkBuilder: ChunkBuilder = new ChunkBuilder(new Vector3(CHUNK_SIZE, CHUNK_SIZE, CHUNK_SIZE));

    private player: Player;
    private loadOffsets = this.precomputeLoadList();
    private shaderResult!: ShaderLoaderResult;


    constructor(player: Player) {
        this.player = player;
        this.asyncInit();
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

    private async asyncInit() {
        const result = await createShaderMaterial();
        this.shaderResult = result;
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

    /*
    local function fractalNoise(x:number, y:number, octaves:number, lacunarity:number, persistence:number, scale:number, seed:number)
    -- The sum of our octaves
    local value = 0 

    -- These coordinates will be scaled the lacunarity
    local x1: number = x 
    local y1: number = y

    -- Determines the effect of each octave on the previous sum
    local amplitude = 1

    for i = 1, octaves, 1 do
        -- Multiply the noise output by the amplitude and add it to our sum
        value += math.noise(x1 / scale, y1 / scale, seed) * amplitude

        -- Scale up our perlin noise by multiplying the coordinates by lacunarity
        y1 *= lacunarity
        x1 *= lacunarity

        -- Reduce our amplitude by multiplying it by persistence
        amplitude *= persistence
    end

    -- It is possible to have an output value outside of the range [-1,1]
    -- For consistency let's clamp it to that range
    return math.clamp(value, -1, 1)
end
    */

    private fractalNoise(x: number, y: number, octaves: number, lacunarity: number, persistence: number, scale: number, seed: number) {
        let value = 0;
        let x1 = x
        let y1 = y

        let amplitude = 1

        for (let i = 0; i < octaves; i++) {
            value += noise.GetNoise(x1 / scale, 0, y1 / scale) * amplitude;

            x1 *= lacunarity;
            y1 *= lacunarity;

            amplitude *= persistence
        }

        return clamp(value, -1, 1);
    }
    private fractalNoise3D(x: number, y: number, z: number, octaves: number, lacunarity: number, persistence: number, scale: number = 1) {
        let value = 0;
        let x1 = x
        let y1 = y
        let z1 = z

        let amplitude = 1

        for (let i = 0; i < octaves; i++) {
            value += noise.GetNoise(x1 / scale, y1 / scale, z1 / scale) * amplitude;

            x1 *= lacunarity;
            y1 *= lacunarity;
            z1 *= lacunarity;

            amplitude *= persistence
        }

        return clamp(value, -1, 1);
    }

    private generateChunk(chunkPosition: Vector3) : ChunkData {

        const FREQ = 1.5;



        const chunkData: ChunkData = new ChunkData();
        let numNonAir = 0;
        for (let x = 0; x < CHUNK_SIZE; x++) {
            for (let z = 0; z < CHUNK_SIZE; z++) {
                const worldX = chunkPosition.x * CHUNK_SIZE + x;
                const worldZ = chunkPosition.z * CHUNK_SIZE + z;
                
                const base_noise_ = (this.fractalNoise(worldX / (200 * FREQ), worldZ / (200 * FREQ), 3, 3, 0.35, 1, 0) + 1) / 2
                const h = base_noise_ * 100;

                //const h = this.fractalNoise(worldX / 15, worldZ / 15, 1, 0.35, 3, 1, 0) * 200;
                for (let y = 0; y < CHUNK_SIZE; y++) {
                    const worldY = chunkPosition.y * CHUNK_SIZE + y;
                    
                    if (worldY < h) {
                        chunkData.setBlockAt(x, y, z, {
                            blockType: BlockToIndexMap.get("grass_block") as number,
                        });
                    } else {
                        chunkData.setBlockAt(x, y, z, {
                            blockType: BlockToIndexMap.get("air") as number
                        });
                    }

                    



                }
            }
        }
        if (numNonAir === 0) {
            console.warn("Generated chunk filled with only air");
        }

        chunkData.flushChanges();

        return chunkData;
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
                //console.log("Pending: ", first[1]);
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
            scene.add(chunk.getMesh()[0]);
            scene.add(chunk.getMesh()[1]);

            this.player.addChunk(first[1], chunk);

            //console.log("Loaded chunk:", first[1]);
        }
    }



    update(currentPosition: Vector3, scene: Scene) {
        if (!this.shaderResult) return;
        //console.log("Update");
        const loadArray = this.createLoadList(currentPosition);

        const first = loadArray[0];
        if (!first) {
            //console.warn("No chunks to load:", loadArray);
            return;
        }

        if (!this.chunks[first[0]]) {
            const generated = this.generateChunk(first[1]);
            const chunk = new Chunk(generated, first[1], this.chunkBuilder, this.shaderResult);
            this.chunks[hashVec3Int(first[1])] = chunk;

            this.hashToPos[first[0]] = first[1];
            //console.log("Generated: ", first[1]);


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
                        const meshes = targetChunk.getMesh();
                        scene.remove(targetChunk.getMesh()[0]);
                        scene.remove(targetChunk.getMesh()[1]);
                        meshes[0].geometry.dispose();
                        meshes[1].geometry.dispose();
                        targetChunk.disposeMesh();

                    }

                }
                delete this.loadedChunks[chunk];
                this.player.removeChunk(this.hashToPos[chunk] as Vector3);
                //console.log("Unloaded chunk: ", this.hashToPos[chunk]);
            }
        }

    }
}