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

    /**
     * Checks if the given texture format is a compressed texture format.
     * @param format - The texture format to check.
     * @returns true if texture format is a compressed texture format.
     */
    public static isCompressedTextureFormat(format: TextureFormat): boolean {
        return this._compressedTextureFormats.indexOf(format) !== -1;
    }

}
