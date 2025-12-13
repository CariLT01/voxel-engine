import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace game. */
export namespace game {

    /** Properties of a PaletteEntry. */
    interface IPaletteEntry {

        /** PaletteEntry blockType */
        blockType?: (number|null);
    }

    /** Represents a PaletteEntry. */
    class PaletteEntry implements IPaletteEntry {

        /**
         * Constructs a new PaletteEntry.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.IPaletteEntry);

        /** PaletteEntry blockType. */
        public blockType: number;

        /**
         * Creates a new PaletteEntry instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PaletteEntry instance
         */
        public static create(properties?: game.IPaletteEntry): game.PaletteEntry;

        /**
         * Encodes the specified PaletteEntry message. Does not implicitly {@link game.PaletteEntry.verify|verify} messages.
         * @param message PaletteEntry message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: game.IPaletteEntry, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PaletteEntry message, length delimited. Does not implicitly {@link game.PaletteEntry.verify|verify} messages.
         * @param message PaletteEntry message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: game.IPaletteEntry, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PaletteEntry message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PaletteEntry
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.PaletteEntry;

        /**
         * Decodes a PaletteEntry message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PaletteEntry
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.PaletteEntry;

        /**
         * Verifies a PaletteEntry message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PaletteEntry message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PaletteEntry
         */
        public static fromObject(object: { [k: string]: any }): game.PaletteEntry;

        /**
         * Creates a plain object from a PaletteEntry message. Also converts values to other types if specified.
         * @param message PaletteEntry
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: game.PaletteEntry, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PaletteEntry to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PaletteEntry
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ChunkData. */
    interface IChunkData {

        /** ChunkData chunkX */
        chunkX?: (number|null);

        /** ChunkData chunkY */
        chunkY?: (number|null);

        /** ChunkData chunkZ */
        chunkZ?: (number|null);

        /** ChunkData palette */
        palette?: (game.IPaletteEntry[]|null);

        /** ChunkData ChunkBuffer */
        ChunkBuffer?: (Uint8Array|null);
    }

    /** Represents a ChunkData. */
    class ChunkData implements IChunkData {

        /**
         * Constructs a new ChunkData.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.IChunkData);

        /** ChunkData chunkX. */
        public chunkX: number;

        /** ChunkData chunkY. */
        public chunkY: number;

        /** ChunkData chunkZ. */
        public chunkZ: number;

        /** ChunkData palette. */
        public palette: game.IPaletteEntry[];

        /** ChunkData ChunkBuffer. */
        public ChunkBuffer: Uint8Array;

        /**
         * Creates a new ChunkData instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ChunkData instance
         */
        public static create(properties?: game.IChunkData): game.ChunkData;

        /**
         * Encodes the specified ChunkData message. Does not implicitly {@link game.ChunkData.verify|verify} messages.
         * @param message ChunkData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: game.IChunkData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ChunkData message, length delimited. Does not implicitly {@link game.ChunkData.verify|verify} messages.
         * @param message ChunkData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: game.IChunkData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ChunkData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ChunkData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.ChunkData;

        /**
         * Decodes a ChunkData message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ChunkData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.ChunkData;

        /**
         * Verifies a ChunkData message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ChunkData message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ChunkData
         */
        public static fromObject(object: { [k: string]: any }): game.ChunkData;

        /**
         * Creates a plain object from a ChunkData message. Also converts values to other types if specified.
         * @param message ChunkData
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: game.ChunkData, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ChunkData to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ChunkData
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ChunkRequest. */
    interface IChunkRequest {

        /** ChunkRequest chunkX */
        chunkX?: (number|null);

        /** ChunkRequest chunkY */
        chunkY?: (number|null);

        /** ChunkRequest chunkZ */
        chunkZ?: (number|null);
    }

    /** Represents a ChunkRequest. */
    class ChunkRequest implements IChunkRequest {

        /**
         * Constructs a new ChunkRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.IChunkRequest);

        /** ChunkRequest chunkX. */
        public chunkX: number;

        /** ChunkRequest chunkY. */
        public chunkY: number;

        /** ChunkRequest chunkZ. */
        public chunkZ: number;

        /**
         * Creates a new ChunkRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ChunkRequest instance
         */
        public static create(properties?: game.IChunkRequest): game.ChunkRequest;

        /**
         * Encodes the specified ChunkRequest message. Does not implicitly {@link game.ChunkRequest.verify|verify} messages.
         * @param message ChunkRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: game.IChunkRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ChunkRequest message, length delimited. Does not implicitly {@link game.ChunkRequest.verify|verify} messages.
         * @param message ChunkRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: game.IChunkRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ChunkRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ChunkRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.ChunkRequest;

        /**
         * Decodes a ChunkRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ChunkRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.ChunkRequest;

        /**
         * Verifies a ChunkRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ChunkRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ChunkRequest
         */
        public static fromObject(object: { [k: string]: any }): game.ChunkRequest;

        /**
         * Creates a plain object from a ChunkRequest message. Also converts values to other types if specified.
         * @param message ChunkRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: game.ChunkRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ChunkRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ChunkRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a JoinServer. */
    interface IJoinServer {

        /** JoinServer username */
        username?: (string|null);
    }

    /** Represents a JoinServer. */
    class JoinServer implements IJoinServer {

        /**
         * Constructs a new JoinServer.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.IJoinServer);

        /** JoinServer username. */
        public username: string;

        /**
         * Creates a new JoinServer instance using the specified properties.
         * @param [properties] Properties to set
         * @returns JoinServer instance
         */
        public static create(properties?: game.IJoinServer): game.JoinServer;

        /**
         * Encodes the specified JoinServer message. Does not implicitly {@link game.JoinServer.verify|verify} messages.
         * @param message JoinServer message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: game.IJoinServer, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified JoinServer message, length delimited. Does not implicitly {@link game.JoinServer.verify|verify} messages.
         * @param message JoinServer message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: game.IJoinServer, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a JoinServer message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns JoinServer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.JoinServer;

        /**
         * Decodes a JoinServer message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns JoinServer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.JoinServer;

        /**
         * Verifies a JoinServer message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a JoinServer message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns JoinServer
         */
        public static fromObject(object: { [k: string]: any }): game.JoinServer;

        /**
         * Creates a plain object from a JoinServer message. Also converts values to other types if specified.
         * @param message JoinServer
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: game.JoinServer, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this JoinServer to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for JoinServer
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a PlayerPositionUpdate. */
    interface IPlayerPositionUpdate {

        /** PlayerPositionUpdate x */
        x?: (number|null);

        /** PlayerPositionUpdate y */
        y?: (number|null);

        /** PlayerPositionUpdate z */
        z?: (number|null);
    }

    /** Represents a PlayerPositionUpdate. */
    class PlayerPositionUpdate implements IPlayerPositionUpdate {

        /**
         * Constructs a new PlayerPositionUpdate.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.IPlayerPositionUpdate);

        /** PlayerPositionUpdate x. */
        public x: number;

        /** PlayerPositionUpdate y. */
        public y: number;

        /** PlayerPositionUpdate z. */
        public z: number;

        /**
         * Creates a new PlayerPositionUpdate instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PlayerPositionUpdate instance
         */
        public static create(properties?: game.IPlayerPositionUpdate): game.PlayerPositionUpdate;

        /**
         * Encodes the specified PlayerPositionUpdate message. Does not implicitly {@link game.PlayerPositionUpdate.verify|verify} messages.
         * @param message PlayerPositionUpdate message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: game.IPlayerPositionUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PlayerPositionUpdate message, length delimited. Does not implicitly {@link game.PlayerPositionUpdate.verify|verify} messages.
         * @param message PlayerPositionUpdate message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: game.IPlayerPositionUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PlayerPositionUpdate message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PlayerPositionUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.PlayerPositionUpdate;

        /**
         * Decodes a PlayerPositionUpdate message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PlayerPositionUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.PlayerPositionUpdate;

        /**
         * Verifies a PlayerPositionUpdate message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PlayerPositionUpdate message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PlayerPositionUpdate
         */
        public static fromObject(object: { [k: string]: any }): game.PlayerPositionUpdate;

        /**
         * Creates a plain object from a PlayerPositionUpdate message. Also converts values to other types if specified.
         * @param message PlayerPositionUpdate
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: game.PlayerPositionUpdate, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PlayerPositionUpdate to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PlayerPositionUpdate
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a PlayerBroadcastPositionUpdateSingle. */
    interface IPlayerBroadcastPositionUpdateSingle {

        /** PlayerBroadcastPositionUpdateSingle x */
        x?: (number|null);

        /** PlayerBroadcastPositionUpdateSingle y */
        y?: (number|null);

        /** PlayerBroadcastPositionUpdateSingle z */
        z?: (number|null);

        /** PlayerBroadcastPositionUpdateSingle username */
        username?: (string|null);
    }

    /** Represents a PlayerBroadcastPositionUpdateSingle. */
    class PlayerBroadcastPositionUpdateSingle implements IPlayerBroadcastPositionUpdateSingle {

        /**
         * Constructs a new PlayerBroadcastPositionUpdateSingle.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.IPlayerBroadcastPositionUpdateSingle);

        /** PlayerBroadcastPositionUpdateSingle x. */
        public x: number;

        /** PlayerBroadcastPositionUpdateSingle y. */
        public y: number;

        /** PlayerBroadcastPositionUpdateSingle z. */
        public z: number;

        /** PlayerBroadcastPositionUpdateSingle username. */
        public username: string;

        /**
         * Creates a new PlayerBroadcastPositionUpdateSingle instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PlayerBroadcastPositionUpdateSingle instance
         */
        public static create(properties?: game.IPlayerBroadcastPositionUpdateSingle): game.PlayerBroadcastPositionUpdateSingle;

        /**
         * Encodes the specified PlayerBroadcastPositionUpdateSingle message. Does not implicitly {@link game.PlayerBroadcastPositionUpdateSingle.verify|verify} messages.
         * @param message PlayerBroadcastPositionUpdateSingle message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: game.IPlayerBroadcastPositionUpdateSingle, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PlayerBroadcastPositionUpdateSingle message, length delimited. Does not implicitly {@link game.PlayerBroadcastPositionUpdateSingle.verify|verify} messages.
         * @param message PlayerBroadcastPositionUpdateSingle message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: game.IPlayerBroadcastPositionUpdateSingle, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PlayerBroadcastPositionUpdateSingle message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PlayerBroadcastPositionUpdateSingle
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.PlayerBroadcastPositionUpdateSingle;

        /**
         * Decodes a PlayerBroadcastPositionUpdateSingle message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PlayerBroadcastPositionUpdateSingle
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.PlayerBroadcastPositionUpdateSingle;

        /**
         * Verifies a PlayerBroadcastPositionUpdateSingle message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PlayerBroadcastPositionUpdateSingle message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PlayerBroadcastPositionUpdateSingle
         */
        public static fromObject(object: { [k: string]: any }): game.PlayerBroadcastPositionUpdateSingle;

        /**
         * Creates a plain object from a PlayerBroadcastPositionUpdateSingle message. Also converts values to other types if specified.
         * @param message PlayerBroadcastPositionUpdateSingle
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: game.PlayerBroadcastPositionUpdateSingle, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PlayerBroadcastPositionUpdateSingle to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PlayerBroadcastPositionUpdateSingle
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a PlayerBroadcastPositionUpdateBatched. */
    interface IPlayerBroadcastPositionUpdateBatched {

        /** PlayerBroadcastPositionUpdateBatched playerPositionUpdates */
        playerPositionUpdates?: (game.IPlayerBroadcastPositionUpdateSingle[]|null);
    }

    /** Represents a PlayerBroadcastPositionUpdateBatched. */
    class PlayerBroadcastPositionUpdateBatched implements IPlayerBroadcastPositionUpdateBatched {

        /**
         * Constructs a new PlayerBroadcastPositionUpdateBatched.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.IPlayerBroadcastPositionUpdateBatched);

        /** PlayerBroadcastPositionUpdateBatched playerPositionUpdates. */
        public playerPositionUpdates: game.IPlayerBroadcastPositionUpdateSingle[];

        /**
         * Creates a new PlayerBroadcastPositionUpdateBatched instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PlayerBroadcastPositionUpdateBatched instance
         */
        public static create(properties?: game.IPlayerBroadcastPositionUpdateBatched): game.PlayerBroadcastPositionUpdateBatched;

        /**
         * Encodes the specified PlayerBroadcastPositionUpdateBatched message. Does not implicitly {@link game.PlayerBroadcastPositionUpdateBatched.verify|verify} messages.
         * @param message PlayerBroadcastPositionUpdateBatched message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: game.IPlayerBroadcastPositionUpdateBatched, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PlayerBroadcastPositionUpdateBatched message, length delimited. Does not implicitly {@link game.PlayerBroadcastPositionUpdateBatched.verify|verify} messages.
         * @param message PlayerBroadcastPositionUpdateBatched message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: game.IPlayerBroadcastPositionUpdateBatched, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PlayerBroadcastPositionUpdateBatched message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PlayerBroadcastPositionUpdateBatched
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.PlayerBroadcastPositionUpdateBatched;

        /**
         * Decodes a PlayerBroadcastPositionUpdateBatched message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PlayerBroadcastPositionUpdateBatched
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.PlayerBroadcastPositionUpdateBatched;

        /**
         * Verifies a PlayerBroadcastPositionUpdateBatched message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PlayerBroadcastPositionUpdateBatched message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PlayerBroadcastPositionUpdateBatched
         */
        public static fromObject(object: { [k: string]: any }): game.PlayerBroadcastPositionUpdateBatched;

        /**
         * Creates a plain object from a PlayerBroadcastPositionUpdateBatched message. Also converts values to other types if specified.
         * @param message PlayerBroadcastPositionUpdateBatched
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: game.PlayerBroadcastPositionUpdateBatched, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PlayerBroadcastPositionUpdateBatched to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PlayerBroadcastPositionUpdateBatched
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Packet. */
    interface IPacket {

        /** Packet chunkRequest */
        chunkRequest?: (game.IChunkRequest|null);

        /** Packet chunkData */
        chunkData?: (game.IChunkData|null);

        /** Packet joinServer */
        joinServer?: (game.IJoinServer|null);

        /** Packet playerPositionUpdate */
        playerPositionUpdate?: (game.IPlayerPositionUpdate|null);

        /** Packet playerBroadcastPositionUpdateSingle */
        playerBroadcastPositionUpdateSingle?: (game.IPlayerBroadcastPositionUpdateSingle|null);

        /** Packet playerBroadcastPositionUpdateBatched */
        playerBroadcastPositionUpdateBatched?: (game.IPlayerBroadcastPositionUpdateBatched|null);
    }

    /** Represents a Packet. */
    class Packet implements IPacket {

        /**
         * Constructs a new Packet.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.IPacket);

        /** Packet chunkRequest. */
        public chunkRequest?: (game.IChunkRequest|null);

        /** Packet chunkData. */
        public chunkData?: (game.IChunkData|null);

        /** Packet joinServer. */
        public joinServer?: (game.IJoinServer|null);

        /** Packet playerPositionUpdate. */
        public playerPositionUpdate?: (game.IPlayerPositionUpdate|null);

        /** Packet playerBroadcastPositionUpdateSingle. */
        public playerBroadcastPositionUpdateSingle?: (game.IPlayerBroadcastPositionUpdateSingle|null);

        /** Packet playerBroadcastPositionUpdateBatched. */
        public playerBroadcastPositionUpdateBatched?: (game.IPlayerBroadcastPositionUpdateBatched|null);

        /** Packet payload. */
        public payload?: ("chunkRequest"|"chunkData"|"joinServer"|"playerPositionUpdate"|"playerBroadcastPositionUpdateSingle"|"playerBroadcastPositionUpdateBatched");

        /**
         * Creates a new Packet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Packet instance
         */
        public static create(properties?: game.IPacket): game.Packet;

        /**
         * Encodes the specified Packet message. Does not implicitly {@link game.Packet.verify|verify} messages.
         * @param message Packet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: game.IPacket, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Packet message, length delimited. Does not implicitly {@link game.Packet.verify|verify} messages.
         * @param message Packet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: game.IPacket, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Packet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Packet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.Packet;

        /**
         * Decodes a Packet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Packet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.Packet;

        /**
         * Verifies a Packet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Packet message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Packet
         */
        public static fromObject(object: { [k: string]: any }): game.Packet;

        /**
         * Creates a plain object from a Packet message. Also converts values to other types if specified.
         * @param message Packet
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: game.Packet, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Packet to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Packet
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}
