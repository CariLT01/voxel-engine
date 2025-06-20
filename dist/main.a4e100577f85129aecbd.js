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

/***/ "./assets/sky.exr":
/*!************************!*\
  !*** ./assets/sky.exr ***!
  \************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"d5d2cb755a2ced3b6a68.exr\";\n\n//# sourceURL=webpack://threejs-marching-cubes/./assets/sky.exr?");

/***/ }),

/***/ "./src/ts/chunk.ts":
/*!*************************!*\
  !*** ./src/ts/chunk.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Chunk: () => (/* binding */ Chunk)\n/* harmony export */ });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.core.js\");\n\nconst CHUNK_SIZE = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(32, 32, 32);\nclass Chunk {\n    constructor(chunkData, position, chunkBuilder) {\n        this.meshObject = null;\n        this.chunkData = chunkData;\n        this.chunkBuilder = chunkBuilder;\n        this.position = position;\n    }\n    getData() {\n        return this.chunkData;\n    }\n    getMesh() {\n        return this.meshObject;\n    }\n    disposeMesh() {\n        this.meshObject = null;\n    }\n    buildChunk(negZChunk, posZChunk, negXChunk, posXChunk, negYChunk, posYChunk) {\n        const geometry = this.chunkBuilder.buildGeometryFromChunkData(this.chunkData, negZChunk.getData(), posZChunk.getData(), negXChunk.getData(), posXChunk.getData(), negYChunk.getData(), posYChunk.getData());\n        const material = new three__WEBPACK_IMPORTED_MODULE_0__.MeshPhysicalMaterial({ color: 0xaaaaaa, flatShading: false });\n        const mesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(geometry, material);\n        mesh.position.copy(this.position.clone().multiply(CHUNK_SIZE));\n        this.meshObject = mesh;\n        return mesh;\n    }\n}\n\n\n//# sourceURL=webpack://threejs-marching-cubes/./src/ts/chunk.ts?");

/***/ }),

/***/ "./src/ts/chunkBuilder.ts":
/*!********************************!*\
  !*** ./src/ts/chunkBuilder.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ChunkBuilder: () => (/* binding */ ChunkBuilder)\n/* harmony export */ });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.core.js\");\n\nconst frontVertices = [\n    [0, 0, 1], // 0 bottom-left\n    [1, 0, 1], // 1 bottom-right\n    [1, 1, 1], // 2 top-right\n    [0, 1, 1], // 3 top-left\n];\nconst frontTriangles = [\n    0, 1, 2,\n    0, 2, 3,\n];\nconst backVertices = [\n    [1, 0, 0], // 0 bottom-right\n    [0, 0, 0], // 1 bottom-left\n    [0, 1, 0], // 2 top-left\n    [1, 1, 0], // 3 top-right\n];\nconst backTriangles = [\n    0, 1, 2,\n    0, 2, 3,\n];\nconst leftVertices = [\n    [0, 0, 0], // 0 bottom-back\n    [0, 0, 1], // 1 bottom-front\n    [0, 1, 1], // 2 top-front\n    [0, 1, 0], // 3 top-back\n];\nconst leftTriangles = [\n    0, 1, 2,\n    0, 2, 3,\n];\nconst rightVertices = [\n    [1, 0, 1], // 0 bottom-front\n    [1, 0, 0], // 1 bottom-back\n    [1, 1, 0], // 2 top-back\n    [1, 1, 1], // 3 top-front\n];\nconst rightTriangles = [\n    0, 1, 2,\n    0, 2, 3,\n];\nconst topVertices = [\n    [0, 1, 1], // 0 front-left\n    [1, 1, 1], // 1 front-right\n    [1, 1, 0], // 2 back-right\n    [0, 1, 0], // 3 back-left\n];\nconst topTriangles = [\n    0, 1, 2,\n    0, 2, 3,\n];\nconst bottomVertices = [\n    [0, 0, 0], // 0 back-left\n    [1, 0, 0], // 1 back-right\n    [1, 0, 1], // 2 front-right\n    [0, 0, 1], // 3 front-left\n];\nconst bottomTriangles = [\n    0, 1, 2,\n    0, 2, 3,\n];\nconst faceTris = [\n    0, 1, 2,\n    0, 2, 3,\n];\nclass ChunkBuilder {\n    constructor(chunSize) {\n        this.chunkSize = chunSize;\n    }\n    checkVoid(chunkData, p, s, // Shift direction (e.g., [1,0,0] for +X)\n    negZdata, posZdata, negXdata, posXdata, negYdata, posYdata) {\n        const pos = p.clone().add(s);\n        let dataArray = chunkData;\n        if (!dataArray) {\n            throw new Error(\"Data array is null; Case should never happen\");\n        }\n        let localX = pos.x, localY = pos.y, localZ = pos.z;\n        // Only handle the axis we're shifting in (prioritize this neighbor)\n        if (s.x !== 0) {\n            if (pos.x < 0) {\n                dataArray = negXdata;\n                localX = this.chunkSize.x - 1;\n            }\n            else if (pos.x >= this.chunkSize.x) {\n                dataArray = posXdata;\n                localX = 0;\n            }\n        }\n        else if (s.y !== 0) {\n            if (pos.y < 0) {\n                dataArray = negYdata;\n                localY = this.chunkSize.y - 1;\n            }\n            else if (pos.y >= this.chunkSize.y) {\n                dataArray = posYdata;\n                localY = 0;\n            }\n        }\n        else if (s.z !== 0) {\n            if (pos.z < 0) {\n                dataArray = negZdata;\n                localZ = this.chunkSize.z - 1;\n            }\n            else if (pos.z >= this.chunkSize.z) {\n                dataArray = posZdata;\n                localZ = 0;\n            }\n        }\n        // No neighbor → treat as empty\n        if (!dataArray) {\n            throw new Error(\"No neighbor!\");\n        }\n        ;\n        // Calculate index and check block\n        const idx = localX + localY * this.chunkSize.x + localZ * this.chunkSize.x * this.chunkSize.y;\n        const block = dataArray[idx];\n        if (block === null || block === undefined) {\n            throw new Error(\"Block not found. Case should not be possible.\");\n        }\n        return block === 0; // Air or missing block\n    }\n    addVertex(v, p) {\n        return [v[0] + p.x, v[1] + p.y, v[2] + p.z];\n    }\n    buildGeometryFromChunkData(chunkData, negZdata, posZdata, negXdata, posXdata, negYdata, posYdata) {\n        // Indexing of  x + y * width + z * width * height\n        const facesData = [];\n        const vertices = [];\n        const normals = [];\n        let facesBuilt = 0;\n        for (let x = 0; x < this.chunkSize.x; x++) {\n            for (let y = 0; y < this.chunkSize.y; y++) {\n                for (let z = 0; z < this.chunkSize.z; z++) {\n                    const index = x + y * this.chunkSize.x + z * this.chunkSize.x * this.chunkSize.y;\n                    if (chunkData[index] == 0) {\n                        continue;\n                    }\n                    const currentposition = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(x, y, z);\n                    if (this.checkVoid(chunkData, currentposition, new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 0, 1), negZdata, posZdata, negXdata, posXdata, negYdata, posYdata)) {\n                        for (const index of faceTris) {\n                            facesBuilt++;\n                            vertices.push(this.addVertex(frontVertices[index], currentposition));\n                            normals.push(0);\n                            normals.push(0);\n                            normals.push(1);\n                        }\n                    }\n                    if (this.checkVoid(chunkData, currentposition, (new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 0, -1)), negZdata, posZdata, negXdata, posXdata, negYdata, posYdata)) {\n                        for (const index of faceTris) {\n                            facesBuilt++;\n                            vertices.push(this.addVertex(backVertices[index], currentposition));\n                            normals.push(0);\n                            normals.push(0);\n                            normals.push(-1);\n                        }\n                    }\n                    if (this.checkVoid(chunkData, currentposition, (new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 1, 0)), negZdata, posZdata, negXdata, posXdata, negYdata, posYdata)) {\n                        for (const index of faceTris) {\n                            facesBuilt++;\n                            vertices.push(this.addVertex(topVertices[index], currentposition));\n                            normals.push(0);\n                            normals.push(1);\n                            normals.push(0);\n                        }\n                    }\n                    if (this.checkVoid(chunkData, currentposition, (new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, -1, 0)), negZdata, posZdata, negXdata, posXdata, negYdata, posYdata)) {\n                        for (const index of faceTris) {\n                            facesBuilt++;\n                            vertices.push(this.addVertex(bottomVertices[index], currentposition));\n                            normals.push(0);\n                            normals.push(-1);\n                            normals.push(0);\n                        }\n                    }\n                    if (this.checkVoid(chunkData, currentposition, (new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(1, 0, 0)), negZdata, posZdata, negXdata, posXdata, negYdata, posYdata)) {\n                        for (const index of faceTris) {\n                            facesBuilt++;\n                            vertices.push(this.addVertex(rightVertices[index], currentposition));\n                            normals.push(1);\n                            normals.push(0);\n                            normals.push(0);\n                        }\n                    }\n                    if (this.checkVoid(chunkData, currentposition, (new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(-1, 0, 0)), negZdata, posZdata, negXdata, posXdata, negYdata, posYdata)) {\n                        for (const index of faceTris) {\n                            facesBuilt++;\n                            vertices.push(this.addVertex(leftVertices[index], currentposition));\n                            normals.push(-1);\n                            normals.push(0);\n                            normals.push(0);\n                        }\n                    }\n                }\n            }\n        }\n        const verticesFlattened = [];\n        for (const vertex of vertices) {\n            verticesFlattened.push(vertex[0], vertex[1], vertex[2]);\n        }\n        const geometry = new three__WEBPACK_IMPORTED_MODULE_0__.BufferGeometry();\n        geometry.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_0__.Float32BufferAttribute(verticesFlattened, 3));\n        geometry.setAttribute('normal', new three__WEBPACK_IMPORTED_MODULE_0__.Float32BufferAttribute(normals, 3));\n        console.log(\"# faces built: \", facesBuilt);\n        return geometry;\n    }\n}\n\n\n//# sourceURL=webpack://threejs-marching-cubes/./src/ts/chunkBuilder.ts?");

/***/ }),

/***/ "./src/ts/collider.ts":
/*!****************************!*\
  !*** ./src/ts/collider.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Collider: () => (/* binding */ Collider)\n/* harmony export */ });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.core.js\");\n\nclass Collider {\n    constructor(pos1, pos2) {\n        this.p1 = pos1;\n        this.p2 = pos2;\n    }\n    add(pos) {\n        return new Collider(this.p1.clone().add(pos), this.p2.clone().add(pos));\n    }\n    intersect(collider) {\n        const x = Math.min(this.p2.x, collider.p2.x) - Math.max(this.p1.x, collider.p1.x);\n        const y = Math.min(this.p2.y, collider.p2.y) - Math.max(this.p1.y, collider.p1.y);\n        const z = Math.min(this.p2.z, collider.p2.z) - Math.max(this.p1.z, collider.p1.z);\n        return x > 0 && y > 0 && z > 0;\n    }\n    time(x, y) {\n        if (y !== 0) {\n            return x / y;\n        }\n        if (x > 0) {\n            return Number.NEGATIVE_INFINITY;\n        }\n        else if (x < 0) {\n            return Number.POSITIVE_INFINITY;\n        }\n        else {\n            // x is 0, division by zero is NaN\n            return NaN;\n        }\n    }\n    collide(collider, velocity) {\n        let x_entry = this.time(collider.p1.x - this.p2.x, velocity.x);\n        let x_exit = this.time(collider.p2.x - this.p1.x, velocity.x);\n        if (!(velocity.x > 0)) {\n            x_entry = this.time(collider.p2.x - this.p1.x, velocity.x);\n            x_exit = this.time(collider.p1.x - this.p2.x, velocity.x);\n        }\n        let y_entry = this.time(collider.p1.y - this.p2.y, velocity.y);\n        let y_exit = this.time(collider.p2.y - this.p1.y, velocity.y);\n        if (!(velocity.y > 0)) {\n            y_entry = this.time(collider.p2.y - this.p1.y, velocity.y);\n            y_exit = this.time(collider.p1.y - this.p2.y, velocity.y);\n        }\n        let z_entry = this.time(collider.p1.z - this.p2.z, velocity.z);\n        let z_exit = this.time(collider.p2.z - this.p1.z, velocity.z);\n        if (!(velocity.z > 0)) {\n            z_entry = this.time(collider.p2.z - this.p1.z, velocity.z);\n            z_exit = this.time(collider.p1.z - this.p2.z, velocity.z);\n        }\n        if (x_entry < 0 && y_entry < 0 && z_entry < 0) {\n            return;\n        }\n        if (x_entry > 1 || y_entry > 1 || z_entry > 1) {\n            return;\n        }\n        const entry = Math.max(x_entry, y_entry, z_entry);\n        const exit = Math.min(x_exit, y_exit, z_exit);\n        if (entry > exit) {\n            return;\n        }\n        // Find normal\n        const nx = (entry === x_entry)\n            ? (velocity.x > 0 ? -1 : 1)\n            : 0;\n        const ny = (entry === y_entry)\n            ? (velocity.y > 0 ? -1 : 1)\n            : 0;\n        const nz = (entry === z_entry)\n            ? (velocity.z > 0 ? -1 : 1)\n            : 0;\n        return {\n            entry: entry,\n            normal: new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(nx, ny, nz)\n        };\n    }\n}\n\n\n//# sourceURL=webpack://threejs-marching-cubes/./src/ts/collider.ts?");

/***/ }),

/***/ "./src/ts/entity.ts":
/*!**************************!*\
  !*** ./src/ts/entity.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Entity: () => (/* binding */ Entity)\n/* harmony export */ });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.core.js\");\n/* harmony import */ var _collider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./collider */ \"./src/ts/collider.ts\");\n\n\nconst COLLISION_RADIUS = 5;\nconst GRAVITY_ACCEL = new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, -32, 0);\nconst FRICTION = new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(3, 0.4, 3);\nconst DRAG_JUMP = new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(1.8, 0, 1.8);\nconst DRAG_FALL = new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(1.8, 0.4, 1.8);\nconst C1 = 73856093, C2 = 19349663, C3 = 83492791;\nfunction hashVec3Int(p) {\n    const ix = Math.floor(p.x) + 10000;\n    const iy = Math.floor(p.y) + 10000;\n    const iz = Math.floor(p.z) + 10000;\n    return (ix * C1) ^ (iy * C2) ^ (iz * C3);\n}\nclass Entity {\n    constructor(position, rotation = new three__WEBPACK_IMPORTED_MODULE_1__.Quaternion(), width = 0.6, height = 1.8) {\n        this.position = new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 0, 0);\n        this.rotation = new three__WEBPACK_IMPORTED_MODULE_1__.Quaternion(0, 0, 0, 0);\n        this.velocity = new three__WEBPACK_IMPORTED_MODULE_1__.Vector3();\n        this.accel = new three__WEBPACK_IMPORTED_MODULE_1__.Vector3();\n        this.width = 0.6;\n        this.height = 1.8;\n        this.jumpHeight = 1.25;\n        this.collider = new _collider__WEBPACK_IMPORTED_MODULE_0__.Collider(new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(), new three__WEBPACK_IMPORTED_MODULE_1__.Vector3());\n        this.offsets = new Set();\n        this.chunkSize = new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(32, 32, 32);\n        this.chunks = new Map();\n        this.isGrounded = false;\n        this.precomputeOffsets();\n        this.position = position;\n        this.rotation = rotation;\n        this.width = width;\n        this.height = height;\n    }\n    getFriction() {\n        if (this.isGrounded) {\n            return FRICTION;\n        }\n        if (this.velocity.y > 0) {\n            return DRAG_JUMP;\n        }\n        return DRAG_FALL;\n    }\n    jump() {\n        if (!this.isGrounded) {\n            console.warn(\"{Debug} Can't jump in air!\");\n            return;\n        }\n        ;\n        this.velocity.add(new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, Math.sqrt(-2 * GRAVITY_ACCEL.y * this.jumpHeight)));\n    }\n    worldBlockPosition(pos, offset) {\n        // world-space integer block pos\n        return pos.clone().add(offset).round();\n    }\n    getChunkContaining(world) {\n        const cPos = new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(Math.floor(world.x / this.chunkSize.x), Math.floor(world.y / this.chunkSize.y), Math.floor(world.z / this.chunkSize.z));\n        return this.chunks.get(hashVec3Int(cPos));\n    }\n    precomputeOffsets() {\n        for (let x = -COLLISION_RADIUS; x <= COLLISION_RADIUS; x++) {\n            for (let y = -COLLISION_RADIUS; y <= COLLISION_RADIUS; y++) {\n                for (let z = -COLLISION_RADIUS; z <= COLLISION_RADIUS; z++) {\n                    const v = new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(x, y, z);\n                    if (v.lengthSq() <= COLLISION_RADIUS * COLLISION_RADIUS) {\n                        this.offsets.add(v);\n                    }\n                }\n            }\n        }\n    }\n    updateCollider() {\n        this.collider.p1.set(this.position.x - this.width / 2, this.position.y, this.position.z - this.width / 2);\n        this.collider.p2.set(this.position.x + this.width / 2, this.position.y + this.height / 2, this.position.z + this.width / 2);\n    }\n    isSolidBlock(chunk, world) {\n        const chunkX = Math.floor(world.x / this.chunkSize.x);\n        const chunkY = Math.floor(world.y / this.chunkSize.y);\n        const chunkZ = Math.floor(world.z / this.chunkSize.z);\n        const localX = world.x - chunkX * this.chunkSize.x;\n        const localY = world.y - chunkY * this.chunkSize.y;\n        const localZ = world.z - chunkZ * this.chunkSize.z;\n        const idx = localX\n            + localY * this.chunkSize.x\n            + localZ * this.chunkSize.x * this.chunkSize.y;\n        const block = chunk.getData()[idx];\n        if (block === null || block === undefined) {\n            console.warn(\"Block not found. Case should not happen unless at chunk render distance borde.r\");\n            return false;\n        }\n        return !!block && block !== 0;\n    }\n    updateGravity(delta) {\n        this.velocity.add(GRAVITY_ACCEL.clone().multiplyScalar(delta));\n    }\n    checkCollisions(delta) {\n        const potential_collisions = [];\n        const adjusted_velocity = this.velocity.clone().multiplyScalar(delta);\n        const vx = adjusted_velocity.x;\n        const vy = adjusted_velocity.y;\n        const vz = adjusted_velocity.z;\n        for (const offset of this.offsets) {\n            const world = this.worldBlockPosition(this.position, offset);\n            const chunk = this.getChunkContaining(world);\n            if (!chunk) {\n                //console.warn(\"Failed to find chunk at: \", world);\n                continue;\n            }\n            ;\n            if (!this.isSolidBlock(chunk, world))\n                continue;\n            const collisionData = this.collider.collide(new _collider__WEBPACK_IMPORTED_MODULE_0__.Collider(world, world.clone().addScalar(1)), adjusted_velocity);\n            if (collisionData) {\n                potential_collisions.push({\n                    entry: collisionData.entry,\n                    norm: collisionData.normal\n                });\n            }\n        }\n        if (potential_collisions.length > 0) {\n            let smallestCollision = { entry: 0, norm: new three__WEBPACK_IMPORTED_MODULE_1__.Vector3() };\n            let smallestEntry = Number.POSITIVE_INFINITY;\n            for (const collision of potential_collisions) {\n                if (collision.entry < smallestEntry) {\n                    smallestEntry = collision.entry;\n                    smallestCollision = collision;\n                }\n            }\n            let { entry, norm } = smallestCollision;\n            entry -= 0.001;\n            if (norm.x !== 0) {\n                this.velocity.x = 0;\n                this.position.x += vx * entry;\n            }\n            if (norm.y !== 0) {\n                this.velocity.y = 0;\n                this.position.y += vy * entry;\n            }\n            if (norm.z !== 0) {\n                this.velocity.z = 0;\n                this.position.z += vz * entry;\n            }\n            if (norm.y === 1) {\n                this.isGrounded = true;\n            }\n        }\n        else {\n            //console.warn(\"{Debug} No collisions\");\n        }\n    }\n    update(delta) {\n        this.isGrounded = false;\n        this.updateGravity(delta);\n        this.updateCollider();\n        this.velocity.add(this.accel.multiplyScalar(delta).multiply(this.getFriction()));\n        this.accel.multiplyScalar(0);\n        for (let i = 0; i < 3; i++) {\n            this.checkCollisions(delta);\n        }\n        console.log(\"Adding: \", this.velocity);\n        this.position.add(this.velocity.clone().multiplyScalar(delta));\n        //this.velocity.multiplyScalar(0);\n        this.velocity.sub(this.velocity.clone().multiply(this.getFriction()).multiplyScalar(delta));\n    }\n    addChunk(pos, chunk) {\n        console.log(\"Entity: added chunk: \", pos);\n        this.chunks.set(hashVec3Int(pos), chunk);\n    }\n    removeChunk(pos) {\n        const hash = hashVec3Int(pos);\n        if (this.chunks.has(hash)) {\n            this.chunks.delete(hash);\n        }\n    }\n}\n\n\n//# sourceURL=webpack://threejs-marching-cubes/./src/ts/entity.ts?");

/***/ }),

/***/ "./src/ts/main.ts":
/*!************************!*\
  !*** ./src/ts/main.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Game: () => (/* binding */ Game)\n/* harmony export */ });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.core.js\");\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n/* harmony import */ var three_examples_jsm_loaders_EXRLoader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! three/examples/jsm/loaders/EXRLoader */ \"./node_modules/three/examples/jsm/loaders/EXRLoader.js\");\n/* harmony import */ var _assets_sky_exr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../assets/sky.exr */ \"./assets/sky.exr\");\n/* harmony import */ var _worldChunks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./worldChunks */ \"./src/ts/worldChunks.ts\");\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./player */ \"./src/ts/player.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n\n\n\n\n\nclass Game {\n    constructor() {\n        this.clock = new three__WEBPACK_IMPORTED_MODULE_3__.Clock();\n        const canvas = document.querySelector(\"#main\");\n        this.renderer = new three__WEBPACK_IMPORTED_MODULE_4__.WebGLRenderer({ canvas, antialias: true });\n        this.renderer.setSize(window.innerWidth, window.innerHeight);\n        canvas.addEventListener('click', () => {\n            canvas.requestPointerLock();\n        });\n        this.camera = new three__WEBPACK_IMPORTED_MODULE_3__.PerspectiveCamera(70);\n        this.scene = new three__WEBPACK_IMPORTED_MODULE_3__.Scene();\n        this.player = new _player__WEBPACK_IMPORTED_MODULE_2__.Player(this.camera, new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(0, 10, 0));\n        this.chunksManager = new _worldChunks__WEBPACK_IMPORTED_MODULE_1__.ChunkManager(this.player);\n        this.initialize();\n        this.loadControls();\n        this.loadDebugObjects();\n        this.loadLighting();\n        this.loadMarchingCubesChunks();\n        this.loadVoxelChunk();\n        //this.loadSky();\n    }\n    initialize() {\n        this.renderer.toneMapping = three__WEBPACK_IMPORTED_MODULE_3__.ACESFilmicToneMapping;\n        this.renderer.toneMappingExposure = 0.5; // reduce brightness, tweak this value\n        this.camera.aspect = innerWidth / innerHeight;\n        this.camera.position.set(0, 5, 10);\n        this.camera.updateProjectionMatrix();\n        window.addEventListener(\"resize\", () => {\n            this.camera.aspect = innerWidth / innerHeight;\n            this.camera.updateProjectionMatrix();\n            this.renderer.setSize(innerWidth, innerHeight);\n        });\n    }\n    loadControls() {\n        //this.controls = new OrbitControls(this.camera, this.renderer.domElement);\n    }\n    loadSky() {\n        new three_examples_jsm_loaders_EXRLoader__WEBPACK_IMPORTED_MODULE_5__.EXRLoader()\n            .load(_assets_sky_exr__WEBPACK_IMPORTED_MODULE_0__, (texture) => {\n            texture.mapping = three__WEBPACK_IMPORTED_MODULE_3__.EquirectangularReflectionMapping;\n            this.scene.background = texture;\n            this.scene.environment = texture;\n            //animate();\n        });\n    }\n    loadDebugObjects() {\n        const planeGeometry = new three__WEBPACK_IMPORTED_MODULE_3__.PlaneGeometry(20, 20);\n        const planeMesh = new three__WEBPACK_IMPORTED_MODULE_3__.Mesh(planeGeometry, new three__WEBPACK_IMPORTED_MODULE_3__.MeshPhysicalMaterial({ color: 0xaa0000 }));\n        planeMesh.rotateY(Math.PI / 2);\n        this.scene.add(planeMesh);\n        const axesHelper = new three__WEBPACK_IMPORTED_MODULE_3__.AxesHelper(100);\n        this.scene.add(axesHelper);\n        const gridHelper = new three__WEBPACK_IMPORTED_MODULE_3__.GridHelper(32 * 100, 100);\n        this.scene.add(gridHelper);\n    }\n    loadLighting() {\n        const light = new three__WEBPACK_IMPORTED_MODULE_3__.DirectionalLight(0xffffff, 1);\n        light.position.set(5, 10, 7);\n        this.scene.add(light);\n    }\n    loadVoxelChunk() {\n        /*const chunkData: BlockData[] = [];\n        const chunkBuilder = new ChunkBuilder(new THREE.Vector3(32, 32, 32))\n    \n        const noise = new FastNoiseLite(1234);\n        noise.SetNoiseType(FastNoiseLite.NoiseType.Perlin);             // choose Perlin\n        noise.SetFrequency(.05);\n    \n        for (let x = 0; x < 32; x++) {\n          for (let y = 0; y < 32; y++) {\n            for (let z = 0; z < 32; z++) {\n              const position = new THREE.Vector3(x, y, z);\n              const index = position.x + position.y * 32 + position.z * 32 * 32;\n    \n              chunkData[index] = {\n                blockType: Math.round((noise.GetNoise(x, y, z) + 1) / 2)\n              }\n            }\n          }\n        }\n    \n        console.log(chunkData);\n    \n        const chunk = new Chunk(chunkData, chunkBuilder);\n        const mesh = chunk.buildChunk();\n        this.scene.add(mesh);*/\n    }\n    loadMarchingCubesChunks() {\n        return __awaiter(this, void 0, void 0, function* () {\n            return;\n            /*const noise = new FastNoiseLite(1234);\n            noise.SetNoiseType(FastNoiseLite.NoiseType.Perlin);             // choose Perlin\n            noise.SetFrequency(.05);\n        \n            let i = 0;\n            for (let cx = -3; cx < 3; cx++) {\n              for (let cy = -3; cy < 3; cy++) {\n                for (let cz = -3; cz < 3; cz++) {\n                  const grid: number[][][] = [];\n                  for (let x = 0; x <= 32; x++) {\n                    grid[x] = [];\n                    for (let y = 0; y <= 32; y++) {\n                      grid[x][y] = [];\n                      for (let z = 0; z <= 32; z++) {\n                        grid[x][y][z] = (noise.GetNoise(x + cx * 32, y + cy * 32, z + cz * 32) + 1) / 2;\n                      }\n                    }\n                  }\n        \n                  const distanceFromCenter = Math.sqrt(\n                    cx * cx + cy * cy + cz * cz\n                  )\n        \n                  console.log(\"Progress: \", i, \"/\", 3 ** 3);\n                  const chunk = new Chunk(grid, new THREE.Vector3(cx, cy, cz));\n                  this.scene.add(chunk.buildMesh(1));\n                  i++;\n                }\n              }\n            }*/\n        });\n    }\n    render() {\n        const MAX_DT = 0.05;\n        this.player.updatePlayer(Math.min(MAX_DT, this.clock.getDelta()));\n        const pos = this.player.position;\n        const chunkPos = new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(Math.floor(pos.x / 32), Math.floor(pos.y / 32), Math.floor(pos.z / 32));\n        this.chunksManager.update(chunkPos, this.scene);\n        this.renderer.render(this.scene, this.camera);\n    }\n}\nconst game = new Game();\nfunction tick() {\n    game.render();\n    requestAnimationFrame(tick);\n}\ntick();\n\n\n//# sourceURL=webpack://threejs-marching-cubes/./src/ts/main.ts?");

/***/ }),

/***/ "./src/ts/player.ts":
/*!**************************!*\
  !*** ./src/ts/player.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Player: () => (/* binding */ Player)\n/* harmony export */ });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.core.js\");\n/* harmony import */ var _entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./entity */ \"./src/ts/entity.ts\");\n/* harmony import */ var three_src_math_MathUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/src/math/MathUtils */ \"./node_modules/three/src/math/MathUtils.js\");\n\n\n\nclass Player extends _entity__WEBPACK_IMPORTED_MODULE_0__.Entity {\n    constructor(camera, position) {\n        super(position);\n        this.mouseDeltaX = 0;\n        this.mouseDeltaY = 0;\n        this.phi = 0;\n        this.theta = 0;\n        this.keysPressed = new Set();\n        this.camera = camera;\n        this.mouseEvents();\n        this.keyboardEvents();\n    }\n    updateRotation() {\n        const xh = this.mouseDeltaX / innerWidth;\n        const yh = this.mouseDeltaY / innerHeight;\n        this.phi += -xh * 5;\n        this.theta = (0,three_src_math_MathUtils__WEBPACK_IMPORTED_MODULE_1__.clamp)(this.theta + -yh * 5, -Math.PI / 2, Math.PI / 2);\n        const qx = new three__WEBPACK_IMPORTED_MODULE_2__.Quaternion();\n        qx.setFromAxisAngle(new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(0, 1, 0), this.phi);\n        const qy = new three__WEBPACK_IMPORTED_MODULE_2__.Quaternion();\n        qy.setFromAxisAngle(new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(1, 0, 0), this.theta);\n        const q = new three__WEBPACK_IMPORTED_MODULE_2__.Quaternion();\n        q.multiply(qx);\n        q.multiply(qy);\n        this.rotation.copy(q);\n        this.mouseDeltaX = 0;\n        this.mouseDeltaY = 0;\n    }\n    updateTranslation(dt) {\n        const forwardVelocity = (this.keysPressed.has('w') ? 1 : 0) + (this.keysPressed.has('s') ? -1 : 0);\n        const strafeVelocity = (this.keysPressed.has('a') ? 1 : 0) + (this.keysPressed.has('d') ? -1 : 0);\n        const qx = new three__WEBPACK_IMPORTED_MODULE_2__.Quaternion();\n        qx.setFromAxisAngle(new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(0, 1, 0), this.phi);\n        const forward = new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(0, 0, -1);\n        forward.applyQuaternion(qx);\n        forward.multiplyScalar(forwardVelocity * 10);\n        const left = new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(-1, 0, 0);\n        left.applyQuaternion(qx);\n        left.multiplyScalar(strafeVelocity * 10);\n        this.accel.add(left);\n        this.accel.add(forward);\n    }\n    keyboardEvents() {\n        document.addEventListener(\"keydown\", (e) => {\n            this.keysPressed.add(e.key);\n            if (this.keysPressed.has(\" \")) {\n                this.jump();\n            }\n        });\n        document.addEventListener(\"keyup\", (e) => {\n            this.keysPressed.delete(e.key);\n        });\n    }\n    mouseEvents() {\n        document.addEventListener(\"mousemove\", (e) => {\n            this.mouseDeltaX = e.movementX;\n            this.mouseDeltaY = e.movementY;\n        });\n    }\n    updateCamera() {\n        this.camera.quaternion.copy(this.rotation);\n        this.camera.position.copy(this.position.clone().add(new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(0, this.height * 0.9, 0)));\n    }\n    updatePlayer(delta) {\n        this.updateRotation();\n        this.updateTranslation(delta);\n        this.update(delta);\n        this.updateCamera();\n    }\n}\n\n\n//# sourceURL=webpack://threejs-marching-cubes/./src/ts/player.ts?");

/***/ }),

/***/ "./src/ts/worldChunks.ts":
/*!*******************************!*\
  !*** ./src/ts/worldChunks.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ChunkManager: () => (/* binding */ ChunkManager)\n/* harmony export */ });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.core.js\");\n/* harmony import */ var _chunk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chunk */ \"./src/ts/chunk.ts\");\n/* harmony import */ var fastnoise_lite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fastnoise-lite */ \"./node_modules/fastnoise-lite/FastNoiseLite.js\");\n/* harmony import */ var _chunkBuilder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./chunkBuilder */ \"./src/ts/chunkBuilder.ts\");\n\n\n\n\nconst RENDER_DISTANCE = 6;\nconst CHUNK_SIZE = 32;\nfunction hashVec3Int(p) {\n    const C1 = 73856093;\n    const C2 = 19349663;\n    const C3 = 83492791;\n    const ix = Math.floor(p.x) + 10000;\n    const iy = Math.floor(p.y) + 10000;\n    const iz = Math.floor(p.z) + 10000;\n    return (ix * C1) ^ (iy * C2) ^ (iz * C3);\n}\nconst noise = new fastnoise_lite__WEBPACK_IMPORTED_MODULE_1__[\"default\"](1234);\nnoise.SetNoiseType(fastnoise_lite__WEBPACK_IMPORTED_MODULE_1__[\"default\"].NoiseType.Perlin); // choose Perlin\nnoise.SetFrequency(.05);\nclass ChunkManager {\n    constructor(player) {\n        this.chunks = {};\n        this.hashToPos = {};\n        this.pendingChunks = {};\n        this.loadedChunks = {};\n        this.chunkBuilder = new _chunkBuilder__WEBPACK_IMPORTED_MODULE_2__.ChunkBuilder(new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(CHUNK_SIZE, CHUNK_SIZE, CHUNK_SIZE));\n        this.loadOffsets = this.precomputeLoadList();\n        this.player = player;\n    }\n    precomputeLoadList() {\n        const loadList = [];\n        const playerPosition = new three__WEBPACK_IMPORTED_MODULE_3__.Vector3();\n        for (let x = -RENDER_DISTANCE; x <= RENDER_DISTANCE; x++) {\n            for (let y = -RENDER_DISTANCE; y <= RENDER_DISTANCE; y++) {\n                for (let z = -RENDER_DISTANCE; z <= RENDER_DISTANCE; z++) {\n                    const p = new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(x, y, z).add(playerPosition);\n                    loadList.push(p);\n                }\n            }\n        }\n        // Sort by distance\n        loadList.sort((a, b) => a.distanceToSquared(playerPosition) - b.distanceToSquared(playerPosition));\n        return loadList;\n    }\n    createLoadList(playerPosition, skipLoaded = true) {\n        const loadList = new Map();\n        for (const pos of this.loadOffsets) {\n            const p = pos.clone().add(playerPosition);\n            const hash = hashVec3Int(p);\n            if (this.loadedChunks[hash] && skipLoaded === true) {\n                continue;\n            }\n            if (this.pendingChunks[hash] && skipLoaded === true) {\n                continue;\n            }\n            loadList.set(hash, p);\n        }\n        return Array.from(loadList.entries());\n    }\n    generateChunk(chunkPosition) {\n        const FREQ = 0.2;\n        const ChunkData = new Uint8Array(CHUNK_SIZE * CHUNK_SIZE * CHUNK_SIZE);\n        let numNonAir = 0;\n        for (let x = 0; x < CHUNK_SIZE; x++) {\n            for (let y = 0; y < CHUNK_SIZE; y++) {\n                for (let z = 0; z < CHUNK_SIZE; z++) {\n                    const index = x + y * 32 + z * 32 * 32;\n                    const v = noise.GetNoise((x + chunkPosition.x * CHUNK_SIZE) * FREQ, 0, (z + chunkPosition.z * CHUNK_SIZE) * FREQ);\n                    const y_ = y + chunkPosition.y * CHUNK_SIZE;\n                    const h = Math.pow(v, 4) * 200;\n                    if (y_ < h) {\n                        ChunkData[index] = 1;\n                        numNonAir++;\n                    }\n                    else {\n                        ChunkData[index] = 0;\n                    }\n                }\n            }\n        }\n        if (numNonAir === 0) {\n            console.warn(\"Generated chunk filled with only air\");\n        }\n        return ChunkData;\n    }\n    hasAllNeighbors(chunkPosition) {\n        const sides = [\n            new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(1, 0, 0),\n            new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(-1, 0, 0),\n            new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(0, 1, 0),\n            new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(0, -1, 0),\n            new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(0, 0, 1),\n            new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(0, 0, -1),\n        ];\n        for (const side of sides) {\n            const pos = chunkPosition.clone().add(side);\n            const hash = hashVec3Int(pos);\n            if (!this.chunks[hash]) {\n                //console.log(\"Chunk: \", chunkPosition, \" missing neighbor(s) including \", pos);\n                return false;\n            }\n        }\n        return true;\n    }\n    getSides(chunkPosition) {\n        return {\n            negZ: this.chunks[hashVec3Int(chunkPosition.clone().add(new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(0, 0, -1)))],\n            negX: this.chunks[hashVec3Int(chunkPosition.clone().add(new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(-1, 0, 0)))],\n            negY: this.chunks[hashVec3Int(chunkPosition.clone().add(new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(0, -1, 0)))],\n            posZ: this.chunks[hashVec3Int(chunkPosition.clone().add(new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(0, 0, 1)))],\n            posX: this.chunks[hashVec3Int(chunkPosition.clone().add(new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(1, 0, 0)))],\n            posY: this.chunks[hashVec3Int(chunkPosition.clone().add(new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(0, 1, 0)))],\n        };\n    }\n    loadIfPossible(first, scene) {\n        const hasNeighbors = this.hasAllNeighbors(first[1]);\n        if (hasNeighbors == false) {\n            if (!this.pendingChunks[first[0]]) {\n                console.log(\"Pending: \", first[1]);\n                this.pendingChunks[first[0]] = true;\n            }\n        }\n        else {\n            const chunk = this.chunks[first[0]];\n            if (!chunk) {\n                console.warn(\"Could not find chunk for: \", first[1]);\n                return;\n            }\n            ;\n            const sides = this.getSides(first[1]);\n            chunk.buildChunk(sides.negZ, sides.posZ, sides.negX, sides.posX, sides.negY, sides.posY);\n            this.loadedChunks[first[0]] = true;\n            delete this.pendingChunks[first[0]];\n            //const boxHelper = new BoxHelper(chunk.getMesh() as Mesh, 0xff0000);\n            //scene.add(boxHelper);\n            scene.add(chunk.getMesh());\n            this.player.addChunk(first[1], chunk);\n            console.log(\"Loaded chunk:\", first[1]);\n        }\n    }\n    update(currentPosition, scene) {\n        //console.log(\"Update\");\n        const loadArray = this.createLoadList(currentPosition);\n        const first = loadArray[0];\n        if (!first) {\n            //console.warn(\"No chunks to load:\", loadArray);\n            return;\n        }\n        if (!this.chunks[first[0]]) {\n            const generated = this.generateChunk(first[1]);\n            const chunk = new _chunk__WEBPACK_IMPORTED_MODULE_0__.Chunk(generated, first[1], this.chunkBuilder);\n            this.chunks[hashVec3Int(first[1])] = chunk;\n            this.hashToPos[first[0]] = first[1];\n            console.log(\"Generated: \", first[1]);\n        }\n        // Check the neighbors\n        if (!this.loadedChunks[first[0]]) {\n            this.loadIfPossible(first, scene);\n        }\n        // Load pending\n        for (const pending of Object.keys(this.pendingChunks).map(k => Number(k))) {\n            const p = this.hashToPos[pending];\n            if (!p) {\n                console.warn(\"unable to find pos for hash: \", pending);\n                continue;\n            }\n            this.loadIfPossible([pending, p], scene);\n        }\n        // Unload any unecessary\n        const loadArray2 = this.createLoadList(currentPosition, false);\n        const loadMap = {};\n        for (const c of loadArray2) {\n            loadMap[c[0]] = true;\n        }\n        //console.log(set);\n        for (const chunk of Object.keys(this.loadedChunks).map(k => Number(k))) {\n            if (!loadMap[chunk]) {\n                const targetChunk = this.chunks[chunk];\n                if (targetChunk) {\n                    if (targetChunk.getMesh()) {\n                        const m = targetChunk.getMesh();\n                        scene.remove(targetChunk.getMesh());\n                        m.geometry.dispose();\n                        targetChunk.disposeMesh();\n                    }\n                }\n                delete this.loadedChunks[chunk];\n                this.player.removeChunk(this.hashToPos[chunk]);\n                console.log(\"Unloaded chunk: \", this.hashToPos[chunk]);\n            }\n        }\n    }\n}\n\n\n//# sourceURL=webpack://threejs-marching-cubes/./src/ts/worldChunks.ts?");

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
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
/******/ 			"main": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_fastnoise-lite_FastNoiseLite_js","vendors-node_modules_three_build_three_core_js","vendors-node_modules_three_build_three_module_js","vendors-node_modules_three_examples_jsm_libs_fflate_module_js","vendors-node_modules_three_examples_jsm_loaders_EXRLoader_js","vendors-node_modules_three_src_math_MathUtils_js"], () => (__webpack_require__("./src/ts/main.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;