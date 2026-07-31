import {IShaderModule} from "../shader/IShaderModule";
import {IShaderModuleLoader} from "../shader/IShaderModuleLoader";

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
    loadKtx2Async(path: string): Promise<void>;

    /**
     * Loads the shader module.
     * @param shaderAssetId The shader module.
     */
    loadShaderModule(shaderAssetId: string): IShaderModule;
}
