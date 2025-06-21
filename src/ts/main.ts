import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader';
import { marchingCubesFromGrid } from './marchingCubeGenerator';
import FastNoiseLite from 'fastnoise-lite';
import { Chunk } from './chunk';
import { ChunkBuilder } from './chunkBuilder';
import { ChunkManager } from './worldChunks';
import { Player } from './player';
import {PointerLockControls} from 'three/examples/jsm/controls/PointerLockControls'

type BlockData = {
    blockType: number
}


export class Game {

  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  chunksManager: ChunkManager;
  player: Player;
  clock: THREE.Clock = new THREE.Clock();

  constructor() {

    const canvas = document.querySelector("#main") as HTMLCanvasElement;
    const context = canvas.getContext('webgl2') as unknown as WebGLRenderingContext; // Shut up Typescript;

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, context: context});
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    canvas.addEventListener('click', () => {
      canvas.requestPointerLock();
    });

    this.camera = new THREE.PerspectiveCamera(70);
    this.scene = new THREE.Scene();
    this.player = new Player(this.camera, new THREE.Vector3(0, 10, 0));
    this.chunksManager = new ChunkManager(this.player);

    this.initialize();
    this.loadControls();
    this.loadDebugObjects();
    this.loadLighting();
    this.loadMarchingCubesChunks();
    this.loadVoxelChunk();
    //this.loadSky();

  }

  initialize() {
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0.5; // reduce brightness, tweak this value

    this.camera.aspect = innerWidth / innerHeight;
    this.camera.position.set(0, 5, 10);
    this.camera.updateProjectionMatrix();

    window.addEventListener("resize", () => {
      this.camera.aspect = innerWidth / innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(innerWidth, innerHeight);
    })
  }
  loadControls() {
    //this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    
  }
  loadSky() {


  }
  loadDebugObjects() {
    const planeGeometry = new THREE.PlaneGeometry(20, 20);

    const planeMesh = new THREE.Mesh(planeGeometry, new THREE.MeshPhysicalMaterial({ color: 0xaa0000 }));
    planeMesh.rotateY(Math.PI / 2);

    this.scene.add(planeMesh);

    const axesHelper = new THREE.AxesHelper(100);
    this.scene.add(axesHelper);

    const gridHelper = new THREE.GridHelper(32*100, 100);
    this.scene.add(gridHelper);
  }
  loadLighting() {
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 10, 7);
    this.scene.add(light);
  }

  loadVoxelChunk() {

    /*const chunkData: BlockData[] = [];
    const chunkBuilder = new ChunkBuilder(new THREE.Vector3(32, 32, 32))

    const noise = new FastNoiseLite(1234);
    noise.SetNoiseType(FastNoiseLite.NoiseType.Perlin);             // choose Perlin
    noise.SetFrequency(.05);

    for (let x = 0; x < 32; x++) {
      for (let y = 0; y < 32; y++) {
        for (let z = 0; z < 32; z++) {
          const position = new THREE.Vector3(x, y, z);
          const index = position.x + position.y * 32 + position.z * 32 * 32;

          chunkData[index] = {
            blockType: Math.round((noise.GetNoise(x, y, z) + 1) / 2)
          }
        }
      }
    } 

    console.log(chunkData);

    const chunk = new Chunk(chunkData, chunkBuilder);
    const mesh = chunk.buildChunk();
    this.scene.add(mesh);*/
    
  }

  async loadMarchingCubesChunks() {
    return
    /*const noise = new FastNoiseLite(1234);
    noise.SetNoiseType(FastNoiseLite.NoiseType.Perlin);             // choose Perlin
    noise.SetFrequency(.05);

    let i = 0;
    for (let cx = -3; cx < 3; cx++) {
      for (let cy = -3; cy < 3; cy++) {
        for (let cz = -3; cz < 3; cz++) {
          const grid: number[][][] = [];
          for (let x = 0; x <= 32; x++) {
            grid[x] = [];
            for (let y = 0; y <= 32; y++) {
              grid[x][y] = [];
              for (let z = 0; z <= 32; z++) {
                grid[x][y][z] = (noise.GetNoise(x + cx * 32, y + cy * 32, z + cz * 32) + 1) / 2;
              }
            }
          }

          const distanceFromCenter = Math.sqrt(
            cx * cx + cy * cy + cz * cz
          )

          console.log("Progress: ", i, "/", 3 ** 3);
          const chunk = new Chunk(grid, new THREE.Vector3(cx, cy, cz));
          this.scene.add(chunk.buildMesh(1));
          i++;
        }
      }
    }*/






  }
  render() {
    const MAX_DT = 0.05;
    this.player.updatePlayer(Math.min(MAX_DT, this.clock.getDelta()));

    const pos = this.player.position;
    const chunkPos = new THREE.Vector3(
      Math.floor(pos.x / 32),
      Math.floor(pos.y / 32),
      Math.floor(pos.z / 32),
    )

    this.chunksManager.update(chunkPos, this.scene);
    this.renderer.render(this.scene, this.camera);
  }
}


const game = new Game();

function tick() {
  game.render();
  requestAnimationFrame(tick);
}

tick();