
export type BlockTextureData = {
    Front: number;
    Back: number;
    Left: number;
    Right: number;
    Top: number;
    Bottom: number;
}

export type BlockType = {
    Transparent: boolean;
    Texture: BlockTextureData;
    Name: string;
    Id: string;
    Collideable: boolean;
}