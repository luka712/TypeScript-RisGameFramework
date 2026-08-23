import {
    type IKtx2Texture,
    type IKtxBasisParams,
    KtxTranscodeFlags,
    KtxTranscodeFormat,
    TextureFormatInfo,
    type VkFormat
} from "ris-ktx2-api";

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
        this.needsTranscoding = ktxTexture.needsTranscoding;
        this.numLevels = ktxTexture.numLevels ?? 1;
        this.vkFormat = ktxTexture.vkFormat;
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
    readonly needsTranscoding;

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
        console.log(basisParams);
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
        else {
            throw new Error("Unsupported transcodeFormat");
        }

        if(transcodeFlags == KtxTranscodeFlags.TRANSCODE_ALPHA_DATA_TO_OPAQUE_FORMATS) {
            ktxTranscodeFlag = transcodeFlagsTarget.TRANSCODE_ALPHA_DATA_TO_OPAQUE_FORMATS;
        }

        this._ktxTexture.transcodeBasis(ktxTranscodeFormat, ktxTranscodeFlag);
    }

    /** @inheritDoc */
    public getTextureFormatInfo(format: KtxTranscodeFormat): TextureFormatInfo {
        if(format == KtxTranscodeFormat.ASTC_4X4_RGBA){
            return TextureFormatInfo.astc4x4rgba();
        }
        else if(format == KtxTranscodeFormat.BC7_RGBA) {
            return TextureFormatInfo.bc7();
        }
        else if(format == KtxTranscodeFormat.BC3_RGBA) {
            return TextureFormatInfo.bc3();
        }
        else if(format == KtxTranscodeFormat.ETC2_RGBA) {
            return TextureFormatInfo.etc2rgba();
        }
        else if(format == KtxTranscodeFormat.RGBA32){
            return TextureFormatInfo.rgba32();
        }
        else {
            throw new Error("Unrecognized texture format for " + format);
        }
    }

}