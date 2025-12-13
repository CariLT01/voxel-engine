/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ts/player.ts":
/*!**************************!*\
  !*** ./src/ts/player.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Player: () => (/* binding */ Player)\n/* harmony export */ });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.core.js\");\n/* harmony import */ var _entity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./entity */ \"./src/ts/entity.ts\");\n/* harmony import */ var three_src_math_MathUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three/src/math/MathUtils */ \"./node_modules/three/src/math/MathUtils.js\");\n\n\n\nclass Player extends _entity__WEBPACK_IMPORTED_MODULE_1__.Entity {\n    constructor(camera, position) {\n        super(position);\n        this.mouseDeltaX = 0;\n        this.mouseDeltaY = 0;\n        this.phi = 0;\n        this.theta = 0;\n        this.keysPressed = new Set();\n        this.camera = camera;\n        this.mouseEvents();\n        this.keyboardEvents();\n    }\n    updateRotation() {\n        const xh = this.mouseDeltaX / innerWidth;\n        const yh = this.mouseDeltaY / innerHeight;\n        this.phi += -xh * 5;\n        this.theta = (0,three_src_math_MathUtils__WEBPACK_IMPORTED_MODULE_2__.clamp)(this.theta + -yh * 5, -Math.PI / 2, Math.PI / 2);\n        const qx = new three__WEBPACK_IMPORTED_MODULE_0__.Quaternion();\n        qx.setFromAxisAngle(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 1, 0), this.phi);\n        const qy = new three__WEBPACK_IMPORTED_MODULE_0__.Quaternion();\n        qy.setFromAxisAngle(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(1, 0, 0), this.theta);\n        const q = new three__WEBPACK_IMPORTED_MODULE_0__.Quaternion();\n        q.multiply(qx);\n        q.multiply(qy);\n        this.rotation.copy(q);\n        this.mouseDeltaX = 0;\n        this.mouseDeltaY = 0;\n    }\n    updateTranslation(dt) {\n        const forwardVelocity = (this.keysPressed.has('w') ? 1 : 0) + (this.keysPressed.has('s') ? -1 : 0);\n        const strafeVelocity = (this.keysPressed.has('a') ? 1 : 0) + (this.keysPressed.has('d') ? -1 : 0);\n        let SPEED = 10;\n        if (this.isStandingInFluid() == true) {\n            SPEED = 4;\n        }\n        const qx = new three__WEBPACK_IMPORTED_MODULE_0__.Quaternion();\n        qx.setFromAxisAngle(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 1, 0), this.phi);\n        const forward = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 0, -1);\n        forward.applyQuaternion(qx);\n        forward.multiplyScalar(forwardVelocity * SPEED);\n        const left = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(-1, 0, 0);\n        left.applyQuaternion(qx);\n        left.multiplyScalar(strafeVelocity * SPEED);\n        this.accel.add(left);\n        this.accel.add(forward);\n    }\n    keyboardEvents() {\n        document.addEventListener(\"keydown\", (e) => {\n            this.keysPressed.add(e.key);\n            if (this.keysPressed.has(\" \")) {\n                this.jump();\n            }\n        });\n        document.addEventListener(\"keyup\", (e) => {\n            this.keysPressed.delete(e.key);\n        });\n    }\n    mouseEvents() {\n        document.addEventListener(\"mousemove\", (e) => {\n            this.mouseDeltaX = e.movementX;\n            this.mouseDeltaY = e.movementY;\n        });\n    }\n    updateCamera() {\n        this.camera.quaternion.copy(this.rotation);\n        this.camera.position.copy(this.position.clone().add(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, this.height * 0.9, 0)));\n    }\n    updatePlayer(delta) {\n        this.updateRotation();\n        this.updateTranslation(delta);\n        this.update(delta);\n        this.updateCamera();\n    }\n}\n\n\n//# sourceURL=webpack://threejs-marching-cubes/./src/ts/player.ts?\n}");

/***/ }),

/***/ "./src/ts/shaderMaterialLoader.ts":
/*!****************************************!*\
  !*** ./src/ts/shaderMaterialLoader.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createShaderMaterial: () => (/* binding */ createShaderMaterial)\n/* harmony export */ });\n/* harmony import */ var _shaders_chunkVertex_glsl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shaders/chunkVertex.glsl */ \"./src/shaders/chunkVertex.glsl\");\n/* harmony import */ var _shaders_chunkFragment_glsl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shaders/chunkFragment.glsl */ \"./src/shaders/chunkFragment.glsl\");\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.core.js\");\n/* harmony import */ var _Config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Config */ \"./src/ts/Config.ts\");\n/* harmony import */ var _assets_grass_side_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../assets/grass_side.png */ \"./src/assets/grass_side.png\");\n/* harmony import */ var _assets_grass_top_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../assets/grass_top.png */ \"./src/assets/grass_top.png\");\n/* harmony import */ var _assets_grass_bottom_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../assets/grass_bottom.png */ \"./src/assets/grass_bottom.png\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n\n\n\n\n\n\n\nfunction loadImage(src) {\n    return __awaiter(this, void 0, void 0, function* () {\n        return new Promise((resolve, reject) => {\n            const img = new Image();\n            img.onload = () => resolve(img);\n            img.onerror = reject;\n            img.src = src;\n        });\n    });\n}\nconst textures = [\n    _assets_grass_side_png__WEBPACK_IMPORTED_MODULE_4__,\n    _assets_grass_top_png__WEBPACK_IMPORTED_MODULE_5__,\n    _assets_grass_bottom_png__WEBPACK_IMPORTED_MODULE_6__,\n];\nfunction buildAtlas(textures) {\n    return __awaiter(this, void 0, void 0, function* () {\n        const images = [];\n        let max_x = 0;\n        let sum_y = 0;\n        for (const path of textures) {\n            const img = yield loadImage(path);\n            images.push(img);\n            if (img.width > max_x) {\n                max_x = img.width;\n            }\n            sum_y += img.height;\n        }\n        const canvas = document.createElement('canvas');\n        canvas.width = max_x;\n        canvas.height = sum_y;\n        const ctx = canvas.getContext('2d');\n        const atlasData = [];\n        let y = 0;\n        let index = 0;\n        for (const img of images) {\n            ctx.drawImage(img, 0, y);\n            atlasData[index] = {\n                beginX: 0,\n                beginY: y,\n                endX: img.width,\n                endY: y + img.height\n            };\n            y += img.height;\n            index++;\n        }\n        const atlas = new three__WEBPACK_IMPORTED_MODULE_2__.CanvasTexture(canvas);\n        atlas.needsUpdate = true;\n        atlas.minFilter = three__WEBPACK_IMPORTED_MODULE_2__.NearestFilter;\n        atlas.magFilter = three__WEBPACK_IMPORTED_MODULE_2__.NearestFilter;\n        atlas.generateMipmaps = false;\n        atlas.flipY = false;\n        atlas.wrapS = three__WEBPACK_IMPORTED_MODULE_2__.ClampToEdgeWrapping;\n        atlas.wrapT = three__WEBPACK_IMPORTED_MODULE_2__.ClampToEdgeWrapping;\n        atlas.needsUpdate = true;\n        return {\n            atlas: atlas,\n            atlasData: atlasData,\n            imageX: max_x,\n            imageY: sum_y\n        };\n    });\n}\nfunction createShaderMaterial() {\n    return __awaiter(this, void 0, void 0, function* () {\n        const atlasResult = yield buildAtlas(textures);\n        const material = new three__WEBPACK_IMPORTED_MODULE_2__.ShaderMaterial({\n            vertexShader: _shaders_chunkVertex_glsl__WEBPACK_IMPORTED_MODULE_0__,\n            glslVersion: three__WEBPACK_IMPORTED_MODULE_2__.GLSL3,\n            fragmentShader: _shaders_chunkFragment_glsl__WEBPACK_IMPORTED_MODULE_1__,\n            uniforms: {\n                chunkTexture: { value: atlasResult.atlas },\n                atlasHeight: { value: atlasResult.imageY }\n            },\n            wireframe: _Config__WEBPACK_IMPORTED_MODULE_3__.WIREFRAME_MODE\n        });\n        const materialTransparent = new three__WEBPACK_IMPORTED_MODULE_2__.ShaderMaterial({\n            vertexShader: _shaders_chunkVertex_glsl__WEBPACK_IMPORTED_MODULE_0__,\n            glslVersion: three__WEBPACK_IMPORTED_MODULE_2__.GLSL3,\n            fragmentShader: _shaders_chunkFragment_glsl__WEBPACK_IMPORTED_MODULE_1__,\n            uniforms: {\n                chunkTexture: { value: atlasResult.atlas },\n                atlasHeight: { value: atlasResult.imageY }\n            },\n            wireframe: _Config__WEBPACK_IMPORTED_MODULE_3__.WIREFRAME_MODE,\n            transparent: true\n        });\n        const atlasResultFinal = {\n            width: atlasResult.imageX,\n            height: atlasResult.imageY,\n            atlasData: atlasResult.atlasData\n        };\n        console.warn(\"Atlas data: \", atlasResult.atlasData);\n        return {\n            atlas: atlasResultFinal,\n            mat: material,\n            matTrans: materialTransparent\n        };\n    });\n}\n\n\n//# sourceURL=webpack://threejs-marching-cubes/./src/ts/shaderMaterialLoader.ts?\n}");

/***/ }),

/***/ "./src/ts/worldChunks.ts":
/*!*******************************!*\
  !*** ./src/ts/worldChunks.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ChunkManager: () => (/* binding */ ChunkManager)\n/* harmony export */ });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.core.js\");\n/* harmony import */ var _chunk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chunk */ \"./src/ts/chunk.ts\");\n/* harmony import */ var fastnoise_lite__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! fastnoise-lite */ \"./node_modules/fastnoise-lite/FastNoiseLite.js\");\n/* harmony import */ var _chunkBuilder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./chunkBuilder */ \"./src/ts/chunkBuilder.ts\");\n/* harmony import */ var _shaderMaterialLoader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./shaderMaterialLoader */ \"./src/ts/shaderMaterialLoader.ts\");\n/* harmony import */ var three_src_math_MathUtils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! three/src/math/MathUtils */ \"./node_modules/three/src/math/MathUtils.js\");\n/* harmony import */ var _chunkData__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./chunkData */ \"./src/ts/chunkData.ts\");\n/* harmony import */ var _Networking__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Networking */ \"./src/ts/Networking.ts\");\n/* harmony import */ var _compiled__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../compiled */ \"./compiled.js\");\n/* harmony import */ var _compiled__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_compiled__WEBPACK_IMPORTED_MODULE_8__);\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n\n\n\n\n\n\n\n\n\nconst RENDER_DISTANCE = 12;\nconst SEA_LEVEL = 20;\n// SPLINES\n/*\n    pv_curve = {\n        {-1, 0.03},\n        {-0.9,0.1},\n        {-0.2, 0.25},\n        {0, 0.3},\n        {0.4, 0.8},\n        {0.8, 1.0}\n    }\n}\n*/\nconst times = [-1, -0.9, -0.2, 0, 0.4, 0.8];\nconst values = [0.03, 0.1, 0.25, 0.3, 0.8, 1.0];\nconst interp = new three__WEBPACK_IMPORTED_MODULE_0__.CubicInterpolant(times, values, 1);\nfunction evalCurve(t) {\n    return interp.evaluate(t)[0];\n}\nfunction hashVec3Int(p) {\n    const C1 = 73856093;\n    const C2 = 19349663;\n    const C3 = 83492791;\n    const ix = Math.floor(p.x) + 10000;\n    const iy = Math.floor(p.y) + 10000;\n    const iz = Math.floor(p.z) + 10000;\n    return (ix * C1) ^ (iy * C2) ^ (iz * C3);\n}\nconst noise = new fastnoise_lite__WEBPACK_IMPORTED_MODULE_2__[\"default\"](1234);\nnoise.SetNoiseType(fastnoise_lite__WEBPACK_IMPORTED_MODULE_2__[\"default\"].NoiseType.OpenSimplex2); // choose Perlin\nnoise.SetFrequency(1);\nclass ChunkManager {\n    constructor(player) {\n        this.chunks = {};\n        this.hashToPos = {};\n        this.pendingChunks = {};\n        this.loadedChunks = {};\n        this.requestedAndWaitingChunks = new Set();\n        this.chunkBuilder = new _chunkBuilder__WEBPACK_IMPORTED_MODULE_3__.ChunkBuilder();\n        this.loadOffsets = this.precomputeLoadList();\n        this.player = player;\n        this.asyncInit();\n    }\n    precomputeLoadList() {\n        const loadList = [];\n        const playerPosition = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3();\n        for (let x = -RENDER_DISTANCE; x <= RENDER_DISTANCE; x++) {\n            for (let y = -RENDER_DISTANCE; y <= RENDER_DISTANCE; y++) {\n                for (let z = -RENDER_DISTANCE; z <= RENDER_DISTANCE; z++) {\n                    const p = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(x, y, z).add(playerPosition);\n                    loadList.push(p);\n                }\n            }\n        }\n        // Sort by distance\n        loadList.sort((a, b) => a.distanceToSquared(playerPosition) -\n            b.distanceToSquared(playerPosition));\n        return loadList;\n    }\n    asyncInit() {\n        return __awaiter(this, void 0, void 0, function* () {\n            const result = yield (0,_shaderMaterialLoader__WEBPACK_IMPORTED_MODULE_4__.createShaderMaterial)();\n            this.shaderResult = result;\n        });\n    }\n    createLoadList(playerPosition, skipLoaded = true) {\n        const loadList = new Map();\n        for (const pos of this.loadOffsets) {\n            const p = pos.clone().add(playerPosition);\n            const hash = hashVec3Int(p);\n            if (this.loadedChunks[hash] && skipLoaded === true) {\n                continue;\n            }\n            if (this.pendingChunks[hash] && skipLoaded === true) {\n                continue;\n            }\n            loadList.set(hash, p);\n        }\n        return Array.from(loadList.entries());\n    }\n    /*\n    local function fractalNoise(x:number, y:number, octaves:number, lacunarity:number, persistence:number, scale:number, seed:number)\n    -- The sum of our octaves\n    local value = 0\n\n    -- These coordinates will be scaled the lacunarity\n    local x1: number = x\n    local y1: number = y\n\n    -- Determines the effect of each octave on the previous sum\n    local amplitude = 1\n\n    for i = 1, octaves, 1 do\n        -- Multiply the noise output by the amplitude and add it to our sum\n        value += math.noise(x1 / scale, y1 / scale, seed) * amplitude\n\n        -- Scale up our perlin noise by multiplying the coordinates by lacunarity\n        y1 *= lacunarity\n        x1 *= lacunarity\n\n        -- Reduce our amplitude by multiplying it by persistence\n        amplitude *= persistence\n    end\n\n    -- It is possible to have an output value outside of the range [-1,1]\n    -- For consistency let's clamp it to that range\n    return math.clamp(value, -1, 1)\nend\n    */\n    fractalNoise(x, y, octaves, lacunarity, persistence, scale, seed) {\n        let value = 0;\n        let x1 = x;\n        let y1 = y;\n        let amplitude = 1;\n        for (let i = 0; i < octaves; i++) {\n            value += noise.GetNoise(x1 / scale, 0, y1 / scale) * amplitude;\n            x1 *= lacunarity;\n            y1 *= lacunarity;\n            amplitude *= persistence;\n        }\n        return (0,three_src_math_MathUtils__WEBPACK_IMPORTED_MODULE_5__.clamp)(value, -1, 1);\n    }\n    fractalNoise3D(x, y, z, octaves, lacunarity, persistence, scale = 1) {\n        let value = 0;\n        let x1 = x;\n        let y1 = y;\n        let z1 = z;\n        let amplitude = 1;\n        for (let i = 0; i < octaves; i++) {\n            value +=\n                noise.GetNoise(x1 / scale, y1 / scale, z1 / scale) * amplitude;\n            x1 *= lacunarity;\n            y1 *= lacunarity;\n            z1 *= lacunarity;\n            amplitude *= persistence;\n        }\n        return (0,three_src_math_MathUtils__WEBPACK_IMPORTED_MODULE_5__.clamp)(value, -1, 1);\n    }\n    generateChunk(chunkPosition, hash) {\n        /*const FREQ = 1.5;\n\n        const chunkData: ChunkData = new ChunkData();\n        let numNonAir = 0;\n        for (let x = 0; x < CHUNK_SIZE; x++) {\n            for (let z = 0; z < CHUNK_SIZE; z++) {\n                const worldX = chunkPosition.x * CHUNK_SIZE + x;\n                const worldZ = chunkPosition.z * CHUNK_SIZE + z;\n\n                const base_noise_ =\n                    (this.fractalNoise(\n                        worldX / (200 * FREQ),\n                        worldZ / (200 * FREQ),\n                        3,\n                        3,\n                        0.35,\n                        1,\n                        0\n                    ) +\n                        1) /\n                    2;\n                const h = base_noise_ * 100;\n\n                //const h = this.fractalNoise(worldX / 15, worldZ / 15, 1, 0.35, 3, 1, 0) * 200;\n                for (let y = 0; y < CHUNK_SIZE; y++) {\n                    const worldY = chunkPosition.y * CHUNK_SIZE + y;\n\n                    if (worldY < h) {\n                        chunkData.setBlockAt(x, y, z, {\n                            blockType: getBlockTypeIndexThrows(\"grass_block\"),\n                        });\n                    } else {\n                        chunkData.setBlockAt(x, y, z, {\n                            blockType: getBlockTypeIndexThrows(\"air\"),\n                        });\n                    }\n                }\n            }\n        }\n        if (numNonAir === 0) {\n            console.warn(\"Generated chunk filled with only air\");\n        }\n\n        chunkData.flushChanges();\n\n        return chunkData;*/\n        if (this.requestedAndWaitingChunks.has(hash)) {\n            return;\n        }\n        this.requestedAndWaitingChunks.add(hash);\n        const chunkRequestMessage = _compiled__WEBPACK_IMPORTED_MODULE_8__.game.Packet.create({\n            chunkRequest: {\n                chunkX: chunkPosition.x,\n                chunkY: chunkPosition.y,\n                chunkZ: chunkPosition.z,\n            },\n        });\n        const buffer = _compiled__WEBPACK_IMPORTED_MODULE_8__.game.Packet.encode(chunkRequestMessage).finish();\n        _Networking__WEBPACK_IMPORTED_MODULE_7__.ClientNetworkingService.send(buffer);\n        console.log(\"Requested chunk: \", chunkPosition, \" now pending\");\n    }\n    hasAllNeighbors(chunkPosition) {\n        const sides = [\n            new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(1, 0, 0),\n            new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(-1, 0, 0),\n            new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 1, 0),\n            new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, -1, 0),\n            new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 0, 1),\n            new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 0, -1),\n        ];\n        for (const side of sides) {\n            const pos = chunkPosition.clone().add(side);\n            const hash = hashVec3Int(pos);\n            if (!this.chunks[hash]) {\n                //console.log(\"Chunk: \", chunkPosition, \" missing neighbor(s) including \", pos);\n                return false;\n            }\n        }\n        return true;\n    }\n    getSides(chunkPosition) {\n        return {\n            negZ: this.chunks[hashVec3Int(chunkPosition.clone().add(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 0, -1)))],\n            negX: this.chunks[hashVec3Int(chunkPosition.clone().add(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(-1, 0, 0)))],\n            negY: this.chunks[hashVec3Int(chunkPosition.clone().add(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, -1, 0)))],\n            posZ: this.chunks[hashVec3Int(chunkPosition.clone().add(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 0, 1)))],\n            posX: this.chunks[hashVec3Int(chunkPosition.clone().add(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(1, 0, 0)))],\n            posY: this.chunks[hashVec3Int(chunkPosition.clone().add(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 1, 0)))],\n        };\n    }\n    processChunkDataPacket(packet) {\n        // Input packet is: game.Packet with game.ChunkData payload\n        const chunkData = packet.chunkData;\n        if (!chunkData) {\n            throw new Error(\"Packet not of type ChunkData\");\n        }\n        const chunkDataObj = new _chunkData__WEBPACK_IMPORTED_MODULE_6__.ChunkData();\n        const palette = chunkData.palette;\n        if (!palette) {\n            throw new Error(\"Palette not found\");\n        }\n        const paletteArray = [];\n        console.log(palette);\n        palette.forEach((entry) => {\n            const bt = entry.blockType;\n            if (bt == null) {\n                throw new Error(\"Block type not found on palette entry\");\n            }\n            paletteArray.push({\n                blockType: bt,\n            });\n        });\n        chunkDataObj.setPalette(paletteArray);\n        const blockArray = chunkData.ChunkBuffer;\n        if (!blockArray) {\n            throw new Error(\"Block array not found\");\n        }\n        chunkDataObj.setBlockArray(blockArray);\n        const positionX = chunkData.chunkX;\n        const positionY = chunkData.chunkY;\n        const positionZ = chunkData.chunkZ;\n        if (positionX == null || positionY == null || positionZ == null) {\n            throw new Error(\"Chunk position not found\");\n        }\n        const chunk = new _chunk__WEBPACK_IMPORTED_MODULE_1__.Chunk(chunkDataObj, new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(positionX, positionY, positionZ), this.chunkBuilder, this.shaderResult);\n        this.chunks[hashVec3Int(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(positionX, positionY, positionZ))] =\n            chunk;\n        this.requestedAndWaitingChunks.delete(hashVec3Int(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(positionX, positionY, positionZ)));\n        console.log(\"Chunk is now loaded: \", positionX, positionY, positionZ);\n        this.player.addChunk(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(positionX, positionY, positionZ), chunk);\n    }\n    loadIfPossible(first, scene) {\n        if (this.requestedAndWaitingChunks.has(first[0]) == true)\n            return;\n        if (this.chunks[first[0]] == undefined)\n            return;\n        const hasNeighbors = this.hasAllNeighbors(first[1]);\n        if (hasNeighbors == false) {\n            if (!this.pendingChunks[first[0]]) {\n                //console.log(\"Pending: \", first[1]);\n                this.pendingChunks[first[0]] = true;\n            }\n        }\n        else {\n            const chunk = this.chunks[first[0]];\n            if (!chunk) {\n                console.warn(\"Could not find chunk for: \", first[1]);\n                return;\n            }\n            console.log(\"Loading chunk: \", first[1].x, first[1].y, first[1].z);\n            const sides = this.getSides(first[1]);\n            chunk.buildChunk(sides.negZ, sides.posZ, sides.negX, sides.posX, sides.negY, sides.posY);\n            this.loadedChunks[first[0]] = true;\n            delete this.pendingChunks[first[0]];\n            //const boxHelper = new BoxHelper(chunk.getMesh() as Mesh, 0xff0000);\n            //scene.add(boxHelper);\n            scene.add(chunk.getMesh()[0]);\n            scene.add(chunk.getMesh()[1]);\n            //console.log(\"Loaded chunk:\", first[1]);\n        }\n    }\n    update(currentPosition, scene) {\n        if (!this.shaderResult)\n            return;\n        //console.log(\"Update\");\n        const loadArray = this.createLoadList(currentPosition);\n        const first = loadArray[0];\n        if (!first) {\n            //console.warn(\"No chunks to load:\", loadArray);\n            return;\n        }\n        if (!this.chunks[first[0]] &&\n            this.requestedAndWaitingChunks.has(first[0]) == false) {\n            this.hashToPos[first[0]] = first[1];\n            this.generateChunk(first[1], first[0]);\n        }\n        //const chunk = new Chunk(generated, first[1], this.chunkBuilder, this.shaderResult);\n        //this.chunks[hashVec3Int(first[1])] = chunk;\n        //this.hashToPos[first[0]] = first[1];\n        //console.log(\"Generated: \", first[1]);\n        // Check the neighbors\n        if (!this.loadedChunks[first[0]]) {\n            this.loadIfPossible(first, scene);\n        }\n        // Load pending\n        for (const pending of Object.keys(this.pendingChunks).map((k) => Number(k))) {\n            const p = this.hashToPos[pending];\n            if (!p) {\n                console.warn(\"unable to find pos for hash: \", pending);\n                continue;\n            }\n            this.loadIfPossible([pending, p], scene);\n        }\n        // Unload any unecessary\n        const loadArray2 = this.createLoadList(currentPosition, false);\n        const loadMap = {};\n        for (const c of loadArray2) {\n            loadMap[c[0]] = true;\n        }\n        //console.log(set);\n        for (const chunk of Object.keys(this.loadedChunks).map((k) => Number(k))) {\n            if (!loadMap[chunk]) {\n                const targetChunk = this.chunks[chunk];\n                if (targetChunk) {\n                    if (targetChunk.getMesh()) {\n                        const meshes = targetChunk.getMesh();\n                        scene.remove(targetChunk.getMesh()[0]);\n                        scene.remove(targetChunk.getMesh()[1]);\n                        meshes[0].geometry.dispose();\n                        meshes[1].geometry.dispose();\n                        targetChunk.disposeMesh();\n                    }\n                }\n                delete this.loadedChunks[chunk];\n                this.player.removeChunk(this.hashToPos[chunk]);\n                //console.log(\"Unloaded chunk: \", this.hashToPos[chunk]);\n            }\n        }\n    }\n}\n\n\n//# sourceURL=webpack://threejs-marching-cubes/./src/ts/worldChunks.ts?\n}");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/^blob:/, "").replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main-src_ts_p": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkthreejs_marching_cubes"] = self["webpackChunkthreejs_marching_cubes"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_fastnoise-lite_FastNoiseLite_js","vendors-node_modules_protobufjs_base64_index_js-node_modules_protobufjs_codegen_index_js-node-ff03b7","vendors-node_modules_protobufjs_inquire_index_js-node_modules_protobufjs_path_index_js-node_m-fec2ac","vendors-node_modules_protobufjs_src_index_js","vendors-node_modules_protobufjs_src_parse_js","vendors-node_modules_protobufjs_src_reader_buffer_js-node_modules_protobufjs_src_root_js-node-762c17","vendors-node_modules_protobufjs_src_tokenize_js-node_modules_protobufjs_src_type_js-node_modu-57f660","vendors-node_modules_protobufjs_src_verifier_js-node_modules_protobufjs_src_wrappers_js-node_-e0bd40","vendors-node_modules_stats_js_build_stats_min_js-node_modules_three_src_math_MathUtils_js","vendors-node_modules_three_build_three_core_js","vendors-node_modules_three_build_three_module_js","main-compiled_js-52650916","main-src_a"], () => (__webpack_require__("./src/ts/main.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;