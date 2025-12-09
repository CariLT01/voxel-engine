import * as THREE from "three";
import { ChunkData } from "./chunkData";
import BlockTypes, { TransparentBlockTypes } from "./BlockTypes";

const frontVertices = [
    [0, 0, 1], // 0 bottom-left
    [1, 0, 1], // 1 bottom-right
    [1, 1, 1], // 2 top-right
    [0, 1, 1], // 3 top-left
];

const frontTriangles = [0, 1, 2, 0, 2, 3];

const backVertices = [
    [1, 0, 0], // 0 bottom-right
    [0, 0, 0], // 1 bottom-left
    [0, 1, 0], // 2 top-left
    [1, 1, 0], // 3 top-right
];

const backTriangles = [0, 1, 2, 0, 2, 3];

const leftVertices = [
    [0, 0, 0], // 0 bottom-back
    [0, 0, 1], // 1 bottom-front
    [0, 1, 1], // 2 top-front
    [0, 1, 0], // 3 top-back
];

const leftTriangles = [0, 1, 2, 0, 2, 3];

const rightVertices = [
    [1, 0, 1], // 0 bottom-front
    [1, 0, 0], // 1 bottom-back
    [1, 1, 0], // 2 top-back
    [1, 1, 1], // 3 top-front
];

const rightTriangles = [0, 1, 2, 0, 2, 3];

const topVertices = [
    [0, 1, 1], // 0 front-left
    [1, 1, 1], // 1 front-right
    [1, 1, 0], // 2 back-right
    [0, 1, 0], // 3 back-left
];

const topTriangles = [0, 1, 2, 0, 2, 3];

const bottomVertices = [
    [0, 0, 0], // 0 back-left
    [1, 0, 0], // 1 back-right
    [1, 0, 1], // 2 front-right
    [0, 0, 1], // 3 front-left
];

const bottomTriangles = [0, 1, 2, 0, 2, 3];

const faceTris = [0, 1, 2, 0, 2, 3];
const UVs: [number, number][] = [
    [0, 0], // 0
    [1, 0], // 1
    [1, 1], // 2
    [0, 1], // 3
];

// [lx, ly, lz] corners
const frontCorners = [
    {
        corner: [0, 0, 1],
        sides: [
            [-1, 0, 1],
            [0, -1, 1],
        ],
    }, // bottom-left
    {
        corner: [1, 0, 1],
        sides: [
            [1, 0, 1],
            [0, -1, 1],
        ],
    }, // bottom-right
    {
        corner: [1, 1, 1],
        sides: [
            [1, 0, 1],
            [0, 1, 1],
        ],
    }, // top-right
    {
        corner: [0, 1, 1],
        sides: [
            [-1, 0, 1],
            [0, 1, 1],
        ],
    }, // top-left
];

type BlockData = {
    blockType: number;
};
type FaceData = {
    facesVertices: number[][];
    facesIndices: number[];
};
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

function packVoxelData(
    x: number,
    y: number,
    z: number,
    normal: number,
    index: number,
    u: number,
    v: number
): number {
    if (x < 0 || x > 63) throw new RangeError(`x=${x} out of range [0,63]`);
    if (y < 0 || y > 63) throw new RangeError(`y=${y} out of range [0,63]`);
    if (z < 0 || z > 63) throw new RangeError(`z=${z} out of range [0,63]`);
    if (normal < 0 || normal > 7)
        throw new RangeError(`normal=${normal} out of range [0,7]`);
    if (index < 0 || index > 255)
        throw new RangeError(`index=${index} out of range [0,255]`);
    if (u < 0 || u > 1) throw new RangeError(`u=${u} out of range [0,1]`);
    if (v < 0 || v > 1) throw new RangeError(`v=${v} out of range [0,1]`);

    let data = 0;
    data |= x & 0x3f; // bits 0-5
    data |= (y & 0x3f) << 6; // bits 6-11
    data |= (z & 0x3f) << 12; // bits 12-17
    data |= (normal & 0x7) << 18; // bits 18-20
    data |= (index & 0xff) << 21; // bits 21-28
    data |= (u & 0x1) << 29; // bit 29
    data |= (v & 0x1) << 30; // bit 30

    return data >>> 0; // force unsigned 32-bit
}

export class ChunkBuilder {
    private chunkSize: THREE.Vector3;

    constructor(chunSize: THREE.Vector3) {
        this.chunkSize = chunSize;
    }

    private checkVoid(
        chunkData: ChunkData,
        p: THREE.Vector3,
        s: THREE.Vector3, // Shift direction (e.g., [1,0,0] for +X)
        negZdata: Uint8Array,
        posZdata: Uint8Array,
        negXdata: Uint8Array,
        posXdata: Uint8Array,
        negYdata: Uint8Array,
        posYdata: Uint8Array,
        bt: number
    ) {
        const pos = p.clone().add(s);
        let dataArray: Uint8Array = chunkData.getBlockArray();
        if (!dataArray) {
            throw new Error(
                " { FATAL } Data array is null; Case should never happen"
            );
        }
        let localX = pos.x,
            localY = pos.y,
            localZ = pos.z;

        // Only handle the axis we're shifting in (prioritize this neighbor)
        if (s.x !== 0) {
            if (pos.x < 0) {
                dataArray = negXdata;
                localX = this.chunkSize.x - 1;
            } else if (pos.x >= this.chunkSize.x) {
                dataArray = posXdata;
                localX = 0;
            }
        } else if (s.y !== 0) {
            if (pos.y < 0) {
                dataArray = negYdata;
                localY = this.chunkSize.y - 1;
            } else if (pos.y >= this.chunkSize.y) {
                dataArray = posYdata;
                localY = 0;
            }
        } else if (s.z !== 0) {
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
        }

        // Calculate index and check block
        const idx =
            localX +
            localY * this.chunkSize.x +
            localZ * this.chunkSize.x * this.chunkSize.y;
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
            console.error(
                " { ERROR } Block not found. Case should not be possible. Attempted to get: ",
                idx
            );
            return false;
        }

        const currentBlockType = chunkData.getPaletteEntryFromPaletteIndex(bt);
        const currentBlockProperties = BlockTypes[currentBlockType.blockType];
        const neighborBlockType =
            chunkData.getPaletteEntryFromPaletteIndex(block);
        const neighborBlockProperties = BlockTypes[neighborBlockType.blockType];

        if (currentBlockProperties.Transparent == true) {
            if (neighborBlockProperties.Transparent == false && block !== 0)
                return false;
            return currentBlockType.blockType !== neighborBlockType.blockType;
        }

        return block === 0 || neighborBlockProperties.Transparent; // Air or missing block
    }
    private addVertex(v: number[], p: THREE.Vector3) {
        return [v[0] + p.x, v[1] + p.y, v[2] + p.z];
    }

    private getUVFor(
        atlas: ShaderLoaderResultJustWithoutTheMaterial,
        blockType: number,
        [lu, lv]: [number, number],
        face: "Front" | "Back" | "Left" | "Right" | "Top" | "Bottom",
        flip: boolean = false // <-- new flag
    ): [number, number] {

        const blockProperties = BlockTypes[blockType];


        const d = atlas.atlas.atlasData[blockProperties.Texture[face]];
        const W = atlas.atlas.width,
            H = atlas.atlas.height;

        // tile corners in [0–1] space
        const u0 = d.beginX / W,
            u1 = d.endX / W;
        const v0 = d.beginY / H,
            v1 = d.endY / H;

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

    /*private calculateAoForCorner(
        chunkData: Uint8Array, negZ: Uint8Array, posZ: Uint8Array, negX: Uint8Array, posX: Uint8Array, negY: Uint8Array, posY: Uint8Array,
        basePos: THREE.Vector3,
        cornerOffset: number[],
        sideOffset1: number[],
        sideOffset2: number[]
    ): number {
        const cPos = basePos.clone().add(new THREE.Vector3(...cornerOffset));
        const s1Pos = basePos.clone().add(new THREE.Vector3(...sideOffset1));
        const s2Pos = basePos.clone().add(new THREE.Vector3(...sideOffset2));

        const solid = (p: THREE.Vector3) => !this.checkVoid(
            chunkData, p, new THREE.Vector3(0, 0, 0),
            negZ, posZ, negX, posX, negY, posY
        );

        const s1 = solid(s1Pos), s2 = solid(s2Pos), c = solid(cPos);
        if (s1 && s2) return c ? 0 : 1;   // if both sides blocked, corner only dark if diagonal is solid
        if (s1 || s2) return 2;           // one side blocked
        return 3;                         // open corner, brightest
    }*/

    buildGeometryFromChunkData(
        chunkPos: THREE.Vector3,
        chunkData: ChunkData,
        negZdata: Uint8Array,
        posZdata: Uint8Array,
        negXdata: Uint8Array,
        posXdata: Uint8Array,
        negYdata: Uint8Array,
        posYdata: Uint8Array,
        atlasData: ShaderLoaderResultJustWithoutTheMaterial
    ) {
        // Indexing of  x + y * width + z * width * height

        const facesData: FaceData[] = [];
        const vertices: number[][] = [];
        const normals: number[] = [];
        const uvs: number[] = [];
        const aos: number[] = [];
        const indices: number[] = [];
        const indicesTransparent: number[] = [];

        const vertexDataPacked: number[] = [];
        const vertexDataPackedTransparent: number[] = [];
        let facesBuilt = 0;
        let vertexCounter = 0;
        let vertexCounterTransparent = 0;

        function pushPacked(packed: number, bt: number) {
            if (TransparentBlockTypes.has(bt)) {
                vertexDataPackedTransparent.push(packed);
            } else {
                vertexDataPacked.push(packed);
            }
        }
        function pushIndex(faceTris: number[], bt: number) {
            if (TransparentBlockTypes.has(bt)) {
                for (const tri of faceTris) {
                    indicesTransparent.push(tri + vertexCounterTransparent);
                }
                vertexCounterTransparent += 4;
            } else {
                for (const tri of faceTris) {
                    indices.push(tri + vertexCounter);
                }
                vertexCounter += 4;
            }
        }

        for (let x = 0; x < this.chunkSize.x; x++) {
            for (let y = 0; y < this.chunkSize.y; y++) {
                for (let z = 0; z < this.chunkSize.z; z++) {
                    
                    const blockType = chunkData.getBlockAt(x, y, z);
                    const paletteData = chunkData.getPaletteEntryFromPaletteIndex(blockType);

                    if (paletteData.blockType == 0) {
                        continue;
                    }

                    
                    
                    const blockProperties = BlockTypes[blockType]
                    const textures = blockProperties.Texture;

                    const currentposition = new THREE.Vector3(x, y, z);

                    if (
                        this.checkVoid(
                            chunkData,
                            currentposition,
                            new THREE.Vector3(0, 0, 1),
                            negZdata,
                            posZdata,
                            negXdata,
                            posXdata,
                            negYdata,
                            posYdata,
                            blockType
                        )
                    ) {
                        facesBuilt++;

                        for (let i = 0; i < frontVertices.length; i++) {
                            const vertexLocal = frontVertices[i]; // Local vertex position, e.g., (0,0,0)
                            const vertexWorld = this.addVertex(
                                vertexLocal,
                                currentposition
                            ); // World position

                            //vertices.push(vertexWorld);
                            //normals.push(-1, 0, 0);

                            // UVs
                            //const [u, v] = this.getUVFor(atlasData, blockType, UVs[i], "Front", true);
                            //uvs.push(u, v);

                            const packed = packVoxelData(
                                vertexWorld[0],
                                vertexWorld[1],
                                vertexWorld[2],
                                1,
                                textures["Front"],
                                UVs[i][0],
                                UVs[i][1]
                            );
                            pushPacked(packed, blockType);

                            //aos.push(this.calculateAo(currentposition, new THREE.Vector3(...vertexLocal), chunkData, negZdata, posZdata, negXdata, posXdata, negYdata, posYdata))
                        }
                        pushIndex(faceTris, blockType);
                    }
                    if (
                        this.checkVoid(
                            chunkData,
                            currentposition,
                            new THREE.Vector3(0, 0, -1),
                            negZdata,
                            posZdata,
                            negXdata,
                            posXdata,
                            negYdata,
                            posYdata,
                            blockType
                        )
                    ) {
                        facesBuilt++;
                        for (let i = 0; i < backVertices.length; i++) {
                            const vertexLocal = backVertices[i]; // Local vertex position, e.g., (0,0,0)
                            const vertexWorld = this.addVertex(
                                vertexLocal,
                                currentposition
                            ); // World position

                            //vertices.push(vertexWorld);
                            //normals.push(-1, 0, 0);

                            // UVs
                            //const [u, v] = this.getUVFor(atlasData, blockType, UVs[i], "Front", true);
                            //uvs.push(u, v);

                            const packed = packVoxelData(
                                vertexWorld[0],
                                vertexWorld[1],
                                vertexWorld[2],
                                2,
                                textures["Back"],
                                UVs[i][0],
                                UVs[i][1]
                            );
                            pushPacked(packed, blockType);

                            //aos.push(this.calculateAo(currentposition, new THREE.Vector3(...vertexLocal), chunkData, negZdata, posZdata, negXdata, posXdata, negYdata, posYdata))
                        }
                        pushIndex(faceTris, blockType);
                    }
                    if (
                        this.checkVoid(
                            chunkData,
                            currentposition,
                            new THREE.Vector3(0, 1, 0),
                            negZdata,
                            posZdata,
                            negXdata,
                            posXdata,
                            negYdata,
                            posYdata,
                            blockType
                        )
                    ) {
                        facesBuilt++;
                        for (let i = 0; i < topVertices.length; i++) {
                            const vertexLocal = topVertices[i]; // Local vertex position, e.g., (0,0,0)
                            const vertexWorld = this.addVertex(
                                vertexLocal,
                                currentposition
                            ); // World position

                            //vertices.push(vertexWorld);
                            //normals.push(-1, 0, 0);

                            // UVs
                            //const [u, v] = this.getUVFor(atlasData, blockType, UVs[i], "Front", true);
                            //uvs.push(u, v);

                            const packed = packVoxelData(
                                vertexWorld[0],
                                vertexWorld[1],
                                vertexWorld[2],
                                3,
                                textures["Top"],
                                UVs[i][0],
                                UVs[i][1]
                            );
                            pushPacked(packed, blockType);

                            //aos.push(this.calculateAo(currentposition, new THREE.Vector3(...vertexLocal), chunkData, negZdata, posZdata, negXdata, posXdata, negYdata, posYdata))
                        }
                        pushIndex(faceTris, blockType);
                    }
                    if (
                        this.checkVoid(
                            chunkData,
                            currentposition,
                            new THREE.Vector3(0, -1, 0),
                            negZdata,
                            posZdata,
                            negXdata,
                            posXdata,
                            negYdata,
                            posYdata,
                            blockType
                        )
                    ) {
                        facesBuilt++;
                        for (let i = 0; i < bottomVertices.length; i++) {
                            const vertexLocal = bottomVertices[i]; // Local vertex position, e.g., (0,0,0)
                            const vertexWorld = this.addVertex(
                                vertexLocal,
                                currentposition
                            ); // World position

                            //vertices.push(vertexWorld);
                            //normals.push(-1, 0, 0);

                            // UVs
                            //const [u, v] = this.getUVFor(atlasData, blockType, UVs[i], "Front", true);
                            //uvs.push(u, v);

                            const packed = packVoxelData(
                                vertexWorld[0],
                                vertexWorld[1],
                                vertexWorld[2],
                                4,
                                textures["Bottom"],
                                UVs[i][0],
                                UVs[i][1]
                            );
                            pushPacked(packed, blockType);

                            //aos.push(this.calculateAo(currentposition, new THREE.Vector3(...vertexLocal), chunkData, negZdata, posZdata, negXdata, posXdata, negYdata, posYdata))
                        }
                        pushIndex(faceTris, blockType);
                    }
                    if (
                        this.checkVoid(
                            chunkData,
                            currentposition,
                            new THREE.Vector3(1, 0, 0),
                            negZdata,
                            posZdata,
                            negXdata,
                            posXdata,
                            negYdata,
                            posYdata,
                            blockType
                        )
                    ) {
                        facesBuilt++;
                        for (let i = 0; i < rightVertices.length; i++) {
                            const vertexLocal = rightVertices[i]; // Local vertex position, e.g., (0,0,0)
                            const vertexWorld = this.addVertex(
                                vertexLocal,
                                currentposition
                            ); // World position

                            //vertices.push(vertexWorld);
                            //normals.push(-1, 0, 0);

                            // UVs
                            //const [u, v] = this.getUVFor(atlasData, blockType, UVs[i], "Front", true);
                            //uvs.push(u, v);

                            const packed = packVoxelData(
                                vertexWorld[0],
                                vertexWorld[1],
                                vertexWorld[2],
                                5,
                                textures["Right"],
                                UVs[i][0],
                                UVs[i][1]
                            );
                            pushPacked(packed, blockType);

                            //aos.push(this.calculateAo(currentposition, new THREE.Vector3(...vertexLocal), chunkData, negZdata, posZdata, negXdata, posXdata, negYdata, posYdata))
                        }
                        pushIndex(faceTris, blockType);
                    }
                    if (
                        this.checkVoid(
                            chunkData,
                            currentposition,
                            new THREE.Vector3(-1, 0, 0),
                            negZdata,
                            posZdata,
                            negXdata,
                            posXdata,
                            negYdata,
                            posYdata,
                            blockType
                        )
                    ) {
                        facesBuilt++;
                        for (let i = 0; i < leftVertices.length; i++) {
                            const vertexLocal = leftVertices[i]; // Local vertex position, e.g., (0,0,0)
                            const vertexWorld = this.addVertex(
                                vertexLocal,
                                currentposition
                            ); // World position

                            //vertices.push(vertexWorld);
                            //normals.push(-1, 0, 0);

                            // UVs
                            //const [u, v] = this.getUVFor(atlasData, blockType, UVs[i], "Front", true);
                            //uvs.push(u, v);

                            const packed = packVoxelData(
                                vertexWorld[0],
                                vertexWorld[1],
                                vertexWorld[2],
                                6,
                                textures["Left"],
                                UVs[i][0],
                                UVs[i][1]
                            );
                            pushPacked(packed, blockType);

                            //aos.push(this.calculateAo(currentposition, new THREE.Vector3(...vertexLocal), chunkData, negZdata, posZdata, negXdata, posXdata, negYdata, posYdata))
                        }
                        pushIndex(faceTris, blockType);
                    }
                }
            }
        }

        const verticesFlattened: number[] = [];

        for (const vertex of vertices) {
            verticesFlattened.push(vertex[0], vertex[1], vertex[2]);
        }

        //console.log(indices);

        const geometry = new THREE.BufferGeometry();
        //geometry.setAttribute('position', new THREE.Float32BufferAttribute(verticesFlattened, 3));
        //geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
        //geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
        //geometry.setAttribute('ao', new THREE.Float16BufferAttribute(aos, 1));
        //console.log(vertexDataPacked);

        geometry.setAttribute(
            "data",
            new THREE.Uint32BufferAttribute(vertexDataPacked, 1)
        );
        geometry.setIndex(indices);
        geometry.setDrawRange(0, indices.length);

        const geometryTransparent = new THREE.BufferGeometry();

        geometryTransparent.setAttribute(
            "data",
            new THREE.Uint32BufferAttribute(vertexDataPackedTransparent, 1)
        );
        geometryTransparent.setIndex(indicesTransparent);
        geometryTransparent.setDrawRange(0, indicesTransparent.length);

        verticesFlattened.length = 0;
        vertices.length = 0;
        uvs.length = 0;
        normals.length = 0;

        //console.log("# faces built: ", facesBuilt)

        // Local-space center
        geometry.boundingSphere = new THREE.Sphere(
            new THREE.Vector3(
                this.chunkSize.x / 2,
                this.chunkSize.y / 2,
                this.chunkSize.z / 2
            ),
            (this.chunkSize.x * Math.sqrt(3)) / 2
        );

        geometryTransparent.boundingSphere = geometry.boundingSphere;

        return [geometry, geometryTransparent];
    }
}
