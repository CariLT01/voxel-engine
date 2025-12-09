import { CHUNK_SIZE } from "./Config";

type PaletteEntry = {
    blockType: number;
}

function indexRemap<T>(original: T[], filtered: T[]): Map<number, number> {
  const newIndex = new Map<T, number>();
  filtered.forEach((item, i) => newIndex.set(item, i));

  const remap = new Map<number, number>();
  original.forEach((item, oldIndex) => {
    const ni = newIndex.get(item);
    if (ni !== undefined) {
      remap.set(oldIndex, ni);
    }
  });

  return remap;
}

function hashPaletteEntry(entry: PaletteEntry) {
    return entry.blockType;
}

export class ChunkData {

    private blockArray: Uint8Array = new Uint8Array(CHUNK_SIZE * CHUNK_SIZE * CHUNK_SIZE);
    private palette: PaletteEntry[] = [];
    private paletteHashesContainCheck: Set<number> = new Set(); // faster does chunk contain palette check
    private paletteHashes: Map<number, number> = new Map(); // slightly slower, for index remap


    /* Queued palette entries when setBlock was used */
    private queuedMaterials: PaletteEntry[] = [];

    constructor() {

    }

    setBlockArray(blockArray: Uint8Array) {
        this.blockArray = blockArray;
    }

    setPalette(palette: PaletteEntry[]) {
        this.palette = palette;
    }

    private _computePaletteHashes() {

        this.paletteHashesContainCheck.clear();
        this.paletteHashes.clear();

        for (let index = 0; index < this.palette.length; index++) {
            const entry = this.palette[index];
            const hash = hashPaletteEntry(entry);
            this.paletteHashes.set(hash, index);
            this.paletteHashesContainCheck.add(hash);
        }
    }
    
    private _indexFromBlockPosition(x: number, y: number, z: number)  {
        const idx = x + y * CHUNK_SIZE + z * CHUNK_SIZE * CHUNK_SIZE;

        return idx;
    }

    flushChanges() {
        console.log("Chunk data flush changes");

        // Add queued materials
        for (const material of this.queuedMaterials) {
            this.palette.push(material);
        }

        this.queuedMaterials = [];

        // Save palette
        const paletteBefore = this.palette.copyWithin(0, 0, this.palette.length);


        // --- Step 1: Detect deleted block types (or unecessary and lingering block types)

        // 1.1 Record all of the block types in the chunk

        const foundPaletteEntries: Set<number> = new Set();

        for (let index = 0; index < this.blockArray.length; index++) {

            const blockTypeIndex = this.blockArray[index];
            
            foundPaletteEntries.add(blockTypeIndex);
        }

        // 1.2 Detect all of the unseen block types

        const lingeringPaletteIndices: Set<number> = new Set();

        for (let index = 0; index < this.palette.length; index++) {
            if (foundPaletteEntries.has(index) == false) {
                lingeringPaletteIndices.add(index);
            }
        }

        // --- Step 2: Remove the block types from the palette

        const indicesToRemove = Array.from(lingeringPaletteIndices)
            .sort((a, b) => b - a); // descending order, prevent corruption

        for (const index of indicesToRemove) {
            this.palette.splice(index, 1);
        }

        // --- Step 3: Detect change and remap indices

        const newPalette = this.palette;
        const blockTypeMap = indexRemap(paletteBefore, newPalette);

        // --- Step 4: Change chunk data buffer to match new mapped indices

        for (let index = 0; index < this.blockArray.length; index++) {
            const blockType = this.blockArray[index];
            const mappedBlockType = blockTypeMap.get(blockType);

            if (mappedBlockType != blockType) {
                this.blockArray[index] = mappedBlockType as number;
            }
        }

        this._computePaletteHashes();
    }

    setBlockAt(x: number, y: number, z: number, blockType: PaletteEntry) {

        const hashedPalette = hashPaletteEntry(blockType);

        let paletteIndex = -1;
        const blockIndex = this._indexFromBlockPosition(x, y, z);

        if (this.paletteHashesContainCheck.has(hashedPalette) == false) {
            this.queuedMaterials.push(blockType);

            paletteIndex = this.palette.length;
        } else {

            const index = this.paletteHashes.get(hashedPalette);;

            if (index == undefined) {
                throw new Error("Cannot find palette hash index remap");
            }

            paletteIndex = index;

            
        }

        if (paletteIndex == -1) {
            throw new Error("Failed to find palette index");
        }

        this.blockArray[blockIndex] = paletteIndex;

    }

    getBlockAt(x: number, y: number, z: number) {
        const blockIndex = this._indexFromBlockPosition(x, y, z);

        return this.blockArray[blockIndex];
    }

    getPaletteEntryFromPaletteIndex(index: number) {
        return this.palette[index];
    }

    getBlockArray() {
        return this.blockArray;
    }
    
}