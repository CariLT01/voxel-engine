import { BlockType } from "./BlockDataTypes";


function computeTransparentBlockSet(bt: BlockType[]) {
    const transparentBlockSet = new Set<number>();

    let index = 0;
    for (const block of bt) {
        if (block.Transparent == true) {
            transparentBlockSet.add(index);
        }

        index++;
    }

    return transparentBlockSet;
}

function computeCollideableBlockSet(bt: BlockType[]) {
    const collideableBlockSet = new Set<number>();

    let index = 0;
    for (const block of bt) {
        if (block.Collideable == true) {
            collideableBlockSet.add(index);
        }
    }

    return collideableBlockSet;
}

function computeBlockIDsMap(bt: BlockType[]) {
    const blockIdToIndexMap = new Map<string, number>();

    let index = 0;
    for (const block of bt) {
        blockIdToIndexMap.set(block.Id, index);
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
    },
    {
        Texture: {
            Front: 2,
            Back: 2,
            Left: 2,
            Right: 2,
            Top: 2,
            Bottom: 2
        },
        Transparent: false,
        Name: "Stone",
        Id: "stone",
        Collideable: true
    }
)

export default BlockTypes;
export const TransparentBlockTypes = computeTransparentBlockSet(BlockTypes);
export const CollideableBlockTypes = computeCollideableBlockSet(BlockTypes);
export const BlockToIndexMap = computeBlockIDsMap(BlockTypes);