import * as THREE from 'three';
import { ChunkManager } from './worldChunks';
import { Player } from './player';
import Stats from 'stats.js';
import { ClientNetworkingService } from './Networking';
import { game } from '../../compiled';
import { PlayersManager } from './PlayersManager';


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
    playersManager: PlayersManager;
    player: Player;
    clock: THREE.Clock = new THREE.Clock();

    private playerUsername: string;


    constructor(playerUsername: string) {

        this.playerUsername = playerUsername;

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
        this.playersManager = new PlayersManager(this.playerUsername);

        this.initialize();
        this.loadControls();

        ClientNetworkingService.connect("http://localhost:9000", () => {

            this._handleOnConnectedToServer();
        })
        //this.loadSky();

    }

    private _handleOnConnectedToServer() {
        console.log("Connected to the server!");

        // Send HELLO packet

        const joinPacket = game.Packet.create(
            {
                joinServer: {
                    username: this.playerUsername
                }
            }
        );

        const buffer = game.Packet.encode(joinPacket).finish();

        ClientNetworkingService.send(buffer);
    }

    initialize() {

        this.camera.aspect = innerWidth / innerHeight;
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
            } else if (entry.joinServer) {
                this.playersManager.processPacket(this.scene, entry);
            } else if (entry.playerBroadcastPositionUpdateBatched) {
                this.playersManager.processPacket(this.scene, entry);
            } else {
                console.warn("no pckt found");
            }
        });

        ClientNetworkingService.clearQueue();
    }

    private sendPlayerPositionUpdates() {
        
        const position = this.player.position;

        const packet = game.Packet.create(
            {
                playerPositionUpdate: {
                    x: position.x,
                    y: position.y,
                    z: position.z
                }
            }
        );

        const buffer = game.Packet.encode(packet).finish();

        ClientNetworkingService.send(buffer);
    }

    tick() {
        this.processQueuedPackets();
        this.sendPlayerPositionUpdates();
    }

}


const promptedUsername = prompt("Username");
if (promptedUsername) {
    const clientGame = new Game(promptedUsername);

    function tick() {
        clientGame.tick();
        clientGame.render();
        requestAnimationFrame(tick);
    }

    tick();
}

