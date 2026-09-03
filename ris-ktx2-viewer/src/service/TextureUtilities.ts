import type {IKtx2Texture} from "ris-ktx2-api";
import {Ktx2Loader} from "ris-ktx2";
import type {IImage} from "../model/IImage.ts";

const IMAGE_MIME_TYPES = new Set([
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
]);

let ktxLoader: Ktx2Loader | null = null;

export function isDecodableImage(file: File): boolean {
    return IMAGE_MIME_TYPES.has(file.type);
}

export function isKtx2File(file: File): boolean {
    return file.name.toLowerCase().endsWith(".ktx2");
}

export async function decodeImage(file: File): Promise<IImage> {
    const url = URL.createObjectURL(file);

    try {
        const image = new Image();

        await new Promise<void>((resolve, reject) => {
            image.onload = () => resolve();
            image.onerror = () => reject(new Error(`Failed to decode ${file.name}`));
            image.src = url;
        });

        const canvas = document.createElement("canvas");
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
            throw new Error("Could not create 2D canvas context");
        }

        ctx.drawImage(image, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

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

    return ktxLoader.loadAsync(file);
}
