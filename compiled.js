/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const game = $root.game = (() => {

    /**
     * Namespace game.
     * @exports game
     * @namespace
     */
    const game = {};

    game.PaletteEntry = (function() {

        /**
         * Properties of a PaletteEntry.
         * @memberof game
         * @interface IPaletteEntry
         * @property {number|null} [blockType] PaletteEntry blockType
         */

        /**
         * Constructs a new PaletteEntry.
         * @memberof game
         * @classdesc Represents a PaletteEntry.
         * @implements IPaletteEntry
         * @constructor
         * @param {game.IPaletteEntry=} [properties] Properties to set
         */
        function PaletteEntry(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PaletteEntry blockType.
         * @member {number} blockType
         * @memberof game.PaletteEntry
         * @instance
         */
        PaletteEntry.prototype.blockType = 0;

        /**
         * Creates a new PaletteEntry instance using the specified properties.
         * @function create
         * @memberof game.PaletteEntry
         * @static
         * @param {game.IPaletteEntry=} [properties] Properties to set
         * @returns {game.PaletteEntry} PaletteEntry instance
         */
        PaletteEntry.create = function create(properties) {
            return new PaletteEntry(properties);
        };

        /**
         * Encodes the specified PaletteEntry message. Does not implicitly {@link game.PaletteEntry.verify|verify} messages.
         * @function encode
         * @memberof game.PaletteEntry
         * @static
         * @param {game.IPaletteEntry} message PaletteEntry message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PaletteEntry.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.blockType != null && Object.hasOwnProperty.call(message, "blockType"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.blockType);
            return writer;
        };

        /**
         * Encodes the specified PaletteEntry message, length delimited. Does not implicitly {@link game.PaletteEntry.verify|verify} messages.
         * @function encodeDelimited
         * @memberof game.PaletteEntry
         * @static
         * @param {game.IPaletteEntry} message PaletteEntry message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PaletteEntry.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PaletteEntry message from the specified reader or buffer.
         * @function decode
         * @memberof game.PaletteEntry
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {game.PaletteEntry} PaletteEntry
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PaletteEntry.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.PaletteEntry();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.blockType = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PaletteEntry message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof game.PaletteEntry
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {game.PaletteEntry} PaletteEntry
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PaletteEntry.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PaletteEntry message.
         * @function verify
         * @memberof game.PaletteEntry
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PaletteEntry.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.blockType != null && message.hasOwnProperty("blockType"))
                if (!$util.isInteger(message.blockType))
                    return "blockType: integer expected";
            return null;
        };

        /**
         * Creates a PaletteEntry message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof game.PaletteEntry
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {game.PaletteEntry} PaletteEntry
         */
        PaletteEntry.fromObject = function fromObject(object) {
            if (object instanceof $root.game.PaletteEntry)
                return object;
            let message = new $root.game.PaletteEntry();
            if (object.blockType != null)
                message.blockType = object.blockType | 0;
            return message;
        };

        /**
         * Creates a plain object from a PaletteEntry message. Also converts values to other types if specified.
         * @function toObject
         * @memberof game.PaletteEntry
         * @static
         * @param {game.PaletteEntry} message PaletteEntry
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PaletteEntry.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.blockType = 0;
            if (message.blockType != null && message.hasOwnProperty("blockType"))
                object.blockType = message.blockType;
            return object;
        };

        /**
         * Converts this PaletteEntry to JSON.
         * @function toJSON
         * @memberof game.PaletteEntry
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PaletteEntry.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PaletteEntry
         * @function getTypeUrl
         * @memberof game.PaletteEntry
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PaletteEntry.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/game.PaletteEntry";
        };

        return PaletteEntry;
    })();

    game.ChunkData = (function() {

        /**
         * Properties of a ChunkData.
         * @memberof game
         * @interface IChunkData
         * @property {number|null} [chunkX] ChunkData chunkX
         * @property {number|null} [chunkY] ChunkData chunkY
         * @property {number|null} [chunkZ] ChunkData chunkZ
         * @property {Array.<game.IPaletteEntry>|null} [palette] ChunkData palette
         * @property {Uint8Array|null} [ChunkBuffer] ChunkData ChunkBuffer
         */

        /**
         * Constructs a new ChunkData.
         * @memberof game
         * @classdesc Represents a ChunkData.
         * @implements IChunkData
         * @constructor
         * @param {game.IChunkData=} [properties] Properties to set
         */
        function ChunkData(properties) {
            this.palette = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ChunkData chunkX.
         * @member {number} chunkX
         * @memberof game.ChunkData
         * @instance
         */
        ChunkData.prototype.chunkX = 0;

        /**
         * ChunkData chunkY.
         * @member {number} chunkY
         * @memberof game.ChunkData
         * @instance
         */
        ChunkData.prototype.chunkY = 0;

        /**
         * ChunkData chunkZ.
         * @member {number} chunkZ
         * @memberof game.ChunkData
         * @instance
         */
        ChunkData.prototype.chunkZ = 0;

        /**
         * ChunkData palette.
         * @member {Array.<game.IPaletteEntry>} palette
         * @memberof game.ChunkData
         * @instance
         */
        ChunkData.prototype.palette = $util.emptyArray;

        /**
         * ChunkData ChunkBuffer.
         * @member {Uint8Array} ChunkBuffer
         * @memberof game.ChunkData
         * @instance
         */
        ChunkData.prototype.ChunkBuffer = $util.newBuffer([]);

        /**
         * Creates a new ChunkData instance using the specified properties.
         * @function create
         * @memberof game.ChunkData
         * @static
         * @param {game.IChunkData=} [properties] Properties to set
         * @returns {game.ChunkData} ChunkData instance
         */
        ChunkData.create = function create(properties) {
            return new ChunkData(properties);
        };

        /**
         * Encodes the specified ChunkData message. Does not implicitly {@link game.ChunkData.verify|verify} messages.
         * @function encode
         * @memberof game.ChunkData
         * @static
         * @param {game.IChunkData} message ChunkData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ChunkData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.chunkX != null && Object.hasOwnProperty.call(message, "chunkX"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.chunkX);
            if (message.chunkY != null && Object.hasOwnProperty.call(message, "chunkY"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.chunkY);
            if (message.chunkZ != null && Object.hasOwnProperty.call(message, "chunkZ"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.chunkZ);
            if (message.palette != null && message.palette.length)
                for (let i = 0; i < message.palette.length; ++i)
                    $root.game.PaletteEntry.encode(message.palette[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.ChunkBuffer != null && Object.hasOwnProperty.call(message, "ChunkBuffer"))
                writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.ChunkBuffer);
            return writer;
        };

        /**
         * Encodes the specified ChunkData message, length delimited. Does not implicitly {@link game.ChunkData.verify|verify} messages.
         * @function encodeDelimited
         * @memberof game.ChunkData
         * @static
         * @param {game.IChunkData} message ChunkData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ChunkData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ChunkData message from the specified reader or buffer.
         * @function decode
         * @memberof game.ChunkData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {game.ChunkData} ChunkData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ChunkData.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.ChunkData();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.chunkX = reader.int32();
                        break;
                    }
                case 2: {
                        message.chunkY = reader.int32();
                        break;
                    }
                case 3: {
                        message.chunkZ = reader.int32();
                        break;
                    }
                case 4: {
                        if (!(message.palette && message.palette.length))
                            message.palette = [];
                        message.palette.push($root.game.PaletteEntry.decode(reader, reader.uint32()));
                        break;
                    }
                case 5: {
                        message.ChunkBuffer = reader.bytes();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ChunkData message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof game.ChunkData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {game.ChunkData} ChunkData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ChunkData.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ChunkData message.
         * @function verify
         * @memberof game.ChunkData
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ChunkData.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.chunkX != null && message.hasOwnProperty("chunkX"))
                if (!$util.isInteger(message.chunkX))
                    return "chunkX: integer expected";
            if (message.chunkY != null && message.hasOwnProperty("chunkY"))
                if (!$util.isInteger(message.chunkY))
                    return "chunkY: integer expected";
            if (message.chunkZ != null && message.hasOwnProperty("chunkZ"))
                if (!$util.isInteger(message.chunkZ))
                    return "chunkZ: integer expected";
            if (message.palette != null && message.hasOwnProperty("palette")) {
                if (!Array.isArray(message.palette))
                    return "palette: array expected";
                for (let i = 0; i < message.palette.length; ++i) {
                    let error = $root.game.PaletteEntry.verify(message.palette[i]);
                    if (error)
                        return "palette." + error;
                }
            }
            if (message.ChunkBuffer != null && message.hasOwnProperty("ChunkBuffer"))
                if (!(message.ChunkBuffer && typeof message.ChunkBuffer.length === "number" || $util.isString(message.ChunkBuffer)))
                    return "ChunkBuffer: buffer expected";
            return null;
        };

        /**
         * Creates a ChunkData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof game.ChunkData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {game.ChunkData} ChunkData
         */
        ChunkData.fromObject = function fromObject(object) {
            if (object instanceof $root.game.ChunkData)
                return object;
            let message = new $root.game.ChunkData();
            if (object.chunkX != null)
                message.chunkX = object.chunkX | 0;
            if (object.chunkY != null)
                message.chunkY = object.chunkY | 0;
            if (object.chunkZ != null)
                message.chunkZ = object.chunkZ | 0;
            if (object.palette) {
                if (!Array.isArray(object.palette))
                    throw TypeError(".game.ChunkData.palette: array expected");
                message.palette = [];
                for (let i = 0; i < object.palette.length; ++i) {
                    if (typeof object.palette[i] !== "object")
                        throw TypeError(".game.ChunkData.palette: object expected");
                    message.palette[i] = $root.game.PaletteEntry.fromObject(object.palette[i]);
                }
            }
            if (object.ChunkBuffer != null)
                if (typeof object.ChunkBuffer === "string")
                    $util.base64.decode(object.ChunkBuffer, message.ChunkBuffer = $util.newBuffer($util.base64.length(object.ChunkBuffer)), 0);
                else if (object.ChunkBuffer.length >= 0)
                    message.ChunkBuffer = object.ChunkBuffer;
            return message;
        };

        /**
         * Creates a plain object from a ChunkData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof game.ChunkData
         * @static
         * @param {game.ChunkData} message ChunkData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ChunkData.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.palette = [];
            if (options.defaults) {
                object.chunkX = 0;
                object.chunkY = 0;
                object.chunkZ = 0;
                if (options.bytes === String)
                    object.ChunkBuffer = "";
                else {
                    object.ChunkBuffer = [];
                    if (options.bytes !== Array)
                        object.ChunkBuffer = $util.newBuffer(object.ChunkBuffer);
                }
            }
            if (message.chunkX != null && message.hasOwnProperty("chunkX"))
                object.chunkX = message.chunkX;
            if (message.chunkY != null && message.hasOwnProperty("chunkY"))
                object.chunkY = message.chunkY;
            if (message.chunkZ != null && message.hasOwnProperty("chunkZ"))
                object.chunkZ = message.chunkZ;
            if (message.palette && message.palette.length) {
                object.palette = [];
                for (let j = 0; j < message.palette.length; ++j)
                    object.palette[j] = $root.game.PaletteEntry.toObject(message.palette[j], options);
            }
            if (message.ChunkBuffer != null && message.hasOwnProperty("ChunkBuffer"))
                object.ChunkBuffer = options.bytes === String ? $util.base64.encode(message.ChunkBuffer, 0, message.ChunkBuffer.length) : options.bytes === Array ? Array.prototype.slice.call(message.ChunkBuffer) : message.ChunkBuffer;
            return object;
        };

        /**
         * Converts this ChunkData to JSON.
         * @function toJSON
         * @memberof game.ChunkData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ChunkData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ChunkData
         * @function getTypeUrl
         * @memberof game.ChunkData
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ChunkData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/game.ChunkData";
        };

        return ChunkData;
    })();

    game.ChunkRequest = (function() {

        /**
         * Properties of a ChunkRequest.
         * @memberof game
         * @interface IChunkRequest
         * @property {number|null} [chunkX] ChunkRequest chunkX
         * @property {number|null} [chunkY] ChunkRequest chunkY
         * @property {number|null} [chunkZ] ChunkRequest chunkZ
         */

        /**
         * Constructs a new ChunkRequest.
         * @memberof game
         * @classdesc Represents a ChunkRequest.
         * @implements IChunkRequest
         * @constructor
         * @param {game.IChunkRequest=} [properties] Properties to set
         */
        function ChunkRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ChunkRequest chunkX.
         * @member {number} chunkX
         * @memberof game.ChunkRequest
         * @instance
         */
        ChunkRequest.prototype.chunkX = 0;

        /**
         * ChunkRequest chunkY.
         * @member {number} chunkY
         * @memberof game.ChunkRequest
         * @instance
         */
        ChunkRequest.prototype.chunkY = 0;

        /**
         * ChunkRequest chunkZ.
         * @member {number} chunkZ
         * @memberof game.ChunkRequest
         * @instance
         */
        ChunkRequest.prototype.chunkZ = 0;

        /**
         * Creates a new ChunkRequest instance using the specified properties.
         * @function create
         * @memberof game.ChunkRequest
         * @static
         * @param {game.IChunkRequest=} [properties] Properties to set
         * @returns {game.ChunkRequest} ChunkRequest instance
         */
        ChunkRequest.create = function create(properties) {
            return new ChunkRequest(properties);
        };

        /**
         * Encodes the specified ChunkRequest message. Does not implicitly {@link game.ChunkRequest.verify|verify} messages.
         * @function encode
         * @memberof game.ChunkRequest
         * @static
         * @param {game.IChunkRequest} message ChunkRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ChunkRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.chunkX != null && Object.hasOwnProperty.call(message, "chunkX"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.chunkX);
            if (message.chunkY != null && Object.hasOwnProperty.call(message, "chunkY"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.chunkY);
            if (message.chunkZ != null && Object.hasOwnProperty.call(message, "chunkZ"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.chunkZ);
            return writer;
        };

        /**
         * Encodes the specified ChunkRequest message, length delimited. Does not implicitly {@link game.ChunkRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof game.ChunkRequest
         * @static
         * @param {game.IChunkRequest} message ChunkRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ChunkRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ChunkRequest message from the specified reader or buffer.
         * @function decode
         * @memberof game.ChunkRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {game.ChunkRequest} ChunkRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ChunkRequest.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.ChunkRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.chunkX = reader.int32();
                        break;
                    }
                case 2: {
                        message.chunkY = reader.int32();
                        break;
                    }
                case 3: {
                        message.chunkZ = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ChunkRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof game.ChunkRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {game.ChunkRequest} ChunkRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ChunkRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ChunkRequest message.
         * @function verify
         * @memberof game.ChunkRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ChunkRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.chunkX != null && message.hasOwnProperty("chunkX"))
                if (!$util.isInteger(message.chunkX))
                    return "chunkX: integer expected";
            if (message.chunkY != null && message.hasOwnProperty("chunkY"))
                if (!$util.isInteger(message.chunkY))
                    return "chunkY: integer expected";
            if (message.chunkZ != null && message.hasOwnProperty("chunkZ"))
                if (!$util.isInteger(message.chunkZ))
                    return "chunkZ: integer expected";
            return null;
        };

        /**
         * Creates a ChunkRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof game.ChunkRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {game.ChunkRequest} ChunkRequest
         */
        ChunkRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.game.ChunkRequest)
                return object;
            let message = new $root.game.ChunkRequest();
            if (object.chunkX != null)
                message.chunkX = object.chunkX | 0;
            if (object.chunkY != null)
                message.chunkY = object.chunkY | 0;
            if (object.chunkZ != null)
                message.chunkZ = object.chunkZ | 0;
            return message;
        };

        /**
         * Creates a plain object from a ChunkRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof game.ChunkRequest
         * @static
         * @param {game.ChunkRequest} message ChunkRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ChunkRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.chunkX = 0;
                object.chunkY = 0;
                object.chunkZ = 0;
            }
            if (message.chunkX != null && message.hasOwnProperty("chunkX"))
                object.chunkX = message.chunkX;
            if (message.chunkY != null && message.hasOwnProperty("chunkY"))
                object.chunkY = message.chunkY;
            if (message.chunkZ != null && message.hasOwnProperty("chunkZ"))
                object.chunkZ = message.chunkZ;
            return object;
        };

        /**
         * Converts this ChunkRequest to JSON.
         * @function toJSON
         * @memberof game.ChunkRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ChunkRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ChunkRequest
         * @function getTypeUrl
         * @memberof game.ChunkRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ChunkRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/game.ChunkRequest";
        };

        return ChunkRequest;
    })();

    game.JoinServer = (function() {

        /**
         * Properties of a JoinServer.
         * @memberof game
         * @interface IJoinServer
         * @property {string|null} [username] JoinServer username
         */

        /**
         * Constructs a new JoinServer.
         * @memberof game
         * @classdesc Represents a JoinServer.
         * @implements IJoinServer
         * @constructor
         * @param {game.IJoinServer=} [properties] Properties to set
         */
        function JoinServer(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * JoinServer username.
         * @member {string} username
         * @memberof game.JoinServer
         * @instance
         */
        JoinServer.prototype.username = "";

        /**
         * Creates a new JoinServer instance using the specified properties.
         * @function create
         * @memberof game.JoinServer
         * @static
         * @param {game.IJoinServer=} [properties] Properties to set
         * @returns {game.JoinServer} JoinServer instance
         */
        JoinServer.create = function create(properties) {
            return new JoinServer(properties);
        };

        /**
         * Encodes the specified JoinServer message. Does not implicitly {@link game.JoinServer.verify|verify} messages.
         * @function encode
         * @memberof game.JoinServer
         * @static
         * @param {game.IJoinServer} message JoinServer message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        JoinServer.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.username != null && Object.hasOwnProperty.call(message, "username"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.username);
            return writer;
        };

        /**
         * Encodes the specified JoinServer message, length delimited. Does not implicitly {@link game.JoinServer.verify|verify} messages.
         * @function encodeDelimited
         * @memberof game.JoinServer
         * @static
         * @param {game.IJoinServer} message JoinServer message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        JoinServer.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a JoinServer message from the specified reader or buffer.
         * @function decode
         * @memberof game.JoinServer
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {game.JoinServer} JoinServer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        JoinServer.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.JoinServer();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.username = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a JoinServer message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof game.JoinServer
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {game.JoinServer} JoinServer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        JoinServer.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a JoinServer message.
         * @function verify
         * @memberof game.JoinServer
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        JoinServer.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.username != null && message.hasOwnProperty("username"))
                if (!$util.isString(message.username))
                    return "username: string expected";
            return null;
        };

        /**
         * Creates a JoinServer message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof game.JoinServer
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {game.JoinServer} JoinServer
         */
        JoinServer.fromObject = function fromObject(object) {
            if (object instanceof $root.game.JoinServer)
                return object;
            let message = new $root.game.JoinServer();
            if (object.username != null)
                message.username = String(object.username);
            return message;
        };

        /**
         * Creates a plain object from a JoinServer message. Also converts values to other types if specified.
         * @function toObject
         * @memberof game.JoinServer
         * @static
         * @param {game.JoinServer} message JoinServer
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        JoinServer.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.username = "";
            if (message.username != null && message.hasOwnProperty("username"))
                object.username = message.username;
            return object;
        };

        /**
         * Converts this JoinServer to JSON.
         * @function toJSON
         * @memberof game.JoinServer
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        JoinServer.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for JoinServer
         * @function getTypeUrl
         * @memberof game.JoinServer
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        JoinServer.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/game.JoinServer";
        };

        return JoinServer;
    })();

    game.PlayerPositionUpdate = (function() {

        /**
         * Properties of a PlayerPositionUpdate.
         * @memberof game
         * @interface IPlayerPositionUpdate
         * @property {number|null} [x] PlayerPositionUpdate x
         * @property {number|null} [y] PlayerPositionUpdate y
         * @property {number|null} [z] PlayerPositionUpdate z
         */

        /**
         * Constructs a new PlayerPositionUpdate.
         * @memberof game
         * @classdesc Represents a PlayerPositionUpdate.
         * @implements IPlayerPositionUpdate
         * @constructor
         * @param {game.IPlayerPositionUpdate=} [properties] Properties to set
         */
        function PlayerPositionUpdate(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PlayerPositionUpdate x.
         * @member {number} x
         * @memberof game.PlayerPositionUpdate
         * @instance
         */
        PlayerPositionUpdate.prototype.x = 0;

        /**
         * PlayerPositionUpdate y.
         * @member {number} y
         * @memberof game.PlayerPositionUpdate
         * @instance
         */
        PlayerPositionUpdate.prototype.y = 0;

        /**
         * PlayerPositionUpdate z.
         * @member {number} z
         * @memberof game.PlayerPositionUpdate
         * @instance
         */
        PlayerPositionUpdate.prototype.z = 0;

        /**
         * Creates a new PlayerPositionUpdate instance using the specified properties.
         * @function create
         * @memberof game.PlayerPositionUpdate
         * @static
         * @param {game.IPlayerPositionUpdate=} [properties] Properties to set
         * @returns {game.PlayerPositionUpdate} PlayerPositionUpdate instance
         */
        PlayerPositionUpdate.create = function create(properties) {
            return new PlayerPositionUpdate(properties);
        };

        /**
         * Encodes the specified PlayerPositionUpdate message. Does not implicitly {@link game.PlayerPositionUpdate.verify|verify} messages.
         * @function encode
         * @memberof game.PlayerPositionUpdate
         * @static
         * @param {game.IPlayerPositionUpdate} message PlayerPositionUpdate message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerPositionUpdate.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.x != null && Object.hasOwnProperty.call(message, "x"))
                writer.uint32(/* id 1, wireType 5 =*/13).float(message.x);
            if (message.y != null && Object.hasOwnProperty.call(message, "y"))
                writer.uint32(/* id 2, wireType 5 =*/21).float(message.y);
            if (message.z != null && Object.hasOwnProperty.call(message, "z"))
                writer.uint32(/* id 3, wireType 5 =*/29).float(message.z);
            return writer;
        };

        /**
         * Encodes the specified PlayerPositionUpdate message, length delimited. Does not implicitly {@link game.PlayerPositionUpdate.verify|verify} messages.
         * @function encodeDelimited
         * @memberof game.PlayerPositionUpdate
         * @static
         * @param {game.IPlayerPositionUpdate} message PlayerPositionUpdate message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerPositionUpdate.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PlayerPositionUpdate message from the specified reader or buffer.
         * @function decode
         * @memberof game.PlayerPositionUpdate
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {game.PlayerPositionUpdate} PlayerPositionUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerPositionUpdate.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.PlayerPositionUpdate();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.x = reader.float();
                        break;
                    }
                case 2: {
                        message.y = reader.float();
                        break;
                    }
                case 3: {
                        message.z = reader.float();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PlayerPositionUpdate message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof game.PlayerPositionUpdate
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {game.PlayerPositionUpdate} PlayerPositionUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerPositionUpdate.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PlayerPositionUpdate message.
         * @function verify
         * @memberof game.PlayerPositionUpdate
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PlayerPositionUpdate.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.x != null && message.hasOwnProperty("x"))
                if (typeof message.x !== "number")
                    return "x: number expected";
            if (message.y != null && message.hasOwnProperty("y"))
                if (typeof message.y !== "number")
                    return "y: number expected";
            if (message.z != null && message.hasOwnProperty("z"))
                if (typeof message.z !== "number")
                    return "z: number expected";
            return null;
        };

        /**
         * Creates a PlayerPositionUpdate message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof game.PlayerPositionUpdate
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {game.PlayerPositionUpdate} PlayerPositionUpdate
         */
        PlayerPositionUpdate.fromObject = function fromObject(object) {
            if (object instanceof $root.game.PlayerPositionUpdate)
                return object;
            let message = new $root.game.PlayerPositionUpdate();
            if (object.x != null)
                message.x = Number(object.x);
            if (object.y != null)
                message.y = Number(object.y);
            if (object.z != null)
                message.z = Number(object.z);
            return message;
        };

        /**
         * Creates a plain object from a PlayerPositionUpdate message. Also converts values to other types if specified.
         * @function toObject
         * @memberof game.PlayerPositionUpdate
         * @static
         * @param {game.PlayerPositionUpdate} message PlayerPositionUpdate
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PlayerPositionUpdate.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.x = 0;
                object.y = 0;
                object.z = 0;
            }
            if (message.x != null && message.hasOwnProperty("x"))
                object.x = options.json && !isFinite(message.x) ? String(message.x) : message.x;
            if (message.y != null && message.hasOwnProperty("y"))
                object.y = options.json && !isFinite(message.y) ? String(message.y) : message.y;
            if (message.z != null && message.hasOwnProperty("z"))
                object.z = options.json && !isFinite(message.z) ? String(message.z) : message.z;
            return object;
        };

        /**
         * Converts this PlayerPositionUpdate to JSON.
         * @function toJSON
         * @memberof game.PlayerPositionUpdate
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PlayerPositionUpdate.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PlayerPositionUpdate
         * @function getTypeUrl
         * @memberof game.PlayerPositionUpdate
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PlayerPositionUpdate.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/game.PlayerPositionUpdate";
        };

        return PlayerPositionUpdate;
    })();

    game.PlayerBroadcastPositionUpdateSingle = (function() {

        /**
         * Properties of a PlayerBroadcastPositionUpdateSingle.
         * @memberof game
         * @interface IPlayerBroadcastPositionUpdateSingle
         * @property {number|null} [x] PlayerBroadcastPositionUpdateSingle x
         * @property {number|null} [y] PlayerBroadcastPositionUpdateSingle y
         * @property {number|null} [z] PlayerBroadcastPositionUpdateSingle z
         * @property {string|null} [username] PlayerBroadcastPositionUpdateSingle username
         */

        /**
         * Constructs a new PlayerBroadcastPositionUpdateSingle.
         * @memberof game
         * @classdesc Represents a PlayerBroadcastPositionUpdateSingle.
         * @implements IPlayerBroadcastPositionUpdateSingle
         * @constructor
         * @param {game.IPlayerBroadcastPositionUpdateSingle=} [properties] Properties to set
         */
        function PlayerBroadcastPositionUpdateSingle(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PlayerBroadcastPositionUpdateSingle x.
         * @member {number} x
         * @memberof game.PlayerBroadcastPositionUpdateSingle
         * @instance
         */
        PlayerBroadcastPositionUpdateSingle.prototype.x = 0;

        /**
         * PlayerBroadcastPositionUpdateSingle y.
         * @member {number} y
         * @memberof game.PlayerBroadcastPositionUpdateSingle
         * @instance
         */
        PlayerBroadcastPositionUpdateSingle.prototype.y = 0;

        /**
         * PlayerBroadcastPositionUpdateSingle z.
         * @member {number} z
         * @memberof game.PlayerBroadcastPositionUpdateSingle
         * @instance
         */
        PlayerBroadcastPositionUpdateSingle.prototype.z = 0;

        /**
         * PlayerBroadcastPositionUpdateSingle username.
         * @member {string} username
         * @memberof game.PlayerBroadcastPositionUpdateSingle
         * @instance
         */
        PlayerBroadcastPositionUpdateSingle.prototype.username = "";

        /**
         * Creates a new PlayerBroadcastPositionUpdateSingle instance using the specified properties.
         * @function create
         * @memberof game.PlayerBroadcastPositionUpdateSingle
         * @static
         * @param {game.IPlayerBroadcastPositionUpdateSingle=} [properties] Properties to set
         * @returns {game.PlayerBroadcastPositionUpdateSingle} PlayerBroadcastPositionUpdateSingle instance
         */
        PlayerBroadcastPositionUpdateSingle.create = function create(properties) {
            return new PlayerBroadcastPositionUpdateSingle(properties);
        };

        /**
         * Encodes the specified PlayerBroadcastPositionUpdateSingle message. Does not implicitly {@link game.PlayerBroadcastPositionUpdateSingle.verify|verify} messages.
         * @function encode
         * @memberof game.PlayerBroadcastPositionUpdateSingle
         * @static
         * @param {game.IPlayerBroadcastPositionUpdateSingle} message PlayerBroadcastPositionUpdateSingle message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerBroadcastPositionUpdateSingle.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.x != null && Object.hasOwnProperty.call(message, "x"))
                writer.uint32(/* id 1, wireType 5 =*/13).float(message.x);
            if (message.y != null && Object.hasOwnProperty.call(message, "y"))
                writer.uint32(/* id 2, wireType 5 =*/21).float(message.y);
            if (message.z != null && Object.hasOwnProperty.call(message, "z"))
                writer.uint32(/* id 3, wireType 5 =*/29).float(message.z);
            if (message.username != null && Object.hasOwnProperty.call(message, "username"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.username);
            return writer;
        };

        /**
         * Encodes the specified PlayerBroadcastPositionUpdateSingle message, length delimited. Does not implicitly {@link game.PlayerBroadcastPositionUpdateSingle.verify|verify} messages.
         * @function encodeDelimited
         * @memberof game.PlayerBroadcastPositionUpdateSingle
         * @static
         * @param {game.IPlayerBroadcastPositionUpdateSingle} message PlayerBroadcastPositionUpdateSingle message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerBroadcastPositionUpdateSingle.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PlayerBroadcastPositionUpdateSingle message from the specified reader or buffer.
         * @function decode
         * @memberof game.PlayerBroadcastPositionUpdateSingle
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {game.PlayerBroadcastPositionUpdateSingle} PlayerBroadcastPositionUpdateSingle
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerBroadcastPositionUpdateSingle.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.PlayerBroadcastPositionUpdateSingle();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.x = reader.float();
                        break;
                    }
                case 2: {
                        message.y = reader.float();
                        break;
                    }
                case 3: {
                        message.z = reader.float();
                        break;
                    }
                case 4: {
                        message.username = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PlayerBroadcastPositionUpdateSingle message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof game.PlayerBroadcastPositionUpdateSingle
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {game.PlayerBroadcastPositionUpdateSingle} PlayerBroadcastPositionUpdateSingle
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerBroadcastPositionUpdateSingle.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PlayerBroadcastPositionUpdateSingle message.
         * @function verify
         * @memberof game.PlayerBroadcastPositionUpdateSingle
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PlayerBroadcastPositionUpdateSingle.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.x != null && message.hasOwnProperty("x"))
                if (typeof message.x !== "number")
                    return "x: number expected";
            if (message.y != null && message.hasOwnProperty("y"))
                if (typeof message.y !== "number")
                    return "y: number expected";
            if (message.z != null && message.hasOwnProperty("z"))
                if (typeof message.z !== "number")
                    return "z: number expected";
            if (message.username != null && message.hasOwnProperty("username"))
                if (!$util.isString(message.username))
                    return "username: string expected";
            return null;
        };

        /**
         * Creates a PlayerBroadcastPositionUpdateSingle message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof game.PlayerBroadcastPositionUpdateSingle
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {game.PlayerBroadcastPositionUpdateSingle} PlayerBroadcastPositionUpdateSingle
         */
        PlayerBroadcastPositionUpdateSingle.fromObject = function fromObject(object) {
            if (object instanceof $root.game.PlayerBroadcastPositionUpdateSingle)
                return object;
            let message = new $root.game.PlayerBroadcastPositionUpdateSingle();
            if (object.x != null)
                message.x = Number(object.x);
            if (object.y != null)
                message.y = Number(object.y);
            if (object.z != null)
                message.z = Number(object.z);
            if (object.username != null)
                message.username = String(object.username);
            return message;
        };

        /**
         * Creates a plain object from a PlayerBroadcastPositionUpdateSingle message. Also converts values to other types if specified.
         * @function toObject
         * @memberof game.PlayerBroadcastPositionUpdateSingle
         * @static
         * @param {game.PlayerBroadcastPositionUpdateSingle} message PlayerBroadcastPositionUpdateSingle
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PlayerBroadcastPositionUpdateSingle.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.x = 0;
                object.y = 0;
                object.z = 0;
                object.username = "";
            }
            if (message.x != null && message.hasOwnProperty("x"))
                object.x = options.json && !isFinite(message.x) ? String(message.x) : message.x;
            if (message.y != null && message.hasOwnProperty("y"))
                object.y = options.json && !isFinite(message.y) ? String(message.y) : message.y;
            if (message.z != null && message.hasOwnProperty("z"))
                object.z = options.json && !isFinite(message.z) ? String(message.z) : message.z;
            if (message.username != null && message.hasOwnProperty("username"))
                object.username = message.username;
            return object;
        };

        /**
         * Converts this PlayerBroadcastPositionUpdateSingle to JSON.
         * @function toJSON
         * @memberof game.PlayerBroadcastPositionUpdateSingle
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PlayerBroadcastPositionUpdateSingle.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PlayerBroadcastPositionUpdateSingle
         * @function getTypeUrl
         * @memberof game.PlayerBroadcastPositionUpdateSingle
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PlayerBroadcastPositionUpdateSingle.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/game.PlayerBroadcastPositionUpdateSingle";
        };

        return PlayerBroadcastPositionUpdateSingle;
    })();

    game.PlayerBroadcastPositionUpdateBatched = (function() {

        /**
         * Properties of a PlayerBroadcastPositionUpdateBatched.
         * @memberof game
         * @interface IPlayerBroadcastPositionUpdateBatched
         * @property {Array.<game.IPlayerBroadcastPositionUpdateSingle>|null} [playerPositionUpdates] PlayerBroadcastPositionUpdateBatched playerPositionUpdates
         */

        /**
         * Constructs a new PlayerBroadcastPositionUpdateBatched.
         * @memberof game
         * @classdesc Represents a PlayerBroadcastPositionUpdateBatched.
         * @implements IPlayerBroadcastPositionUpdateBatched
         * @constructor
         * @param {game.IPlayerBroadcastPositionUpdateBatched=} [properties] Properties to set
         */
        function PlayerBroadcastPositionUpdateBatched(properties) {
            this.playerPositionUpdates = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PlayerBroadcastPositionUpdateBatched playerPositionUpdates.
         * @member {Array.<game.IPlayerBroadcastPositionUpdateSingle>} playerPositionUpdates
         * @memberof game.PlayerBroadcastPositionUpdateBatched
         * @instance
         */
        PlayerBroadcastPositionUpdateBatched.prototype.playerPositionUpdates = $util.emptyArray;

        /**
         * Creates a new PlayerBroadcastPositionUpdateBatched instance using the specified properties.
         * @function create
         * @memberof game.PlayerBroadcastPositionUpdateBatched
         * @static
         * @param {game.IPlayerBroadcastPositionUpdateBatched=} [properties] Properties to set
         * @returns {game.PlayerBroadcastPositionUpdateBatched} PlayerBroadcastPositionUpdateBatched instance
         */
        PlayerBroadcastPositionUpdateBatched.create = function create(properties) {
            return new PlayerBroadcastPositionUpdateBatched(properties);
        };

        /**
         * Encodes the specified PlayerBroadcastPositionUpdateBatched message. Does not implicitly {@link game.PlayerBroadcastPositionUpdateBatched.verify|verify} messages.
         * @function encode
         * @memberof game.PlayerBroadcastPositionUpdateBatched
         * @static
         * @param {game.IPlayerBroadcastPositionUpdateBatched} message PlayerBroadcastPositionUpdateBatched message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerBroadcastPositionUpdateBatched.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.playerPositionUpdates != null && message.playerPositionUpdates.length)
                for (let i = 0; i < message.playerPositionUpdates.length; ++i)
                    $root.game.PlayerBroadcastPositionUpdateSingle.encode(message.playerPositionUpdates[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PlayerBroadcastPositionUpdateBatched message, length delimited. Does not implicitly {@link game.PlayerBroadcastPositionUpdateBatched.verify|verify} messages.
         * @function encodeDelimited
         * @memberof game.PlayerBroadcastPositionUpdateBatched
         * @static
         * @param {game.IPlayerBroadcastPositionUpdateBatched} message PlayerBroadcastPositionUpdateBatched message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerBroadcastPositionUpdateBatched.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PlayerBroadcastPositionUpdateBatched message from the specified reader or buffer.
         * @function decode
         * @memberof game.PlayerBroadcastPositionUpdateBatched
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {game.PlayerBroadcastPositionUpdateBatched} PlayerBroadcastPositionUpdateBatched
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerBroadcastPositionUpdateBatched.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.PlayerBroadcastPositionUpdateBatched();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.playerPositionUpdates && message.playerPositionUpdates.length))
                            message.playerPositionUpdates = [];
                        message.playerPositionUpdates.push($root.game.PlayerBroadcastPositionUpdateSingle.decode(reader, reader.uint32()));
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PlayerBroadcastPositionUpdateBatched message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof game.PlayerBroadcastPositionUpdateBatched
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {game.PlayerBroadcastPositionUpdateBatched} PlayerBroadcastPositionUpdateBatched
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerBroadcastPositionUpdateBatched.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PlayerBroadcastPositionUpdateBatched message.
         * @function verify
         * @memberof game.PlayerBroadcastPositionUpdateBatched
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PlayerBroadcastPositionUpdateBatched.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.playerPositionUpdates != null && message.hasOwnProperty("playerPositionUpdates")) {
                if (!Array.isArray(message.playerPositionUpdates))
                    return "playerPositionUpdates: array expected";
                for (let i = 0; i < message.playerPositionUpdates.length; ++i) {
                    let error = $root.game.PlayerBroadcastPositionUpdateSingle.verify(message.playerPositionUpdates[i]);
                    if (error)
                        return "playerPositionUpdates." + error;
                }
            }
            return null;
        };

        /**
         * Creates a PlayerBroadcastPositionUpdateBatched message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof game.PlayerBroadcastPositionUpdateBatched
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {game.PlayerBroadcastPositionUpdateBatched} PlayerBroadcastPositionUpdateBatched
         */
        PlayerBroadcastPositionUpdateBatched.fromObject = function fromObject(object) {
            if (object instanceof $root.game.PlayerBroadcastPositionUpdateBatched)
                return object;
            let message = new $root.game.PlayerBroadcastPositionUpdateBatched();
            if (object.playerPositionUpdates) {
                if (!Array.isArray(object.playerPositionUpdates))
                    throw TypeError(".game.PlayerBroadcastPositionUpdateBatched.playerPositionUpdates: array expected");
                message.playerPositionUpdates = [];
                for (let i = 0; i < object.playerPositionUpdates.length; ++i) {
                    if (typeof object.playerPositionUpdates[i] !== "object")
                        throw TypeError(".game.PlayerBroadcastPositionUpdateBatched.playerPositionUpdates: object expected");
                    message.playerPositionUpdates[i] = $root.game.PlayerBroadcastPositionUpdateSingle.fromObject(object.playerPositionUpdates[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a PlayerBroadcastPositionUpdateBatched message. Also converts values to other types if specified.
         * @function toObject
         * @memberof game.PlayerBroadcastPositionUpdateBatched
         * @static
         * @param {game.PlayerBroadcastPositionUpdateBatched} message PlayerBroadcastPositionUpdateBatched
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PlayerBroadcastPositionUpdateBatched.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.playerPositionUpdates = [];
            if (message.playerPositionUpdates && message.playerPositionUpdates.length) {
                object.playerPositionUpdates = [];
                for (let j = 0; j < message.playerPositionUpdates.length; ++j)
                    object.playerPositionUpdates[j] = $root.game.PlayerBroadcastPositionUpdateSingle.toObject(message.playerPositionUpdates[j], options);
            }
            return object;
        };

        /**
         * Converts this PlayerBroadcastPositionUpdateBatched to JSON.
         * @function toJSON
         * @memberof game.PlayerBroadcastPositionUpdateBatched
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PlayerBroadcastPositionUpdateBatched.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PlayerBroadcastPositionUpdateBatched
         * @function getTypeUrl
         * @memberof game.PlayerBroadcastPositionUpdateBatched
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PlayerBroadcastPositionUpdateBatched.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/game.PlayerBroadcastPositionUpdateBatched";
        };

        return PlayerBroadcastPositionUpdateBatched;
    })();

    game.Packet = (function() {

        /**
         * Properties of a Packet.
         * @memberof game
         * @interface IPacket
         * @property {game.IChunkRequest|null} [chunkRequest] Packet chunkRequest
         * @property {game.IChunkData|null} [chunkData] Packet chunkData
         * @property {game.IJoinServer|null} [joinServer] Packet joinServer
         * @property {game.IPlayerPositionUpdate|null} [playerPositionUpdate] Packet playerPositionUpdate
         * @property {game.IPlayerBroadcastPositionUpdateSingle|null} [playerBroadcastPositionUpdateSingle] Packet playerBroadcastPositionUpdateSingle
         * @property {game.IPlayerBroadcastPositionUpdateBatched|null} [playerBroadcastPositionUpdateBatched] Packet playerBroadcastPositionUpdateBatched
         */

        /**
         * Constructs a new Packet.
         * @memberof game
         * @classdesc Represents a Packet.
         * @implements IPacket
         * @constructor
         * @param {game.IPacket=} [properties] Properties to set
         */
        function Packet(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Packet chunkRequest.
         * @member {game.IChunkRequest|null|undefined} chunkRequest
         * @memberof game.Packet
         * @instance
         */
        Packet.prototype.chunkRequest = null;

        /**
         * Packet chunkData.
         * @member {game.IChunkData|null|undefined} chunkData
         * @memberof game.Packet
         * @instance
         */
        Packet.prototype.chunkData = null;

        /**
         * Packet joinServer.
         * @member {game.IJoinServer|null|undefined} joinServer
         * @memberof game.Packet
         * @instance
         */
        Packet.prototype.joinServer = null;

        /**
         * Packet playerPositionUpdate.
         * @member {game.IPlayerPositionUpdate|null|undefined} playerPositionUpdate
         * @memberof game.Packet
         * @instance
         */
        Packet.prototype.playerPositionUpdate = null;

        /**
         * Packet playerBroadcastPositionUpdateSingle.
         * @member {game.IPlayerBroadcastPositionUpdateSingle|null|undefined} playerBroadcastPositionUpdateSingle
         * @memberof game.Packet
         * @instance
         */
        Packet.prototype.playerBroadcastPositionUpdateSingle = null;

        /**
         * Packet playerBroadcastPositionUpdateBatched.
         * @member {game.IPlayerBroadcastPositionUpdateBatched|null|undefined} playerBroadcastPositionUpdateBatched
         * @memberof game.Packet
         * @instance
         */
        Packet.prototype.playerBroadcastPositionUpdateBatched = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * Packet payload.
         * @member {"chunkRequest"|"chunkData"|"joinServer"|"playerPositionUpdate"|"playerBroadcastPositionUpdateSingle"|"playerBroadcastPositionUpdateBatched"|undefined} payload
         * @memberof game.Packet
         * @instance
         */
        Object.defineProperty(Packet.prototype, "payload", {
            get: $util.oneOfGetter($oneOfFields = ["chunkRequest", "chunkData", "joinServer", "playerPositionUpdate", "playerBroadcastPositionUpdateSingle", "playerBroadcastPositionUpdateBatched"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new Packet instance using the specified properties.
         * @function create
         * @memberof game.Packet
         * @static
         * @param {game.IPacket=} [properties] Properties to set
         * @returns {game.Packet} Packet instance
         */
        Packet.create = function create(properties) {
            return new Packet(properties);
        };

        /**
         * Encodes the specified Packet message. Does not implicitly {@link game.Packet.verify|verify} messages.
         * @function encode
         * @memberof game.Packet
         * @static
         * @param {game.IPacket} message Packet message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Packet.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.chunkRequest != null && Object.hasOwnProperty.call(message, "chunkRequest"))
                $root.game.ChunkRequest.encode(message.chunkRequest, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.chunkData != null && Object.hasOwnProperty.call(message, "chunkData"))
                $root.game.ChunkData.encode(message.chunkData, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.joinServer != null && Object.hasOwnProperty.call(message, "joinServer"))
                $root.game.JoinServer.encode(message.joinServer, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.playerPositionUpdate != null && Object.hasOwnProperty.call(message, "playerPositionUpdate"))
                $root.game.PlayerPositionUpdate.encode(message.playerPositionUpdate, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.playerBroadcastPositionUpdateSingle != null && Object.hasOwnProperty.call(message, "playerBroadcastPositionUpdateSingle"))
                $root.game.PlayerBroadcastPositionUpdateSingle.encode(message.playerBroadcastPositionUpdateSingle, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            if (message.playerBroadcastPositionUpdateBatched != null && Object.hasOwnProperty.call(message, "playerBroadcastPositionUpdateBatched"))
                $root.game.PlayerBroadcastPositionUpdateBatched.encode(message.playerBroadcastPositionUpdateBatched, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Packet message, length delimited. Does not implicitly {@link game.Packet.verify|verify} messages.
         * @function encodeDelimited
         * @memberof game.Packet
         * @static
         * @param {game.IPacket} message Packet message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Packet.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Packet message from the specified reader or buffer.
         * @function decode
         * @memberof game.Packet
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {game.Packet} Packet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Packet.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.Packet();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.chunkRequest = $root.game.ChunkRequest.decode(reader, reader.uint32());
                        break;
                    }
                case 2: {
                        message.chunkData = $root.game.ChunkData.decode(reader, reader.uint32());
                        break;
                    }
                case 3: {
                        message.joinServer = $root.game.JoinServer.decode(reader, reader.uint32());
                        break;
                    }
                case 4: {
                        message.playerPositionUpdate = $root.game.PlayerPositionUpdate.decode(reader, reader.uint32());
                        break;
                    }
                case 5: {
                        message.playerBroadcastPositionUpdateSingle = $root.game.PlayerBroadcastPositionUpdateSingle.decode(reader, reader.uint32());
                        break;
                    }
                case 6: {
                        message.playerBroadcastPositionUpdateBatched = $root.game.PlayerBroadcastPositionUpdateBatched.decode(reader, reader.uint32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Packet message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof game.Packet
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {game.Packet} Packet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Packet.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Packet message.
         * @function verify
         * @memberof game.Packet
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Packet.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            let properties = {};
            if (message.chunkRequest != null && message.hasOwnProperty("chunkRequest")) {
                properties.payload = 1;
                {
                    let error = $root.game.ChunkRequest.verify(message.chunkRequest);
                    if (error)
                        return "chunkRequest." + error;
                }
            }
            if (message.chunkData != null && message.hasOwnProperty("chunkData")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    let error = $root.game.ChunkData.verify(message.chunkData);
                    if (error)
                        return "chunkData." + error;
                }
            }
            if (message.joinServer != null && message.hasOwnProperty("joinServer")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    let error = $root.game.JoinServer.verify(message.joinServer);
                    if (error)
                        return "joinServer." + error;
                }
            }
            if (message.playerPositionUpdate != null && message.hasOwnProperty("playerPositionUpdate")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    let error = $root.game.PlayerPositionUpdate.verify(message.playerPositionUpdate);
                    if (error)
                        return "playerPositionUpdate." + error;
                }
            }
            if (message.playerBroadcastPositionUpdateSingle != null && message.hasOwnProperty("playerBroadcastPositionUpdateSingle")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    let error = $root.game.PlayerBroadcastPositionUpdateSingle.verify(message.playerBroadcastPositionUpdateSingle);
                    if (error)
                        return "playerBroadcastPositionUpdateSingle." + error;
                }
            }
            if (message.playerBroadcastPositionUpdateBatched != null && message.hasOwnProperty("playerBroadcastPositionUpdateBatched")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    let error = $root.game.PlayerBroadcastPositionUpdateBatched.verify(message.playerBroadcastPositionUpdateBatched);
                    if (error)
                        return "playerBroadcastPositionUpdateBatched." + error;
                }
            }
            return null;
        };

        /**
         * Creates a Packet message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof game.Packet
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {game.Packet} Packet
         */
        Packet.fromObject = function fromObject(object) {
            if (object instanceof $root.game.Packet)
                return object;
            let message = new $root.game.Packet();
            if (object.chunkRequest != null) {
                if (typeof object.chunkRequest !== "object")
                    throw TypeError(".game.Packet.chunkRequest: object expected");
                message.chunkRequest = $root.game.ChunkRequest.fromObject(object.chunkRequest);
            }
            if (object.chunkData != null) {
                if (typeof object.chunkData !== "object")
                    throw TypeError(".game.Packet.chunkData: object expected");
                message.chunkData = $root.game.ChunkData.fromObject(object.chunkData);
            }
            if (object.joinServer != null) {
                if (typeof object.joinServer !== "object")
                    throw TypeError(".game.Packet.joinServer: object expected");
                message.joinServer = $root.game.JoinServer.fromObject(object.joinServer);
            }
            if (object.playerPositionUpdate != null) {
                if (typeof object.playerPositionUpdate !== "object")
                    throw TypeError(".game.Packet.playerPositionUpdate: object expected");
                message.playerPositionUpdate = $root.game.PlayerPositionUpdate.fromObject(object.playerPositionUpdate);
            }
            if (object.playerBroadcastPositionUpdateSingle != null) {
                if (typeof object.playerBroadcastPositionUpdateSingle !== "object")
                    throw TypeError(".game.Packet.playerBroadcastPositionUpdateSingle: object expected");
                message.playerBroadcastPositionUpdateSingle = $root.game.PlayerBroadcastPositionUpdateSingle.fromObject(object.playerBroadcastPositionUpdateSingle);
            }
            if (object.playerBroadcastPositionUpdateBatched != null) {
                if (typeof object.playerBroadcastPositionUpdateBatched !== "object")
                    throw TypeError(".game.Packet.playerBroadcastPositionUpdateBatched: object expected");
                message.playerBroadcastPositionUpdateBatched = $root.game.PlayerBroadcastPositionUpdateBatched.fromObject(object.playerBroadcastPositionUpdateBatched);
            }
            return message;
        };

        /**
         * Creates a plain object from a Packet message. Also converts values to other types if specified.
         * @function toObject
         * @memberof game.Packet
         * @static
         * @param {game.Packet} message Packet
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Packet.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (message.chunkRequest != null && message.hasOwnProperty("chunkRequest")) {
                object.chunkRequest = $root.game.ChunkRequest.toObject(message.chunkRequest, options);
                if (options.oneofs)
                    object.payload = "chunkRequest";
            }
            if (message.chunkData != null && message.hasOwnProperty("chunkData")) {
                object.chunkData = $root.game.ChunkData.toObject(message.chunkData, options);
                if (options.oneofs)
                    object.payload = "chunkData";
            }
            if (message.joinServer != null && message.hasOwnProperty("joinServer")) {
                object.joinServer = $root.game.JoinServer.toObject(message.joinServer, options);
                if (options.oneofs)
                    object.payload = "joinServer";
            }
            if (message.playerPositionUpdate != null && message.hasOwnProperty("playerPositionUpdate")) {
                object.playerPositionUpdate = $root.game.PlayerPositionUpdate.toObject(message.playerPositionUpdate, options);
                if (options.oneofs)
                    object.payload = "playerPositionUpdate";
            }
            if (message.playerBroadcastPositionUpdateSingle != null && message.hasOwnProperty("playerBroadcastPositionUpdateSingle")) {
                object.playerBroadcastPositionUpdateSingle = $root.game.PlayerBroadcastPositionUpdateSingle.toObject(message.playerBroadcastPositionUpdateSingle, options);
                if (options.oneofs)
                    object.payload = "playerBroadcastPositionUpdateSingle";
            }
            if (message.playerBroadcastPositionUpdateBatched != null && message.hasOwnProperty("playerBroadcastPositionUpdateBatched")) {
                object.playerBroadcastPositionUpdateBatched = $root.game.PlayerBroadcastPositionUpdateBatched.toObject(message.playerBroadcastPositionUpdateBatched, options);
                if (options.oneofs)
                    object.payload = "playerBroadcastPositionUpdateBatched";
            }
            return object;
        };

        /**
         * Converts this Packet to JSON.
         * @function toJSON
         * @memberof game.Packet
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Packet.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Packet
         * @function getTypeUrl
         * @memberof game.Packet
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Packet.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/game.Packet";
        };

        return Packet;
    })();

    return game;
})();

export { $root as default };
