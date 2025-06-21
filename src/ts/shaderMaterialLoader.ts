import ChunkVertexShader from '../shaders/chunkVertex.glsl';
import ChunkFragmentShader from '../shaders/chunkFragment.glsl'
import { CanvasTexture, NearestFilter, ShaderMaterial, Texture, TextureLoader } from 'three';
import debugTexturePath from '../../assets/blue.png'
import debugTexturePath2 from '../../assets/red.png'
import grassSideTexturePath from '../../assets/grass_side.png'
import grassTopTexturePath from '../../assets/grass_top.png'
import grassBottomTexturePath from '../../assets/grass_bottom.png'


async function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}

const textures = [
    grassSideTexturePath,
    grassTopTexturePath,
    grassBottomTexturePath,
    debugTexturePath,
    debugTexturePath2
];

async function buildAtlas(textures: string[]) {
    const images: HTMLImageElement[] = [];

    let max_x = 0;
    let sum_y = 0;


    for (const path of textures) {
        const img = await loadImage(path);
        images.push(img);

        if (img.width > max_x) {
            max_x = img.width;
        }
        sum_y += img.height;
    }

    const canvas = document.createElement('canvas');
    canvas.width = max_x;
    canvas.height = sum_y;
    const ctx = canvas.getContext('2d')!;

    const atlasData: { beginX: number, beginY: number, endX: number, endY: number }[] = []
    let y = 0;
    let index = 0;
    for (const img of images) {
        ctx.drawImage(img, 0, y);

        atlasData[index] = {
            beginX: 0,
            beginY: y,
            endX: img.width,
            endY: y + img.height
        }

        y += img.height;

        index++;
    }

    const atlas = new CanvasTexture(canvas);
    atlas.needsUpdate = true;
    atlas.minFilter = NearestFilter;
    atlas.magFilter = NearestFilter;
    atlas.generateMipmaps = false;
    atlas.flipY = false;
    atlas.needsUpdate = true;
    return {
        atlas: atlas,
        atlasData: atlasData,
        imageX: max_x,
        imageY: sum_y
    };
}









export async function createShaderMaterial() {

    const atlasResult = await buildAtlas(textures);

    const material = new ShaderMaterial(
        {
            vertexShader: ChunkVertexShader,
            fragmentShader: ChunkFragmentShader,
            uniforms: {
                chunkTexture: { value: atlasResult.atlas }
            }
        }
    );

    const atlasResultFinal = {
        width: atlasResult.imageX,
        height: atlasResult.imageY,
        atlasData: atlasResult.atlasData
    };

    console.warn("Atlas data: ", atlasResult.atlasData);

    return {
        atlas: atlasResultFinal,
        mat: material
    }
}