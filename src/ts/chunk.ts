import * as THREE from 'three';
import { ChunkBuilder } from './chunkBuilder';

const CHUNK_SIZE = new THREE.Vector3(32, 32, 32);

type BlockData = {
    blockType: number
}

export class Chunk {
    private chunkData: Uint8Array;
    private chunkBuilder: ChunkBuilder;
    private meshObject: THREE.Mesh | null = null;
    private position: THREE.Vector3;

    constructor(chunkData: Uint8Array, position: THREE.Vector3, chunkBuilder: ChunkBuilder) {
        this.chunkData = chunkData;
        this.chunkBuilder = chunkBuilder;
        this.position = position;
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
        const geometry = this.chunkBuilder.buildGeometryFromChunkData(this.chunkData, negZChunk.getData(), posZChunk.getData(), negXChunk.getData(), posXChunk.getData(), negYChunk.getData(), posYChunk.getData());
        const material = new THREE.MeshPhysicalMaterial({color: 0xaaaaaa, flatShading: false});

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.copy(this.position.clone().multiply(CHUNK_SIZE));
        this.meshObject = mesh;



        return mesh;
    }
}