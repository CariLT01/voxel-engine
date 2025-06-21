import * as THREE from 'three';


const frontVertices = [
    [0, 0, 1], // 0 bottom-left
    [1, 0, 1], // 1 bottom-right
    [1, 1, 1], // 2 top-right
    [0, 1, 1], // 3 top-left
];

const frontTriangles = [
    0, 1, 2,
    0, 2, 3,
];

const backVertices = [
    [1, 0, 0], // 0 bottom-right
    [0, 0, 0], // 1 bottom-left
    [0, 1, 0], // 2 top-left
    [1, 1, 0], // 3 top-right
];

const backTriangles = [
    0, 1, 2,
    0, 2, 3,
];

const leftVertices = [
    [0, 0, 0], // 0 bottom-back
    [0, 0, 1], // 1 bottom-front
    [0, 1, 1], // 2 top-front
    [0, 1, 0], // 3 top-back
];

const leftTriangles = [
    0, 1, 2,
    0, 2, 3,
];

const rightVertices = [
    [1, 0, 1], // 0 bottom-front
    [1, 0, 0], // 1 bottom-back
    [1, 1, 0], // 2 top-back
    [1, 1, 1], // 3 top-front
];

const rightTriangles = [
    0, 1, 2,
    0, 2, 3,
];

const topVertices = [
    [0, 1, 1], // 0 front-left
    [1, 1, 1], // 1 front-right
    [1, 1, 0], // 2 back-right
    [0, 1, 0], // 3 back-left
];

const topTriangles = [
    0, 1, 2,
    0, 2, 3,
];

const bottomVertices = [
    [0, 0, 0], // 0 back-left
    [1, 0, 0], // 1 back-right
    [1, 0, 1], // 2 front-right
    [0, 0, 1], // 3 front-left
];

const bottomTriangles = [
    0, 1, 2,
    0, 2, 3,
];

const faceTris = [
    0, 1, 2,
    0, 2, 3,
];
const UVs: [number, number][] = [
    [0, 0], [1, 0], [1, 1],
    [0, 0], [1, 1], [0, 1],
];

const TextureIds = [
    {
        Front: 0,
        Back: 0,
        Left: 0,
        Right: 0,
        Top: 1,
        Bottom: 2
    }
]

type BlockData = {
    blockType: number
}
type FaceData = {
    facesVertices: number[][];
    facesIndices: number[];
}
type ShaderLoaderResultJustWithoutTheMaterial = {
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
};

function packVoxelData(x: number, y: number, z: number, normal: number, index: number) {
    //console.log("Pack: ", x, y, z, normal, index);
    let data = 0;
    data |= (x & 0x1F);         // bits 0-4
    data |= (y & 0x1F) << 5;    // bits 5-9
    data |= (z & 0x1F) << 10;   // bits 10-14
    data |= (normal & 0x7) << 15; // bits 15-17
    data |= (index & 0xFF) << 18; // bits 18-25
    //console.log("Got: ", data >>> 0);
    return data >>> 0;          // ensure unsigned 32-bit int
}

export class ChunkBuilder {

    private chunkSize: THREE.Vector3;


    constructor(chunSize: THREE.Vector3) {
        this.chunkSize = chunSize;



    }

    private checkVoid(
        chunkData: Uint8Array,
        p: THREE.Vector3,
        s: THREE.Vector3, // Shift direction (e.g., [1,0,0] for +X)
        negZdata: Uint8Array,
        posZdata: Uint8Array,
        negXdata: Uint8Array,
        posXdata: Uint8Array,
        negYdata: Uint8Array,
        posYdata: Uint8Array,
    ) {
        const pos = p.clone().add(s);
        let dataArray: Uint8Array = chunkData;
        if (!dataArray) {
            throw new Error(" { FATAL } Data array is null; Case should never happen");
        }
        let localX = pos.x, localY = pos.y, localZ = pos.z;

        // Only handle the axis we're shifting in (prioritize this neighbor)
        if (s.x !== 0) {
            if (pos.x < 0) {
                dataArray = negXdata;
                localX = this.chunkSize.x - 1;
            } else if (pos.x >= this.chunkSize.x) {
                dataArray = posXdata;
                localX = 0;
            }
        }
        else if (s.y !== 0) {
            if (pos.y < 0) {
                dataArray = negYdata;
                localY = this.chunkSize.y - 1;
            } else if (pos.y >= this.chunkSize.y) {
                dataArray = posYdata;
                localY = 0;
            }
        }
        else if (s.z !== 0) {
            if (pos.z < 0) {
                dataArray = negZdata;
                localZ = this.chunkSize.z - 1;
            } else if (pos.z >= this.chunkSize.z) {
                dataArray = posZdata;
                localZ = 0;
            }
        }

        // No neighbor → treat as empty
        if (!dataArray) {
            throw new Error(" { FATAL } No neighbor!");
        };

        // Calculate index and check block
        const idx = localX + localY * this.chunkSize.x + localZ * this.chunkSize.x * this.chunkSize.y;
        if (idx > this.chunkSize.x * this.chunkSize.y * this.chunkSize.z) {
            console.error(" { ERROR } Index out of bounds: ", idx);
            return false;
        }
        if (idx < 0) {
            console.error(" { ERROR } Index negative: ", idx);
            return false;
        }
        const block = dataArray[idx];
        if (block === null || block === undefined) {
            console.error(" { ERROR } Block not found. Case should not be possible. Attempted to get: ", idx);
            return false;
        }
        return block === 0; // Air or missing block
    }
    private addVertex(v: number[], p: THREE.Vector3) {
        return [v[0] + p.x, v[1] + p.y, v[2] + p.z];
    }

    private getUVFor(
        atlas: ShaderLoaderResultJustWithoutTheMaterial,
        blockType: number,
        [lu, lv]: [number, number],
        face: "Front" | "Back" | "Left" | "Right" | "Top" | "Bottom",
        flip: boolean = false   // <-- new flag
    ): [number, number] {
        const d = atlas.atlas.atlasData[TextureIds[blockType - 1][face]];
        const W = atlas.atlas.width, H = atlas.atlas.height;

        // tile corners in [0–1] space
        const u0 = d.beginX / W, u1 = d.endX / W;
        const v0 = d.beginY / H, v1 = d.endY / H;

        // pick corner
        let u = lu === 0 ? u0 : u1;
        let v = lv === 0 ? v0 : v1;

        if (flip) {
            // 180° around tile center
            u = u0 + u1 - u;
            v = v0 + v1 - v;
        }

        return [u, v];
    }

    private calculateAo(currentposition: THREE.Vector3, vertexLocal: THREE.Vector3, chunkData: Uint8Array, negZdata: Uint8Array, posZdata: Uint8Array, negXdata: Uint8Array, posXdata: Uint8Array, negYdata: Uint8Array, posYdata: Uint8Array) {
        const bx = currentposition.x;
        const by = currentposition.y;
        const bz = currentposition.z;
        const localY = vertexLocal.y; // 0 or 1
        const localZ = vertexLocal.z; // 0 or 1

        let side1Pos, side2Pos, cornerPos;
        if (localY === 0 && localZ === 0) { // Vertex 0
            side1Pos = new THREE.Vector3(bx, by - 1, bz);
            side2Pos = new THREE.Vector3(bx, by, bz - 1);
            cornerPos = new THREE.Vector3(bx, by - 1, bz - 1);
        } else if (localY === 1 && localZ === 0) { // Vertex 1
            side1Pos = new THREE.Vector3(bx, by + 2, bz);
            side2Pos = new THREE.Vector3(bx, by + 1, bz - 1);
            cornerPos = new THREE.Vector3(bx, by + 2, bz - 1);
        } else if (localY === 0 && localZ === 1) { // Vertex 2
            side1Pos = new THREE.Vector3(bx, by - 1, bz + 1);
            side2Pos = new THREE.Vector3(bx, by, bz + 2);
            cornerPos = new THREE.Vector3(bx, by - 1, bz + 2);
        } else { // Vertex 3
            side1Pos = new THREE.Vector3(bx, by + 2, bz + 1);
            side2Pos = new THREE.Vector3(bx, by + 1, bz + 2);
            cornerPos = new THREE.Vector3(bx, by + 2, bz + 2);
        }

        // Check solidity (assuming checkVoid returns true for air, false for solid)
        const side1Solid = !this.checkVoid(chunkData, side1Pos, new THREE.Vector3(0, 0, 0), negZdata, posZdata, negXdata, posXdata, negYdata, posYdata);
        const side2Solid = !this.checkVoid(chunkData, side2Pos, new THREE.Vector3(0, 0, 0), negZdata, posZdata, negXdata, posXdata, negYdata, posYdata);
        const cornerSolid = !this.checkVoid(chunkData, cornerPos, new THREE.Vector3(0, 0, 0), negZdata, posZdata, negXdata, posXdata, negYdata, posYdata);

        // Calculate AO value
        let ao = 0;
        if (cornerSolid) ao = 3;
        else if (side1Solid && side2Solid) ao = 2;
        else if (side1Solid || side2Solid) ao = 1;
        else ao = 0;

        return ao;
    }

    buildGeometryFromChunkData(chunkData: Uint8Array, negZdata: Uint8Array, posZdata: Uint8Array, negXdata: Uint8Array, posXdata: Uint8Array, negYdata: Uint8Array, posYdata: Uint8Array, atlasData: ShaderLoaderResultJustWithoutTheMaterial) {
        // Indexing of  x + y * width + z * width * height

        const facesData: FaceData[] = [];
        const vertices: number[][] = [];
        const normals: number[] = [];
        const uvs: number[] = [];
        const aos: number[] = [];

        const vertexDataPacked: number[] = [];
        let facesBuilt = 0;
        for (let x = 0; x < this.chunkSize.x; x++) {
            for (let y = 0; y < this.chunkSize.y; y++) {
                for (let z = 0; z < this.chunkSize.z; z++) {

                    const index = x + y * this.chunkSize.x + z * this.chunkSize.x * this.chunkSize.y;
                    if (chunkData[index] == 0) {
                        continue;
                    }
                    const blockType = chunkData[index];


                    const currentposition = new THREE.Vector3(x, y, z);

                    if (this.checkVoid(chunkData, currentposition, new THREE.Vector3(0, 0, 1), negZdata, posZdata, negXdata, posXdata, negYdata, posYdata)) {
                        facesBuilt++;
                        for (let i = 0; i < faceTris.length; i++) {
                            const vi = faceTris[i];
                            const vertexLocal = frontVertices[vi]; // Local vertex position, e.g., (0,0,0)
                            const vertexWorld = this.addVertex(vertexLocal, currentposition); // World position
                            //vertices.push(vertexWorld);
                            //normals.push(-1, 0, 0);

                            

                            // UVs
                            //const [u, v] = this.getUVFor(atlasData, blockType, UVs[i], "Front", true);
                            //uvs.push(u, v);

                            const packed = packVoxelData(vertexWorld[0], vertexWorld[1], vertexWorld[2], 1, TextureIds[blockType - 1]["Front"]);
                            vertexDataPacked.push(packed);

                            //aos.push(this.calculateAo(currentposition, new THREE.Vector3(...vertexLocal), chunkData, negZdata, posZdata, negXdata, posXdata, negYdata, posYdata))
                        }
                    }
                    if (this.checkVoid(chunkData, currentposition, (new THREE.Vector3(0, 0, -1)), negZdata, posZdata, negXdata, posXdata, negYdata, posYdata)) {
                        facesBuilt++;
                        for (let i = 0; i < faceTris.length; i++) {
                            const vi = faceTris[i];
                            const vertexLocal = backVertices[vi]; // Local vertex position, e.g., (0,0,0)
                            const vertexWorld = this.addVertex(vertexLocal, currentposition); // World position
                            //vertices.push(vertexWorld);
                            //normals.push(-1, 0, 0);

                            // UVs
                            //const [u, v] = this.getUVFor(atlasData, blockType, UVs[i], "Back", true);

                            const packed = packVoxelData(vertexWorld[0], vertexWorld[1], vertexWorld[2], 2, TextureIds[blockType - 1]["Back"]);
                            vertexDataPacked.push(packed);

                            //aos.push(this.calculateAo(currentposition, new THREE.Vector3(...vertexLocal), chunkData, negZdata, posZdata, negXdata, posXdata, negYdata, posYdata))
                        }

                    }
                    if (this.checkVoid(chunkData, currentposition, (new THREE.Vector3(0, 1, 0)), negZdata, posZdata, negXdata, posXdata, negYdata, posYdata)) {
                        facesBuilt++;
                        for (let i = 0; i < faceTris.length; i++) {
                            const vi = faceTris[i];
                            const vertexLocal = topVertices[vi]; // Local vertex position, e.g., (0,0,0)
                            const vertexWorld = this.addVertex(vertexLocal, currentposition); // World position
                            //vertices.push(vertexWorld);
                            //normals.push(-1, 0, 0);

                            // UVs
                            //const [u, v] = this.getUVFor(atlasData, blockType, UVs[i], "Top", true);
                            //uvs.push(u, v);
                            const packed = packVoxelData(vertexWorld[0], vertexWorld[1], vertexWorld[2], 3, TextureIds[blockType - 1]["Top"]);
                            vertexDataPacked.push(packed);
                            //aos.push(this.calculateAo(currentposition, new THREE.Vector3(...vertexLocal), chunkData, negZdata, posZdata, negXdata, posXdata, negYdata, posYdata))
                        }

                    }
                    if (this.checkVoid(chunkData, currentposition, (new THREE.Vector3(0, -1, 0)), negZdata, posZdata, negXdata, posXdata, negYdata, posYdata)) {
                        facesBuilt++;
                        for (let i = 0; i < faceTris.length; i++) {
                            const vi = faceTris[i];
                            const vertexLocal = bottomVertices[vi]; // Local vertex position, e.g., (0,0,0)
                            const vertexWorld = this.addVertex(vertexLocal, currentposition); // World position
                            //vertices.push(vertexWorld);
                            //normals.push(-1, 0, 0);
                            const packed = packVoxelData(vertexWorld[0], vertexWorld[1], vertexWorld[2], 4, TextureIds[blockType - 1]["Bottom"]);
                            vertexDataPacked.push(packed);
                            // UVs
                            //const [u, v] = this.getUVFor(atlasData, blockType, UVs[i], "Bottom", true);
                            //uvs.push(u, v);

                            //aos.push(this.calculateAo(currentposition, new THREE.Vector3(...vertexLocal), chunkData, negZdata, posZdata, negXdata, posXdata, negYdata, posYdata))
                        }

                    }
                    if (this.checkVoid(chunkData, currentposition, (new THREE.Vector3(1, 0, 0)), negZdata, posZdata, negXdata, posXdata, negYdata, posYdata)) {
                        facesBuilt++;
                        for (let i = 0; i < faceTris.length; i++) {
                            const vi = faceTris[i];
                            const vertexLocal = rightVertices[vi]; // Local vertex position, e.g., (0,0,0)
                            const vertexWorld = this.addVertex(vertexLocal, currentposition); // World position
                            //vertices.push(vertexWorld);
                            //normals.push(-1, 0, 0);
                            const packed = packVoxelData(vertexWorld[0], vertexWorld[1], vertexWorld[2], 5, TextureIds[blockType - 1]["Right"]);
                            vertexDataPacked.push(packed);
                            // UVs
                            //const [u, v] = this.getUVFor(atlasData, blockType, UVs[i], "Right", true);
                            //uvs.push(u, v);

                            //aos.push(this.calculateAo(currentposition, new THREE.Vector3(...vertexLocal), chunkData, negZdata, posZdata, negXdata, posXdata, negYdata, posYdata))
                        }

                    }
                    if (this.checkVoid(chunkData, currentposition, (new THREE.Vector3(-1, 0, 0)), negZdata, posZdata, negXdata, posXdata, negYdata, posYdata)) {
                        facesBuilt++;
                        for (let i = 0; i < faceTris.length; i++) {
                            const vi = faceTris[i];
                            const vertexLocal = leftVertices[vi]; // Local vertex position, e.g., (0,0,0)
                            const vertexWorld = this.addVertex(vertexLocal, currentposition); // World position
                            //vertices.push(vertexWorld);
                            //normals.push(-1, 0, 0);
                            //console.log(vertexWorld);

                            // UVs
                            //const [u, v] = this.getUVFor(atlasData, blockType, UVs[i], "Left", true);
                            //uvs.push(u, v);
                            const packed = packVoxelData(vertexWorld[0], vertexWorld[1], vertexWorld[2], 6, TextureIds[blockType - 1]["Left"]);
                            vertexDataPacked.push(packed);
                            //aos.push(this.calculateAo(currentposition, new THREE.Vector3(...vertexLocal), chunkData, negZdata, posZdata, negXdata, posXdata, negYdata, posYdata))
                        }

                    }


                }
            }
        }


        const verticesFlattened: number[] = [];

        for (const vertex of vertices) {
            verticesFlattened.push(vertex[0], vertex[1], vertex[2]);
        }

        const geometry = new THREE.BufferGeometry();
        //geometry.setAttribute('position', new THREE.Float32BufferAttribute(verticesFlattened, 3));
        //geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
        //geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
        //geometry.setAttribute('ao', new THREE.Float16BufferAttribute(aos, 1));
        //console.log(vertexDataPacked);
        
        geometry.setAttribute('data', new THREE.Int32BufferAttribute(vertexDataPacked, 1));

        verticesFlattened.length = 0;
        vertices.length = 0;
        uvs.length = 0;
        normals.length = 0;

        console.log("# faces built: ", facesBuilt)

        return geometry;



    }
}

