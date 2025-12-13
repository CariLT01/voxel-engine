/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
(function(global, factory) { /* global define, require, module */

    /* AMD */ if (typeof define === 'function' && define.amd)
        define(["protobufjs/minimal"], factory);

    /* CommonJS */ else if (typeof require === 'function' && typeof module === 'object' && module && module.exports)
        module.exports = factory(require("protobufjs/minimal"));

})(this, function($protobuf) {
    "use strict";

    // Common aliases
    var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
    
    // Exported root namespace
    var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
    
    $root.game = (function() {
    
        /**
         * Namespace game.
         * @exports game
         * @namespace
         */
        var game = {};
    
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
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
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
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.PaletteEntry();
                while (reader.pos < end) {
                    var tag = reader.uint32();
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
                var message = new $root.game.PaletteEntry();
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
                var object = {};
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
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
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
                    for (var i = 0; i < message.palette.length; ++i)
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
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.ChunkData();
                while (reader.pos < end) {
                    var tag = reader.uint32();
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
                    for (var i = 0; i < message.palette.length; ++i) {
                        var error = $root.game.PaletteEntry.verify(message.palette[i]);
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
                var message = new $root.game.ChunkData();
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
                    for (var i = 0; i < object.palette.length; ++i) {
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
                var object = {};
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
                    for (var j = 0; j < message.palette.length; ++j)
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
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
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
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.ChunkRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
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
                var message = new $root.game.ChunkRequest();
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
                var object = {};
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
    
        game.Packet = (function() {
    
            /**
             * Properties of a Packet.
             * @memberof game
             * @interface IPacket
             * @property {game.IChunkRequest|null} [chunkRequest] Packet chunkRequest
             * @property {game.IChunkData|null} [chunkData] Packet chunkData
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
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
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
    
            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;
    
            /**
             * Packet payload.
             * @member {"chunkRequest"|"chunkData"|undefined} payload
             * @memberof game.Packet
             * @instance
             */
            Object.defineProperty(Packet.prototype, "payload", {
                get: $util.oneOfGetter($oneOfFields = ["chunkRequest", "chunkData"]),
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
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.Packet();
                while (reader.pos < end) {
                    var tag = reader.uint32();
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
                var properties = {};
                if (message.chunkRequest != null && message.hasOwnProperty("chunkRequest")) {
                    properties.payload = 1;
                    {
                        var error = $root.game.ChunkRequest.verify(message.chunkRequest);
                        if (error)
                            return "chunkRequest." + error;
                    }
                }
                if (message.chunkData != null && message.hasOwnProperty("chunkData")) {
                    if (properties.payload === 1)
                        return "payload: multiple values";
                    properties.payload = 1;
                    {
                        var error = $root.game.ChunkData.verify(message.chunkData);
                        if (error)
                            return "chunkData." + error;
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
                var message = new $root.game.Packet();
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
                var object = {};
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

    return $root;
});
