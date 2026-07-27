/**
 * The content manager.
 */
export interface IContentManager {

    /**
     * Loads a KTX2 container.
     * @param path - The path to the ktx2 asset.
     * @returns The .
     */
    loadKtx2Async(path: string): Promise<void>;

}
