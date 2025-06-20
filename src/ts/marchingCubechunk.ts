import * as THREE from 'three';
import { marchingCubesFromGrid } from './marchingCubeGenerator';

const CHUNK_SIZE = new THREE.Vector3(32, 32, 32);



export class Chunk {
    grid: number[][][];
    pos: THREE.Vector3;

    constructor(grid: number[][][], chunkPosition: THREE.Vector3) {
        this.grid = grid;
        this.pos = chunkPosition;
    }

    buildMesh(lodLevel: number) {

        const actualGeometrySize = (this.grid.length - 1) / lodLevel;

        const recomputedGrid: number[][][] = [];

        for (let x = 0; x <= actualGeometrySize + 1; x++) {
            recomputedGrid[x] = [];
            for (let y = 0; y <= actualGeometrySize + 1; y++) {
                recomputedGrid[x][y] = [];
                for (let z = 0; z <= actualGeometrySize + 1; z++) {
                    const srcX = Math.min(x * lodLevel, CHUNK_SIZE.x - 1);
                    const srcY = Math.min(y * lodLevel, CHUNK_SIZE.y - 1);
                    const srcZ = Math.min(z * lodLevel, CHUNK_SIZE.z - 1);

                    recomputedGrid[x][y][z] = this.grid[srcX][srcY][srcZ];
                }
            }
        }
        console.log(recomputedGrid);

        const geometry = marchingCubesFromGrid(recomputedGrid, { x: actualGeometrySize, y: actualGeometrySize, z: actualGeometrySize }, 0.3);
        geometry.computeVertexNormals();

        const scale = lodLevel;

        const mesh = new THREE.Mesh(geometry, new THREE.MeshPhysicalMaterial({ color: 0xffffff, flatShading: false }));
        mesh.position.copy(this.pos.multiply(CHUNK_SIZE));
        mesh.scale.set(scale, scale, scale);

        return mesh;
    }
}