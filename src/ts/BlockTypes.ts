import { BlockType } from "./BlockDataTypes";

export type BlockTypeIndex = number & { readonly __brand: unique symbol };


function computeTransparentBlockSet(bt: BlockType[]) {
    const transparentBlockSet = new Set<BlockTypeIndex>();

    let index = 0;
    for (const block of bt) {
        if (block.Transparent == true) {
            transparentBlockSet.add(index as BlockTypeIndex);
        }

        index++;
    }

    return transparentBlockSet;
}

function computeCollideableBlockSet(bt: BlockType[]) {
    const collideableBlockSet = new Set<BlockTypeIndex>();

    let index = 0;
    for (const block of bt) {
        if (block.Collideable == true) {
            collideableBlockSet.add(index as BlockTypeIndex);
        }
        index++;
    }

    console.log(collideableBlockSet);

    return collideableBlockSet;
}

function computeBlockIDsMap(bt: BlockType[]) {
    console.log(bt)
    const blockIdToIndexMap = new Map<string, BlockTypeIndex>();

    let index = 0;
    for (const block of bt) {
        blockIdToIndexMap.set(block.Id, index as BlockTypeIndex);
        index++;
    }

    return blockIdToIndexMap;
}

const BlockTypes: BlockType[] = [];


BlockTypes.push(
    {
        Texture: {
            Front: -1,
            Back: -1,
            Left: -1,
            Right: -1,
            Top: -1,
            Bottom: -1
        },
        Transparent: true,
        Name: "Air",
        Id: "air",
        Collideable: false
    },
    {
        Texture: {
        Front: 0,
        Back: 0,
        Left: 0,
        Right: 0,
        Top: 1,
        Bottom: 2
        },
        Transparent: false,
        Name: "Grass Block",
        Id: "grass_block",
        Collideable: true
    }
)

export default BlockTypes;
export const TransparentBlockTypes = computeTransparentBlockSet(BlockTypes);
export const CollideableBlockTypes = computeCollideableBlockSet(BlockTypes);
export const BlockToIndexMap = computeBlockIDsMap(BlockTypes);

export function getBlockTypeIndexThrows(name: string) {
    
    const index = BlockToIndexMap.get(name);
    if (index == undefined) {
        throw new Error(`Block type ${name} not found`);
    }

    return index;
}