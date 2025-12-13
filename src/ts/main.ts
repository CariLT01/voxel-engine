import * as THREE from 'three';
import { ChunkManager } from './worldChunks';
import { Player } from './player';
import Stats from 'stats.js';
import { ClientNetworkingService } from './Networking';


const stats1 = new Stats();
stats1.dom.style.position = 'absolute';
stats1.dom.style.top = '0px';
stats1.dom.style.left = '0px';
document.body.appendChild(stats1.dom);

const stats2 = new Stats();
stats2.showPanel(1); // Optional: show ms panel or any other panel index
stats2.dom.style.position = 'absolute';
stats2.dom.style.top = '0px';
stats2.dom.style.left = '100px'; // Shift right so they don't overlap
document.body.appendChild(stats2.dom);

type BlockData = {
    blockType: number
}

const CHUNK_SIZE = 16;

export class Game {

    renderer: THREE.WebGLRenderer;
    camera: THREE.PerspectiveCamera;
    scene: THREE.Scene;
    chunksManager: ChunkManager;
    player: Player;
    clock: THREE.Clock = new THREE.Clock();



    constructor() {

        const canvas = document.querySelector("#main") as HTMLCanvasElement;
        const context = canvas.getContext('webgl2') as unknown as WebGLRenderingContext; // Shut up Typescript;]


        this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, context: context });
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        canvas.addEventListener('click', () => {
            canvas.requestPointerLock();
        });

        this.camera = new THREE.PerspectiveCamera(70);
        this.scene = new THREE.Scene();
        this.player = new Player(this.camera, new THREE.Vector3(0, 100, 0));
        this.chunksManager = new ChunkManager(this.player);

        this.initialize();
        this.loadControls();
        this.loadDebugObjects();
        this.loadLighting();

        ClientNetworkingService.connect("http://localhost:9000", () => {
            console.log("Connected to server");
        })
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

    private connectServer() {
        const socket = new WebSocket("ws://localhost:6000/");

        socket.onopen = () => {
            console.log("Connected to the server");
        }
    }

    loadDebugObjects() {
        const planeGeometry = new THREE.PlaneGeometry(20, 20);

        const planeMesh = new THREE.Mesh(planeGeometry, new THREE.MeshPhysicalMaterial({ color: 0xaa0000 }));
        planeMesh.rotateY(Math.PI / 2);

        this.scene.add(planeMesh);

        const axesHelper = new THREE.AxesHelper(100);
        this.scene.add(axesHelper);

        const gridHelper = new THREE.GridHelper(32 * 100, 100);
        this.scene.add(gridHelper);
    }
    loadLighting() {
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(5, 10, 7);
        this.scene.add(light);
    }

    render() {
        stats1.begin();
        const MAX_DT = 0.05;
        this.player.updatePlayer(Math.min(MAX_DT, this.clock.getDelta()));

        const pos = this.player.position;
        const chunkPos = new THREE.Vector3(
            Math.floor(pos.x / CHUNK_SIZE),
            Math.floor(pos.y / CHUNK_SIZE),
            Math.floor(pos.z / CHUNK_SIZE),
        )

        this.chunksManager.update(chunkPos, this.scene);
        stats1.end();
        stats2.begin()
        this.renderer.render(this.scene, this.camera);
        stats2.end();
    }

    private processQueuedPackets() {
        const queuedPackets = ClientNetworkingService.getQueue();

        console.log("process queue");

        queuedPackets.forEach((entry) => {
            if (entry.chunkData) {
                console.log("PRocess packet");
                this.chunksManager.processChunkDataPacket(entry);
            } else if (entry.chunkRequest){
                console.log("got chunk req");
            } else {
                console.warn("no pckt found");
            }
        });

        ClientNetworkingService.clearQueue();
    }

    tick() {
        this.processQueuedPackets();
    }

}


const game = new Game();

function tick() {
    game.tick();
    game.render();
    requestAnimationFrame(tick);
}

tick();