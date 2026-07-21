import type {IKtx2Texture} from "./ktx-texture-interface.ts";
import {Ktx2Texture} from "./ktx2-texture.ts";
import {createKtxReadModuleAsync} from "./index.ts";

/**
 * The Ktx2Loader class is responsible for loading KTX2 textures from a URL.
 */
export class Ktx2Loader {

    private static _ktxLib?: any;

    /**
     * Initializes the Ktx2Loader.
     */
    public async initializeAsync(){
        if(!Ktx2Loader._ktxLib){
            Ktx2Loader._ktxLib = await createKtxReadModuleAsync();
        }
    }

    /**
     * Loads a KTX2 texture from the specified URL.
     * @param blob The URL of the KTX2 texture to load.
     * @returns A promise that resolves to the loaded KTX2 texture.
     */
    public async loadAsync(blob: string|File): Promise<IKtx2Texture> {

        let buffer: ArrayBuffer;
        let filePath: string;

        if(blob instanceof File){
            filePath = blob.name;
            buffer = await blob.arrayBuffer();
        }
        else {
            filePath = blob;
            const response = await fetch(blob);
            buffer = await response.arrayBuffer();
        }

        const uint8Array = new Uint8Array(buffer);
        const ktxTexture = new Ktx2Loader._ktxLib.texture(uint8Array);
        return new Ktx2Texture(ktxTexture, filePath);
    }
}
