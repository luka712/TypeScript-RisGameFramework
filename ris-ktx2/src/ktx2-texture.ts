import type {IKtx2Texture} from "./ktx-texture-interface.ts";
import type {IKtxBasisParams} from "./IKtxBasisParams.ts";
import type {KtxTranscodeFlags, KtxTranscodeFormat} from "./enums.ts";

/**
 * The KTX2 texture class.
 */
export class Ktx2Texture implements IKtx2Texture{

    // @ts-ignore
    private readonly _ktxTexture: any;

    /**
     * The constructor.
     * @param ktxTexture - The underlying KTX texture.
     * @param filePath - The file path of the texture.
     */
    constructor(ktxTexture: any, filePath?: string) {
        this._ktxTexture = ktxTexture;
        this.filePath = filePath;
        this.width = ktxTexture.baseWidth;
        this.height = ktxTexture.baseHeight;
        this.dataSize = ktxTexture.dataSize;
        this.needsTranscoding = ktxTexture.needsTranscoding;
        this.numLevels = ktxTexture.numLevels;
    }

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
    readonly numLevels;

    compressAstc(quality: number): void {
        console.log(quality);
    }

    compressBasis(basisParams: IKtxBasisParams): void;
    compressBasis(quality: number): void;
    compressBasis(basisParams: IKtxBasisParams | number): void {
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

    transcodeBasis(transcodeFormat: KtxTranscodeFormat, transcodeFlags: KtxTranscodeFlags): void {
        console.log(transcodeFormat, transcodeFlags);
    }

}