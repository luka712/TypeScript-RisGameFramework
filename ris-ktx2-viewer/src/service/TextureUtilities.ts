import {type IKtx2Texture, type IKtxTextureCreateInfo, KtxCreateStorage} from "ris-ktx2-api";
import {Ktx2Factory} from "ris-ktx2";
import {type IFramework, RawImageData} from "ris-framework-api";

const IMAGE_MIME_TYPES = new Set([
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
]);

let ktxLoader: Ktx2Factory | null = null;

export function isDecodableImage(file: File): boolean {
    return IMAGE_MIME_TYPES.has(file.type);
}

export function isKtx2File(file: File): boolean {
    return file.name.toLowerCase().endsWith(".ktx2");
}

export async function decodeImageAsync(fw: IFramework, file: File): Promise<RawImageData> {
    const url = URL.createObjectURL(file);

    try {
        return await fw.imageLoader.loadAsync(url, false);
    } finally {
        URL.revokeObjectURL(url);
    }
}

export async function getKtx2Texture(file: File): Promise<IKtx2Texture> {
    if (!ktxLoader) {
        ktxLoader = new Ktx2Factory();
        await ktxLoader.initializeAsync();
    }

    return ktxLoader.loadAsync(file);
}

export async function createKtx2TextureAsync(desc: IKtxTextureCreateInfo, storage = KtxCreateStorage.ALLOC_STORAGE): Promise<IKtx2Texture> {

    if (!ktxLoader) {
        ktxLoader = new Ktx2Factory();
        await ktxLoader.initializeAsync();
    }

    return ktxLoader.create(desc, storage);
}

export async function createKtx2TextureFromBufferAsync(buffer: ArrayBufferView<ArrayBufferLike>): Promise<IKtx2Texture> {

    if (!ktxLoader) {
        ktxLoader = new Ktx2Factory();
        await ktxLoader.initializeAsync();
    }

    return ktxLoader.createFromBuffer(buffer);
}

export function downloadKtx2(
    data: ArrayBufferView<ArrayBufferLike>,
    filename = "texture.ktx2"
) {
    const blob = new Blob([data as BlobPart], {
        type: "image/ktx2"
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();

    URL.revokeObjectURL(url);
}