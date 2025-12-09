import * as THREE from 'three';
import { ChunkBuilder } from './chunkBuilder';
import { ChunkData } from './chunkData';

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
    matTrans: THREE.ShaderMaterial
};
export class Chunk {
    private chunkData: ChunkData;
    private chunkBuilder: ChunkBuilder;
    private meshObject: THREE.Mesh | null = null;
    private meshObjectTransparent: THREE.Mesh | null = null;
    private position: THREE.Vector3;
    private atlasData!: { beginX: number, beginY: number, endX: number, endY: number }[];
    private atlasWidth!: number;
    private atlasHeight!: number;

    private shaderMaterial: THREE.ShaderMaterial;
    private shaderMaterialTrans: THREE.ShaderMaterial;

    constructor(chunkData: ChunkData, position: THREE.Vector3, chunkBuilder: ChunkBuilder, shaderMaterial: ShaderLoaderResult) {
        this.chunkData = chunkData;
        this.chunkBuilder = chunkBuilder;
        this.position = position;
        this.shaderMaterial = shaderMaterial.mat;
        this.shaderMaterialTrans = shaderMaterial.matTrans
        this.atlasData = shaderMaterial.atlas.atlasData;
        this.atlasWidth = shaderMaterial.atlas.width;
        this.atlasHeight = shaderMaterial.atlas.height;
    }

    getData() {
        return this.chunkData;
    }
    getMesh() : THREE.Mesh[] {
        return [this.meshObject, this.meshObjectTransparent] as THREE.Mesh[];
    }
    disposeMesh() {
        this.meshObject = null;
        this.meshObjectTransparent = null;
    }

    buildChunk(negZChunk: Chunk, posZChunk: Chunk, negXChunk: Chunk, posXChunk: Chunk, negYChunk: Chunk, posYChunk: Chunk) {
        const geometries = this.chunkBuilder.buildGeometryFromChunkData(this.position, this.chunkData, negZChunk.getData().getBlockArray(), posZChunk.getData().getBlockArray(), negXChunk.getData().getBlockArray(), posXChunk.getData().getBlockArray(), negYChunk.getData().getBlockArray(), posYChunk.getData().getBlockArray(), {
            atlas: {
                width: this.atlasWidth,
                height: this.atlasHeight,
                atlasData: this.atlasData
            }
        });


        const mesh = new THREE.Mesh(geometries[0], this.shaderMaterial);
        mesh.position.copy(this.position.clone().multiply(CHUNK_SIZE));
        this.meshObject = mesh;
        mesh.frustumCulled = true;

        const meshTransparent = new THREE.Mesh(geometries[1], this.shaderMaterialTrans);
        meshTransparent.position.copy(mesh.position);
        this.meshObjectTransparent = meshTransparent;
        meshTransparent.frustumCulled = true;



        return [mesh, meshTransparent];
    }
}