import { BoxHelper, CubicInterpolant, Material, Mesh, Scene, ShaderMaterial, Vector3 } from "three";
import { Chunk } from "./chunk";
import FastNoiseLite from 'fastnoise-lite';
import { ChunkBuilder } from "./chunkBuilder";
import { Player } from "./player";
import { createShaderMaterial } from "./shaderMaterialLoader";
import { clamp } from "three/src/math/MathUtils";

const RENDER_DISTANCE = 6;
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
noise.SetNoiseType(FastNoiseLite.NoiseType.Perlin);             // choose Perlin
noise.SetFrequency(.05);

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

    private generateChunk(chunkPosition: Vector3) {

        const FREQ = 0.05;



        const ChunkData: Uint8Array = new Uint8Array(CHUNK_SIZE * CHUNK_SIZE * CHUNK_SIZE);
        let numNonAir = 0;
        for (let x = 0; x < CHUNK_SIZE; x++) {
            for (let z = 0; z < CHUNK_SIZE; z++) {
                const worldX = chunkPosition.x * CHUNK_SIZE + x;
                const worldZ = chunkPosition.z * CHUNK_SIZE + z;
                const pv = this.fractalNoise((worldX + 0.01) / (300 * FREQ), (worldZ + 0.01) / (300 * FREQ), 4, 3, 0.35, 1, 64.45)
                const base_noise_ = (this.fractalNoise(worldX / (200 * FREQ), worldZ / (200 * FREQ), 3, 3, 0.35, 1, 0) + 1) / 2
                //const river_noise = this.fractalNoise(worldX / (300.1 * FREQ), worldZ / (300.1 * FREQ), 3, 2.580, 0.390, 1, 69);
                
                let river_multiplier = 0;
                /*if (Math.abs(river_noise) < 0.025) {
                    river_multiplier = 1;
                }
                else if (Math.abs(river_noise) < 0.05) {
                    const dif = (Math.abs(river_noise) - 0.025) / 0.025;
                    river_multiplier = 1 - dif;
                }*/

                const heightBeforeRiver = 200 * base_noise_ * evalCurve(pv);
                const h = heightBeforeRiver - 4 * river_multiplier;


                for (let y = 0; y < CHUNK_SIZE; y++) {
                    const worldY = chunkPosition.y * CHUNK_SIZE + y;
                    const index = x + y * CHUNK_SIZE + z * CHUNK_SIZE * CHUNK_SIZE;
                    //const position = chunkPosition.clone().multiplyScalar(CHUNK_SIZE).add(new Vector3(x, y, z));
                    // local pv = fractalNoise((position.X + 0.01) / 300, (position.Z + 0.01) / 300, 4, 3, 0.35, 1, 64.45)
                    const isWaterReservoir = h < SEA_LEVEL  // Below sea level
                        && worldY <= SEA_LEVEL            // Not above water surface
                        && worldY > h;

                    /* 
                    	if river_multiplier > 0 and heightBeforeRiver < 2000 * 0.05 then
		local river_depth = 4 * river_multiplier  -- how deep the river cuts
		-- river surface follows terrain noise
		local riverSurface = heightBeforeRiver - 2  -- slight carve below terrain
		if position.Y <= riverSurface and position.Y > riverSurface - river_depth then
			return Enum.Material.Water
		end
		if position.Y < riverSurface - river_depth and position.Y > riverSurface - river_depth - 2 then
			return Enum.Material.Mud
		end
	end
                    */

                    if (river_multiplier > 0 && heightBeforeRiver) {
                        const river_depth = 4 * river_multiplier;
                        const river_surface = heightBeforeRiver - 2;
                        if (worldY <= river_surface && worldY > river_surface - river_depth) {
                            ChunkData[index] = 5; // Water
                            continue;
                        }
                        if (worldY < river_surface - river_depth && worldY > river_surface - river_depth - 2) {
                            ChunkData[index] = 2; // Dirt
                            numNonAir++;
                            continue;
                        }
                    }

                    if (!isWaterReservoir && worldY <= h) {
                        const caveNoise = this.fractalNoise3D(worldX / (25 * FREQ), worldY / (25 * FREQ), worldZ / (48 * FREQ), 3, 3, 0.35, 1);
                        if (caveNoise > 0.4) {
                            ChunkData[index] = 0;
                            continue;
                        }
                    }

                    const sand_threshold = 1
                    if (h >= SEA_LEVEL && h < SEA_LEVEL + sand_threshold && worldY < h) {
                        ChunkData[index] = 4; // Sand
                        numNonAir++;
                        continue;
                    }

                    if (h < SEA_LEVEL) {
                        if (worldY < h && worldY > h - 2) {
                            ChunkData[index] = 2; // Dirt
                            numNonAir++;
                            continue;
                        }
                       
                        if (worldY <= SEA_LEVEL && worldY > h) {
                            ChunkData[index] = 5; // Water
                            continue;
                        }
                    }

                    if (h > 75 && worldY < h) {
                        if (h < 90) {
                            ChunkData[index] = 3; // Stone
                            numNonAir++;
                            continue;
                        } else if (worldY < h - 2) {
                            ChunkData[index] = 3; // Stone
                            numNonAir++;
                            continue;
                        } else {
                            ChunkData[index] = 6; // Snow
                            numNonAir++;
                            continue;
                        }

                    }
                    if (h >= 90 && worldY < h) {
                        ChunkData[index] = 6; // Snow
                        numNonAir++;
                        continue;
                    }






                    //const v = noise.GetNoise((x + chunkPosition.x * CHUNK_SIZE) * FREQ, 0, (z + chunkPosition.z * CHUNK_SIZE) * FREQ);
                    const y_ = worldY;
                    if (y_ < h - 4) {
                        ChunkData[index] = 3; // Stone
                        numNonAir++;
                    }
                    else if (y_ < h - 1) {
                        ChunkData[index] = 2; // Dirt
                        numNonAir++;
                    } else if (y_ < h) {
                        ChunkData[index] = 1; // Grass
                        numNonAir++;
                    } else {
                        ChunkData[index] = 0; // Air
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