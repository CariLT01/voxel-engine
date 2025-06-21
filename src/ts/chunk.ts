import * as THREE from 'three';
import { ChunkBuilder } from './chunkBuilder';

const CHUNK_SIZE = new THREE.Vector3(32, 32, 32);

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
    mat: THREE.ShaderMaterial;
};
export class Chunk {
    private chunkData: Uint8Array;
    private chunkBuilder: ChunkBuilder;
    private meshObject: THREE.Mesh | null = null;
    private position: THREE.Vector3;
    private atlasData!: { beginX: number, beginY: number, endX: number, endY: number }[];
    private atlasWidth!: number;
    private atlasHeight!: number;

    private shaderMaterial: THREE.ShaderMaterial;

    constructor(chunkData: Uint8Array, position: THREE.Vector3, chunkBuilder: ChunkBuilder, shaderMaterial: ShaderLoaderResult) {
        this.chunkData = chunkData;
        this.chunkBuilder = chunkBuilder;
        this.position = position;
        this.shaderMaterial = shaderMaterial.mat;
        this.atlasData = shaderMaterial.atlas.atlasData;
        this.atlasWidth = shaderMaterial.atlas.width;
        this.atlasHeight = shaderMaterial.atlas.height;
    }

    getData() {
        return this.chunkData;
    }
    getMesh() {
        return this.meshObject;
    }
    disposeMesh() {
        this.meshObject = null;
    }

    buildChunk(negZChunk: Chunk, posZChunk: Chunk, negXChunk: Chunk, posXChunk: Chunk, negYChunk: Chunk, posYChunk: Chunk) {
        const geometry = this.chunkBuilder.buildGeometryFromChunkData(this.chunkData, negZChunk.getData(), posZChunk.getData(), negXChunk.getData(), posXChunk.getData(), negYChunk.getData(), posYChunk.getData(), {
            atlas: {
                width: this.atlasWidth,
                height: this.atlasHeight,
                atlasData: this.atlasData
            }

        });


        const mesh = new THREE.Mesh(geometry, this.shaderMaterial);
        mesh.position.copy(this.position.clone().multiply(CHUNK_SIZE));
        this.meshObject = mesh;



        return mesh;
    }
}