import {
    type IFramework,
    type IImageLoader,
    TextureFormat,
    ImageData,
} from "ris-framework-api";

/**
 * The image loader.
 *
 * Loads images through the browser Fetch API and converts them
 * into raw pixel data suitable for the rendering backend.
 */
export class ImageLoader implements IImageLoader {

    /**
     * Temporary cache is released when the engine clears it.
     * It exists only for the duration of a loading/initialization operation.
     */
    private readonly _tempCache: Record<string, ImageData> = {};

    /**
     * Persistent cache is released only when the application
     * is closed or the cache is manually cleared.
     */
    private readonly _permanentCache: Record<string, ImageData> = {};

    public constructor(
        private readonly _framework: IFramework,
    ) {
    }

    /**
     * Loads a PNG/JPEG/etc. image using fetch.
     */
    private async _loadImage(
        path: string,
        preferredTextureFormat: TextureFormat,
    ): Promise<ImageData> {

        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => {
                debugger;
                resolve(new ImageData(image, image.width, image.height, 4));
            };
            image.onerror = (e) => {
                console.error("failed to load", image.src, e);
                reject();
            }
            image.src = path;
        });
    }

    /**
     * Loads an image synchronously.
     *
     * This is not supported in the browser because fetch() is asynchronous.
     */
    public load(
        path: string,
        cache: boolean = false,
    ): ImageData {
        throw new Error(
            "ImageLoader.Load() is not supported in the browser. " +
            "Use LoadAsync() instead.",
        );
    }

    /**
     * Loads an image asynchronously.
     */
    public async loadAsync(
        path: string,
        cache: boolean = false,
    ): Promise<ImageData> {

        const selectedCache = cache
            ? this._permanentCache
            : this._tempCache;

        const cached = selectedCache[path];

        if (cached !== undefined) {
            return cached;
        }

        const imageData = await this._loadImage(
            path,
            this._framework.renderer.preferredTextureFormat,
        );

        selectedCache[path] = imageData;

        return imageData;
    }



    /**
     * Called by the engine to dispose of the temporary cache.
     */
    public disposeOfTemporaryCache(): void {
        for (const imageData of Object.values(this._tempCache)) {
            imageData.dispose();
        }

        Object.keys(this._tempCache).forEach(
            key => delete this._tempCache[key],
        );
    }
}