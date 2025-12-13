import { BoxGeometry, Mesh, MeshBasicMaterial, Scene, Vector3 } from "three";
import { game } from "../../compiled";

export class PlayersManager {

    private playerMeshes: Map<string, Mesh> = new Map();
    private currentUsername: string;


    constructor(currentUsername: string) {
        this.currentUsername = currentUsername;
    }

    newPlayerAdded(scene: Scene, username: string) {
        if (this.playerMeshes.has(username)) {
            throw new Error("Player already present!");
        }

        const newMesh = new Mesh(new BoxGeometry(1, 2, 1), new MeshBasicMaterial({color: 0xfff}));

        this.playerMeshes.set(username, newMesh);

        scene.add(newMesh);
    }

    removePlayer(scene: Scene, username: string) {
        if (this.playerMeshes.has(username)) {
            
            const mesh = this.playerMeshes.get(username);

            if (!mesh) return;

            scene.remove(mesh);

            this.playerMeshes.delete(username);
        }
    }

    updatePlayerPosition(username: string, position: Vector3) {
        const mesh = this.playerMeshes.get(username);
        if (mesh) {
            mesh.position.copy(position);
        }
    }

    processPacket(scene: Scene, packet: game.Packet) {
        if (packet.joinServer) {
            const username = packet.joinServer.username;

            if (!username) {
                throw new Error("No username specified");
            }

            if (username == this.currentUsername) return;

            this.newPlayerAdded(scene, username);
        } else if (packet.playerBroadcastPositionUpdateBatched) {
            const updates = packet.playerBroadcastPositionUpdateBatched.playerPositionUpdates;
            if (updates) {
                updates.forEach(update => {
                    if (update.username == this.currentUsername) return;

                    const x = update.x;
                    const y = update.y;
                    const z = update.z;
                    const username = update.username;

                    if (x == null || y == null || z == null || username == null) {
                        throw new Error("Invalid payload");
                    }

                    this.updatePlayerPosition(username, new Vector3(x, y, z));
                });
            }
        }
    }
}