import type {
    IShaderModule,
    IContentManager,
    IShaderModuleLoader,
    ITexture2D,
    IKtx2Container,
    IImageLoader, IFramework
} from "ris-framework-api";
import {ImageLoader} from "../loaders/ImageLoader.ts";

/**
 * The content manager.
 * The content manager is responsible for managing the content modules and loading the content with the given asset file path or identifier.
 */
export class ContentManager implements IContentManager {

    private readonly _imageLoader: IImageLoader;
    /**
     * The constructor.
     * @param shaderModuleLoader The shader module loader.
     */
    public constructor(private readonly _framework: IFramework, public readonly shaderModuleLoader: IShaderModuleLoader) {

        this._imageLoader = new ImageLoader(_framework);
    }

    /** @inheritDoc */
    public loadKtx2Async(path: string): Promise<IKtx2Container> {
        throw new Error("Method not implemented.");
    }

    /** @inheritDoc */
    public loadShaderModule(shaderModuleId: string): IShaderModule {
        return this.shaderModuleLoader.load(shaderModuleId);
    }

    /**
     * Loads a texture2D.
     * @param path - The file path to the texture.
     * @returns The .
     */
    public loadTexture2D(path: string): ITexture2D {

    }
    /**
     * Loads a texture2D.
     * @param path - The file path to the texture.
     * @returns The .
     */
    public async loadTexture2DAsync(path: string): Promise<ITexture2D> {

        const data = await this._imageLoader.loadAsync(path);
        return this._framework.textureFactory.create(
            data.width, data.height,
            data.getData(0) as Uint8Array,
            data.channels);
    }

}