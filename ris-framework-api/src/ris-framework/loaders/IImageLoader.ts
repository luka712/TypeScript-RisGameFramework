import {ImageData} from "../data/ImageData";

/**
 * The image loader interface.
 */
export interface IImageLoader {

    /**
     * Loads an image from a file.
     * @param path - The file path.
     * @param cache - Whether to cache the image in a persistent cache.
     * @returns The .
     */
    load(path: string, cache?: boolean): ImageData;

    /**
     * Loads an image from a file.
     * @param path - The file path.
     * @param cache - Whether to cache the image in a persistent cache.
     * @returns The .
     */
    loadAsync(path: string, cache?: boolean): Promise<ImageData>;

    /**
     * Disposes of the temporary cache.
     *
     * Used internally, call only if you know what you are doing.
     */
    disposeOfTemporaryCache(): void;
}
