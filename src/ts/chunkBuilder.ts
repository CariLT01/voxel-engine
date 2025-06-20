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

type BlockData = {
    blockType: number
}
type FaceData = {
    facesVertices: number[][];
    facesIndices: number[];
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
            throw new Error("Data array is null; Case should never happen");
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
            throw new Error("No neighbor!");
        };

        // Calculate index and check block
        const idx = localX + localY * this.chunkSize.x + localZ * this.chunkSize.x * this.chunkSize.y;
        const block = dataArray[idx];
        if (block === null || block === undefined) {
            throw new Error("Block not found. Case should not be possible.");
        }
        return block === 0; // Air or missing block
    }
    private addVertex(v: number[], p: THREE.Vector3) {
        return [v[0] + p.x, v[1] + p.y, v[2] + p.z];
    }


    buildGeometryFromChunkData(chunkData: Uint8Array, negZdata: Uint8Array, posZdata: Uint8Array, negXdata: Uint8Array, posXdata: Uint8Array, negYdata: Uint8Array, posYdata: Uint8Array) {
        // Indexing of  x + y * width + z * width * height

        const facesData: FaceData[] = [];
        const vertices: number[][] = [];
        const normals: number[] = [];
        let facesBuilt = 0;
        for (let x = 0; x < this.chunkSize.x; x++) {
            for (let y = 0; y < this.chunkSize.y; y++) {
                for (let z = 0; z < this.chunkSize.z; z++) {

                    const index = x + y * this.chunkSize.x + z * this.chunkSize.x * this.chunkSize.y;
                    if (chunkData[index] == 0) {
                        continue;
                    }


                    const currentposition = new THREE.Vector3(x, y, z);

                    if (this.checkVoid(chunkData, currentposition, new THREE.Vector3(0, 0, 1), negZdata, posZdata, negXdata, posXdata, negYdata, posYdata)) {
                        for (const index of faceTris) {
                            facesBuilt++;
                            vertices.push(this.addVertex(frontVertices[index], currentposition));
                            normals.push(0); normals.push(0); normals.push(1);
                        }
                    }
                    if (this.checkVoid(chunkData, currentposition, (new THREE.Vector3(0, 0, -1)), negZdata, posZdata, negXdata, posXdata, negYdata, posYdata)) {
                        for (const index of faceTris) {
                            facesBuilt++;
                            vertices.push(this.addVertex(backVertices[index], currentposition));
                            normals.push(0); normals.push(0); normals.push(-1);
                        }
                    }
                    if (this.checkVoid(chunkData, currentposition, (new THREE.Vector3(0, 1, 0)), negZdata, posZdata, negXdata, posXdata, negYdata, posYdata)) {
                        for (const index of faceTris) {
                            facesBuilt++;
                            vertices.push(this.addVertex(topVertices[index], currentposition));
                            normals.push(0); normals.push(1); normals.push(0);
                        }
                    }
                    if (this.checkVoid(chunkData, currentposition, (new THREE.Vector3(0, -1, 0)), negZdata, posZdata, negXdata, posXdata, negYdata, posYdata)) {
                        for (const index of faceTris) {
                            facesBuilt++;
                            vertices.push(this.addVertex(bottomVertices[index], currentposition));
                            normals.push(0); normals.push(-1); normals.push(0);
                        }
                    }
                    if (this.checkVoid(chunkData, currentposition, (new THREE.Vector3(1, 0, 0)), negZdata, posZdata, negXdata, posXdata, negYdata, posYdata)) {
                        for (const index of faceTris) {
                            facesBuilt++;
                            vertices.push(this.addVertex(rightVertices[index], currentposition));
                            normals.push(1); normals.push(0); normals.push(0);
                        }
                    }
                    if (this.checkVoid(chunkData, currentposition, (new THREE.Vector3(-1, 0, 0)), negZdata, posZdata, negXdata, posXdata, negYdata, posYdata)) {
                        for (const index of faceTris) {
                            facesBuilt++;
                            vertices.push(this.addVertex(leftVertices[index], currentposition));
                            normals.push(-1); normals.push(0); normals.push(0);
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
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(verticesFlattened, 3));
        geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));

        console.log("# faces built: ", facesBuilt)

        return geometry;



    }
}

