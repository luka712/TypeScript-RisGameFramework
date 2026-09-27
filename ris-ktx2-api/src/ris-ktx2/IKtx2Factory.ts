import {KtxCreateStorage} from "./KtxCreateStorage.ts";
import type {IKtx2Texture} from "./IKtx2Texture.ts";
import type {IKtxTextureCreateInfo} from "./IKtxTextureCreateInfo.ts";

/** The Ktx2Factory class is responsible for loading and creating KTX2 textures. */
export interface IKtx2Factory {

    /** Initializes the factory. */
    initializeAsync(): Promise<void>;

    /**
     * Loads a KTX2 texture from the specified URL.
     * @param blob The URL of the KTX2 texture to load.
     * @returns A promise that resolves to the loaded KTX2 texture.
     */
    loadAsync(blob: string | File): Promise<IKtx2Texture>;

    /**
     * Creates a KTX2 texture.
     * @param createInfo - The creation info.
     * @param storage - The storage.
     * @returns The KTX2 texture.
     */
    create(createInfo: IKtxTextureCreateInfo, storage?: KtxCreateStorage): IKtx2Texture;

    /**
     * Creates a KTX2 texture from a buffer.
     * @param buffer The buffer.
     * @returns The KTX2 texture.
     */
    createFromBuffer(buffer: ArrayBufferView<ArrayBufferLike>): IKtx2Texture;
}