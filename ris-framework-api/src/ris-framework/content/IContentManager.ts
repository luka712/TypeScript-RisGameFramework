import {IShaderModuleLoader} from "../shader/IShaderModuleLoader";
import {IShaderModule} from "../shader/IShaderModule";
import {ITexture2D} from "../rendering/texture/ITexture2D";
import {IKtx2Container} from "./IKtx2Container";

/**
 * The content manager.
 */
export interface IContentManager {

    /**
     * The shader module loader.
     */
    readonly shaderModuleLoader: IShaderModuleLoader;

    /**
     * Loads a KTX2 container.
     * @param path - The path to the ktx2 asset.
     * @returns The .
     */
    loadKtx2Async(path: string): Promise<IKtx2Container>;

    /**
     * Loads a shader module.
     * @param shaderAssetId - The id of a shader asset.
     * @returns The .
     */
    loadShaderModule(shaderAssetId: string): IShaderModule;

    /**
     * Loads a texture2D.
     * @param path - The file path to the texture.
     * @returns The .
     */
    loadTexture2D(path: string): ITexture2D;

    /**
     * Loads a texture2D.
     * @param path - The file path to the texture.
     * @returns The .
     */
    loadTexture2DAsync(path: string): Promise<ITexture2D>;

}
