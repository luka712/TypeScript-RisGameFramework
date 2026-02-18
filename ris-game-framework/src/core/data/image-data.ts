import type { IDisposable } from "../../common/disposable";
import { TextureFormat } from "../../common/texture-enums";

export interface IImageData extends IDisposable {

    /**
     * The image data.
     */
    get data(): ArrayBufferView<ArrayBufferLike>;

    /**
     * The format of the image.
     */
    get format(): TextureFormat;

    /**
     * The width of the image.
     */
    get width(): number;

    /**
     * The height of the image.
     */
    get height(): number;

    /**
     * The number of channels per pixel.
     */
    get channels(): number;

    /**
     * The length of the image data in bytes.
     */
    get lengthInBytes(): number;
}

/**
 * The implementation of the IImageData interface. This class is used to store image data for textures.
 */
export class GenericImageData implements IImageData {

    constructor(
        private _data: ArrayBufferView,
        private readonly _width: number,
        private readonly _height: number,
        private readonly _channels: number) {
    }

    /** @inheritdoc */
    get data(): ArrayBufferView<ArrayBufferLike> {
        return this._data;
    }

    /** @inheritdoc */
    get format(): TextureFormat {
        return TextureFormat.BGRA_8_Unorm;
    }

    /** @inheritdoc */
    get width(): number {
        return this._width;
    }

    /** @inheritdoc */
    get height(): number {
       return this._height;
    }

    /** @inheritdoc */
    get channels(): number {
        return this._channels;
    }

    /** @inheritdoc */
    get lengthInBytes(): number {
        return this._data.byteLength;
    }

    /** @inheritdoc */
    public dispose(): void {
        // Can be empty. Data is disposed anyway when the texture is disposed.
    }

}