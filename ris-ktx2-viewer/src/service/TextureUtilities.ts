import type {IKtx2Texture} from "../../../ris-ktx2/dist/ktx-texture-interface";
import {Ktx2Loader} from "../../../ris-ktx2/src";
import type {IImage} from "../model/IImage.ts";


let ktxLoader: Ktx2Loader | null = null;


export async function decodeImage(file: File): Promise<IImage> {
    const url = URL.createObjectURL(file);

    try {
        const image = new Image();

        await new Promise<void>((resolve, reject) => {
            image.onload = () => resolve();
            image.onerror = () =>
                reject(new Error(`Failed to decode ${file.name}`));

            image.src = url;
        });

        console.log(
            `Decoded ${file.name}: ${image.naturalWidth}x${image.naturalHeight}`
        );

        const canvas = document.createElement("canvas");

        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;

        const ctx = canvas.getContext("2d");

        if (!ctx) {
            throw new Error("Could not create 2D canvas context");
        }

        ctx.drawImage(image, 0, 0);

        const imageData = ctx.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
        );

        return {
            width: canvas.width,
            height: canvas.height,
            pixels: new Uint8Array(imageData.data),
        };
    } finally {
        URL.revokeObjectURL(url);
    }
}

export async function getKtx2Texture(file: File): Promise<IKtx2Texture> {

    if (!ktxLoader) {
        ktxLoader = new Ktx2Loader();
        await ktxLoader.initializeAsync();
    }

    return await ktxLoader.loadAsync(file);
}