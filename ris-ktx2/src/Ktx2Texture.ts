import {
    type IKtx2Texture,
    type IKtxBasisParams,
    KtxErrorCode,
    KtxTranscodeFlags,
    KtxTranscodeFormat,
    TextureFormatInfo,
    VkFormat
} from "ris-ktx2-api";
import {Mapper} from "./Mapper.ts";

/**
 * The KTX2 texture class.
 */
export class Ktx2Texture implements IKtx2Texture {

    // @ts-ignore
    private readonly _ktxLib: any;

    // @ts-ignore
    private readonly _ktxTexture: any;

    /**
     * The constructor.
     * @param ktxLib - The KTX library.
     * @param ktxTexture - The underlying KTX texture.
     * @param filePath - The file path of the texture.
     */
    constructor(ktxLib: any, ktxTexture: any, filePath?: string) {

        this._ktxLib = ktxLib;
        this._ktxTexture = ktxTexture;
        this.filePath = filePath;
        this.width = ktxTexture.baseWidth;
        this.height = ktxTexture.baseHeight;
        this.dataSize = ktxTexture.dataSize;
        this.vkFormat = ktxTexture.vkFormat;

        debugger;
        // Ktx texture does not expose levels info, so we query until null.
        let level = 0;
        while (true) {
            const data = this.getImage(level);
            if (!data) {
                break;
            }
            level++;
        }
        this.numLevels = level;
    }

    /** @inheritDoc */
    public readonly vkFormat: VkFormat;

    /** @inheritdoc */
    public readonly filePath?: string;

    /** @inheritdoc */
    public readonly width;

    /** @inheritdoc */
    public readonly height;

    /** @inheritdoc */
    public readonly dataSize;

    /** @inheritdoc */
    public get needsTranscoding() : boolean {
        return this._ktxTexture.needsTranscoding;
    }

    /** @inheritdoc */
    public readonly numLevels;


    compressAstc(quality: number): void {
        console.log(quality);
    }

    /** @inheritDoc */
    public getImage(level = 0, layer = 0, faceSlice = 0): Uint8Array {
        return this._ktxTexture.getImage(level, layer, faceSlice);
    }

    /** @inheritDoc */
    public compressBasis(basisParams: IKtxBasisParams | number): void {
        const ktxBasisParams = new this._ktxLib.basisParams();

        if(typeof basisParams === "number") {
            ktxBasisParams.quality = basisParams;
        } else {
            ktxBasisParams.uastc = basisParams.uastc == true;
            ktxBasisParams.compressionLevel = basisParams.compressionLevel ?? 2;
            ktxBasisParams.uastcRDO = basisParams.uastcRDO ?? false;
            ktxBasisParams.uastcRDOQuality = basisParams.uastcRDOQualityScalar ?? 1;
        }

        const errorCode = this._ktxTexture.compressBasis(ktxBasisParams);
        const ktxErrorCode = Mapper.mapErrorCodeFromKtxLib(errorCode);

        if (ktxErrorCode !== KtxErrorCode.SUCCESS) {
            throw new Error(`Failed to compress basis: ${ktxErrorCode}`);
        }
    }

    getImageOffset(level: number, layer: number, faceSlice: number): number {
        console.log(level, layer, faceSlice);
        return 0;
    }

    getImageSize(mipLevel: number): number {
        console.log(mipLevel);
        return 0;
    }

    getRowPitch(mipLevel: number): number {
        console.log(mipLevel);
        return 0;
    }

    /** @inheritDoc */
    public transcodeBasis(transcodeFormat: KtxTranscodeFormat, transcodeFlags: KtxTranscodeFlags): void {

        const transcodeTarget = this._ktxLib.TranscodeTarget;
        let ktxTranscodeFormat = null;

        const transcodeFlagsTarget = this._ktxLib.TranscodeFlags;
        let ktxTranscodeFlag = null;

        // Must have at least 1 format.
        if(transcodeFormat == KtxTranscodeFormat.BC7_RGBA) {
            ktxTranscodeFormat = transcodeTarget.BC7_RGBA;
        }
        else if(transcodeFormat == KtxTranscodeFormat.ASTC_4X4_RGBA) {
            ktxTranscodeFormat = transcodeTarget.ASTC_4x4_RGBA;
        }
        else if(transcodeFormat == KtxTranscodeFormat.BC3_RGBA){
            ktxTranscodeFormat = transcodeTarget.BC3_RGBA;
        }
        else if(transcodeFormat == KtxTranscodeFormat.ETC2_RGBA) {
            ktxTranscodeFormat = transcodeTarget.ETC2_RGBA;
        }
        else if(transcodeFormat == KtxTranscodeFormat.RGBA32) {
            ktxTranscodeFormat = transcodeTarget.RGBA32;
        }
        else {
            throw new Error("Unsupported transcodeFormat");
        }

        if(transcodeFlags == KtxTranscodeFlags.TRANSCODE_ALPHA_DATA_TO_OPAQUE_FORMATS) {
            ktxTranscodeFlag = transcodeFlagsTarget.TRANSCODE_ALPHA_DATA_TO_OPAQUE_FORMATS;
        }

        this._ktxTexture.transcodeBasis(ktxTranscodeFormat, ktxTranscodeFlag);
    }

    /** @inheritDoc */
    public getTextureFormatInfo(format: KtxTranscodeFormat | VkFormat): TextureFormatInfo {
        if(format == KtxTranscodeFormat.ASTC_4X4_RGBA || format == VkFormat.ASTC_4X4_UNORM_BLOCK) {
            return TextureFormatInfo.astc4x4rgba();
        }
        else if(format == KtxTranscodeFormat.BC7_RGBA || format == VkFormat.BC7_UNORM_BLOCK) {
            return TextureFormatInfo.bc7();
        }
        else if(format == KtxTranscodeFormat.BC3_RGBA || format == VkFormat.BC3_UNORM_BLOCK) {
            return TextureFormatInfo.bc3();
        }
        else if(format == KtxTranscodeFormat.ETC2_RGBA || format == VkFormat.ETC2_R8G8B8A8_UNORM_BLOCK) {
            return TextureFormatInfo.etc2rgba();
        }
        else if(format == KtxTranscodeFormat.RGBA32 || format == VkFormat.R8G8B8A8_UNORM || format == VkFormat.R8G8B8A8_SRGB) {
            return TextureFormatInfo.rgba32();
        }
        else {
            throw new Error("Unrecognized texture format for " + format);
        }
    }

    /** @inheritDoc */
    public createCopy(): IKtx2Texture {
        const copy = this._ktxTexture.createCopy();
        return  new Ktx2Texture(this._ktxLib, copy, this.filePath);
    }

    /** @inheritDoc */
    public setImageFromMemory(level: number, layer: number, faceSlice: number, imageData: ArrayBufferView): void {
        const errorCode = this._ktxTexture.setImageFromMemory(level, layer, faceSlice, imageData);
        const ktxErrorCode = Mapper.mapErrorCodeFromKtxLib(errorCode);

        if (ktxErrorCode == KtxErrorCode.INVALID_OPERATION) {
           throw new Error(`Failed to set image from memory: KTX INVALID OPERATION`);
        }
    }

    /** @inheritDoc */
    public writeToMemory(): ArrayBufferView {
        return this._ktxTexture.writeToMemory();
    }

    /** @inheritDoc */
    public deflateZlib(compressionLevel: number): void {
        const errorCode = this._ktxTexture.deflateZLIB(compressionLevel);
        const ktxErrorCode = Mapper.mapErrorCodeFromKtxLib(errorCode);

        if (ktxErrorCode != KtxErrorCode.SUCCESS) {
            throw new Error(`Failed to deflate Zstd: ${ktxErrorCode}`);
        }
    }

    /** @inheritDoc */
    public deflateZstd(compressionLevel: number): void {
         const errorCode = this._ktxTexture.deflateZstd(compressionLevel);
         const ktxErrorCode = Mapper.mapErrorCodeFromKtxLib(errorCode);

         if (ktxErrorCode != KtxErrorCode.SUCCESS) {
             throw new Error(`Failed to deflate Zstd: ${ktxErrorCode}`);
         }
    }
}