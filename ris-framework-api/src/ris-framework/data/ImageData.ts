/**
 * The image data.
 */
export class ImageData {

    private _data?: Array<number[] | HTMLImageElement | Uint8Array>;

    /**
     * The constructor.
     * @param data The data.
     * @param width The image width.
     * @param height The image height.
     * @param channels The number of channels in image.
     */
    public constructor(data: number[] | HTMLImageElement | Uint8Array,
                       public readonly width: number,
                       public readonly height: number,
                       public readonly channels: number) {

        this._data = [data];
    }

    /**
     * Gets the image data for a specific mip level.
     * @param mipLevel - The mip level.
     * @returns The data.
     */
    public getData(mipLevel: number): number[] | HTMLImageElement | Uint8Array {
        return this._data![mipLevel];
    }

    /** @inheritDoc */
    public dispose(): void {
        this._data = undefined;
    }
}
