import {type IKtxBasisParams} from "./IKtxBasisParams";
import {KtxTranscodeFlags} from "./KtxTranscodeFlags";
import {KtxTranscodeFormat} from "./KtxTranscodeFormat";
import {VkFormat} from "./VkFormat";
import type {TextureFormatInfo} from "./TextureFormatInfo.ts";

/**
 * The KtxTexture class represents a texture loaded from a KTX file.
 * It provides methods for loading, transcoding, and retrieving texture data.
 * The class manages the lifecycle of the native KTX texture object, ensuring that resources are properly released when the texture is no longer needed.
 * It also includes error handling to provide informative exceptions when operations fail, such as loading or transcoding errors.
 */
export interface IKtx2Texture {

    /**
     * The file path to the .ktx or .ktx2 texture if it was loaded from a file.
     */
    readonly filePath?: string;

    /**
     * Gets the width of the texture.
     */
    readonly width: number;

    /**
     * Gets the height of the texture.
     */
    readonly height: number;

    /**
     * Gets the data size.
     */
    readonly dataSize: number;

    /**
     * Checks if the texture needs transcoding.
     * This is typically true for textures that are compressed using BasisU/ETC1S or UASTC formats
     * and have not yet been transcoded to a GPU-compatible format.
     */
    readonly needsTranscoding: boolean;

    /**
     * Gets the number of mipmap levels.
     */
    readonly numLevels: number;

    /**
     * Gets the Vulkan format of the texture.
     */
    readonly vkFormat: VkFormat;

    /**
     * Gets the size of the image data for a specific mip level.
     * @param mipLevel - The mip level.
     * @returns The size of the image.
     */
    getImageSize(mipLevel: number): number;

    /**
     * Gets the row pitch (the number of bytes between the start of one row of pixel data and the start of the next row) for a specific mip level.
     * @param mipLevel - The mip level.
     * @returns The size of a row pitch.
     */
    getRowPitch(mipLevel: number): number;

    /**
     * Transcode the basis texture to the specified transcoding format.
     * @param transcodeFormat - The transcoding format.
     * @param transcodeFlags - The transcode flags.
     */
    transcodeBasis(transcodeFormat: KtxTranscodeFormat, transcodeFlags: KtxTranscodeFlags): void;

    /**
     * Gets the offset of the image data for a specific level, layer, and face/slice of the texture.
     * @param level - The mip level of the image.
     * @param layer - The array layer level of the image.
     * @param faceSlice - The cube map face or depth slice of the image.
     * @returns The offset.
     */
    getImageOffset(level: number, layer: number, faceSlice: number): number;

    /**
     * Compresses the texture using the specified basis parameters.
     * @param basisParams - The basis parameters.
     */
    compressBasis(basisParams: IKtxBasisParams): void;

    /**
     * Compresses a KTX2 texture using Basis Universal supercompression.
     *
     * The source images are encoded into Basis Universal format (typically ETC1S, depending on configuration)
     * and stored in a supercompressed form inside the KTX2 container.
     *
     * This process replaces the original uncompressed image data and updates the texture metadata (including DFD)
     * to reflect the new compressed state.
     *
     *
     * After compression, the texture cannot be directly uploaded to the GPU. It must first be transcoded
     * into a GPU-supported block-compressed format (such as ASTC, BC7, or ETC2) before use in rendering APIs.
     * Based on KTX-Software / libktx API:
     *      https://github.khronos.org/KTX-Software/libktx/group__writer.html#ga405c44d6daf8ddf83dc805810bf4f989
     * @param quality - Compression quality value in the range 1–255.
     If 0 is provided, a default value of 128 is used by the underlying implementation.
     Lower values produce faster compression and smaller files with lower quality.
     Higher values produce better quality but slower compression and larger output.
     */
    compressBasis(quality: number): void;

    /**
     * Encode and compress a ktx texture with uncompressed images to astc.
     * The images are either encoded to ASTC block-compressed format.
     * The encoded images replace the original images and the texture's fields including the DFD are modified to reflect the new state.
     * Such textures can be directly uploaded to a GPU via a graphics API.
     * @param quality - Compression quality, a value from 0 to 100.
     Higher=higher quality/slower speed.
     Lower=lower quality/faster speed.
     */
    compressAstc(quality: number): void;

    /**
     * Gets the texture data from the native KTX texture object.
     * @param level - The mipmap level.
     * @param layer - The array layer.
     * @param faceSlice - The face or slice index.
     * @returns The texture data as a byte array.
     */
    getImage(level?: number, layer?: number, faceSlice?: number): Uint8Array;

    /**
     * Get a texture format info instances based on KtxTranscodeFormat.
     * @param format The KtxTranscodeFormat
     * @returns The TextureFormatInfo
     */
    getTextureFormatInfo(format: KtxTranscodeFormat): TextureFormatInfo;
}
