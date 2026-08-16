import {TextureFormat} from "./TextureFormat";

/**
 * The texture utilities.
 */
export class TextureUtilities {

    private static readonly _compressedTextureFormats = [
        TextureFormat.ATSC_4X4_RGBA,
        TextureFormat.BC3_RGBA_UNORM,
        TextureFormat.BC7_RGBA_UNORM,
        TextureFormat.ETC2_RGBA8_UNORM
    ];

    private static readonly _textureFormatBytesPerPixel: { [key: number]: number } = {
        [TextureFormat.RGBA_8_UNORM]: 4,
        [TextureFormat.DEPTH_32_FLOAT]: 4,
        [TextureFormat.DEPTH_24_STENCIL_8]: 4,
    };

    /**
     * Checks if the given texture format is a compressed texture format.
     * @param format - The texture format to check.
     * @returns true if texture format is a compressed texture format.
     */
    public static isCompressedTextureFormat(format: TextureFormat): boolean {
        return this._compressedTextureFormats.indexOf(format) !== -1;
    }

    /**
     * Gets the number of mip levels for the given width and height.
     *
     * @param width The width.
     * @param height The height.
     * @returns The number of mip levels.
     */
    public static mipLevels(width: number, height: number): number {
        return Math.floor(Math.log2(Math.max(width, height))) + 1;
    }

    /**
     * Gets the number of bytes per pixel for a given texture format.
     *
     * @param textureFormat The texture format.
     * @returns The number of bytes per pixel.
     */
    public static bytesPerPixel(textureFormat: TextureFormat): number {
        const value = this._textureFormatBytesPerPixel[textureFormat];

        if (value === undefined) {
            throw new Error(
                `Bytes per pixel is not defined for texture format: ${textureFormat}`
            );
        }

        return value;
    }

}
