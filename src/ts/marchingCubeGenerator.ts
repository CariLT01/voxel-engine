import * as THREE from 'three';
import { EdgeVertexIndices, EdgeMasks, TriangleTable } from './triangulationTable';

const cornerOffsets = [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(0, 1, 0),
    new THREE.Vector3(1, 1, 0),
    new THREE.Vector3(0, 0, 1),
    new THREE.Vector3(1, 0, 1),
    new THREE.Vector3(0, 1, 1),
    new THREE.Vector3(1, 1, 1),
];



/**
 * Interpolates the position where the isosurface cuts an edge between two vertices.
 */
function vertexInterp(
    threshold: number,
    p1: THREE.Vector3,
    p2: THREE.Vector3,
    valp1: number,
    valp2: number
): THREE.Vector3 {
    if (Math.abs(threshold - valp1) < 1e-6) return p1.clone();
    if (Math.abs(threshold - valp2) < 1e-6) return p2.clone();
    if (Math.abs(valp1 - valp2) < 1e-6) return p1.clone();
    const mu = (threshold - valp1) / (valp2 - valp1);
    return new THREE.Vector3(
        p1.x + mu * (p2.x - p1.x),
        p1.y + mu * (p2.y - p1.y),
        p1.z + mu * (p2.z - p1.z)
    );
}

/**
 * Generates a mesh from a 3D grid of scalar values [0..1] using Marching Cubes.
 * @param grid 3D array of scalar values dimensions [nx][ny][nz]
 * @param dims Dimensions object { x: nx, y: ny, z: nz }
 * @param threshold The isovalue (0..1) defining the surface
 * @returns THREE.BufferGeometry ready for rendering
 */
export function marchingCubesFromGrid(
    grid: number[][][],
    dims: { x: number; y: number; z: number },
    threshold: number
): THREE.BufferGeometry {
    const vertices: number[] = [];
    const indices: number[] = [];
    let vertCount = 0;


    // Edge vertex pairs


    // Loop over each cube
    for (let x = 0; x < dims.x - 1; x++) {
        for (let y = 0; y < dims.y - 1; y++) {
            for (let z = 0; z < dims.z - 1; z++) {
                // Sample corner values
                const cubeValues: number[] = cornerOffsets.map(off =>
                    grid[x + off.x][y + off.y][z + off.z]
                );

                // Build cubeIndex
                let cubeIndex = 0;
                for (let i = 0; i < 8; i++) {
                    if (cubeValues[i] < threshold) cubeIndex |= 1 << i;
                }

                // Skip empty or full
                const edges = EdgeMasks[cubeIndex];
                if (edges === 0) continue;

                // Compute vertex list
                const vertList = new Array<THREE.Vector3>(12);
                for (let i = 0; i < 12; i++) {
                    if (edges & (1 << i)) {
                        const [i1, i2] = EdgeVertexIndices[i];
                        const p1 = cornerOffsets[i1].clone().add(new THREE.Vector3(x, y, z));
                        const p2 = cornerOffsets[i2].clone().add(new THREE.Vector3(x, y, z));
                        const v1 = cubeValues[i1];
                        const v2 = cubeValues[i2];
                        vertList[i] = vertexInterp(threshold, p1, p2, v1, v2);
                    }
                }

                // Build triangles
                const triConfig = TriangleTable[cubeIndex];
                for (let i = 0; triConfig[i] !== -1; i += 3) {
                    const a = vertList[triConfig[i]]!;
                    const b = vertList[triConfig[i + 1]]!;
                    const c = vertList[triConfig[i + 2]]!;

                    vertices.push(a.x, a.y, a.z, b.x, b.y, b.z, c.x, c.y, c.z);
                    indices.push(vertCount, vertCount + 1, vertCount + 2);
                    vertCount += 3;
                }
            }
        }
    }

    // Build BufferGeometry
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(vertices, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    return geometry;
}


