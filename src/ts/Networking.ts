import protobuf from "protobufjs";

import packetsProtobufFile from "../messages/Packets.proto"
import { game } from "../../compiled";

class ClientNetworking {
    private webSocket: WebSocket | null = null;
    private root!: protobuf.Root;
    private connectionEstablished: boolean = false;

    private sendMessageQueue: Uint8Array[] = [];
    private receivedMessageQueue: game.Packet[] = [];

    constructor() {
        this.loadProtobuf();
    }

    async initialize() {
        await this.loadProtobuf();
    }

    private async loadProtobuf() {
        this.root = await protobuf.parse(packetsProtobufFile).root;

    
    }
    
    lookupType(typeName: string) {
        return this.root.lookupType(typeName);
    }

    getPacketType() {
        return this.lookupType("game.Packet");
    }

    encode(type: protobuf.Type, message: protobuf.Message) {
        return type.encode(message).finish();
    }

    send(buffer: Uint8Array) {
        if (!this.webSocket) {
            throw new Error("WebSocket not initialized");
        }
        if (!buffer) {
            throw new Error("Invalid buffer or no buffer provided");
        }
        if (this.connectionEstablished == false) {
            this.sendMessageQueue.push(buffer);
            return;
        }

        this.webSocket.send(buffer);
    }

    encodeAndSend(type: protobuf.Type, message: protobuf.Message) {
        const buffer = this.encode(type, message);
        this.send(buffer);
    }
 
    connect(host: string, onOpen: (ev: Event) => void) {
        this.webSocket = new WebSocket(host);
        this.webSocket.binaryType = "arraybuffer";

        this.webSocket.onopen = (ev: Event) => {
            this.connectionEstablished = true;

            
            this.sendMessageQueue.forEach((message) => {
                if (!this.webSocket) return;
                this.webSocket.send(message);
            })
            this.sendMessageQueue.length = 0;

            onOpen(ev);
        };

        this.webSocket.onmessage = (event) => {

            console.log("Received packet");

            const buffer = event.data as ArrayBuffer;
            const uint8arr = new Uint8Array(buffer);
            const message = game.Packet.decode(uint8arr);

            console.log("LEngth: ", uint8arr.byteLength);

            this.receivedMessageQueue.push(message);
        }
    }

    getQueue() {
        return this.receivedMessageQueue;
    }
    
    clearQueue() {
        this.receivedMessageQueue.length = 0;
    }

    
}

export const ClientNetworkingService = new ClientNetworking();