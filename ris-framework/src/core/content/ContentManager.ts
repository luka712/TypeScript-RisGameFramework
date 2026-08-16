import {
    type IShaderModule,
    type IContentManager,
    type IShaderModuleLoader,
    type ITexture2D,
    type IKtx2Container,
    type IImageLoader, type IFramework, type TextureDescriptor, TextureFormat
} from "ris-framework-api";
import {ImageLoader} from "../loaders/ImageLoader.ts";
import {TextureUsage} from "../../../../ris-framework-api";
import type {ContentConfig} from "../../../../ris-framework-api/dist/ris-framework/content/ContentConfig";

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

    /** @inheritDoc */
    public async loadTexture2DAsync(path: string,
                                    textureDescriptor?: TextureDescriptor,
                                    contentConfig?: ContentConfig,
                                    ): Promise<ITexture2D> {

        let format =  this._framework.renderer.preferredTextureFormat;

        if(textureDescriptor && textureDescriptor.format != TextureFormat.UNDEFINED) {
            format = textureDescriptor.format;
        }

        // TODO: pass texture descriptor
        const data = await this._imageLoader.loadAsync(path, contentConfig?.keepImageDataCached);
        return this._framework.textureFactory.create(
            data.width, data.height,
            data.getData(0) as Uint8Array,
            data.channels,
            undefined,
            TextureUsage.TEXTURE_BINDING | TextureUsage.COPY_SRC,
            format,
            textureDescriptor?.generateMipmaps
            );
    }

    /** @inheritDoc */
    public loadTexture2DFromPixels(width: number, height: number, pixels: ArrayBuffer): ITexture2D {
        const view = new Uint8Array(pixels);
        return this._framework.textureFactory.create(width, height, view);
    }

}