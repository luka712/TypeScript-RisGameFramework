import type {KtxUastcFlags} from "./enums.ts";

/**
 * The parameters for the Basis Universal compression algorithm.
 */
export interface IKtxBasisParams {
  /**
   * Encoding speed vs. quality tradeoff.
   * Range is [0,5].
   * Higher values are slower but give higher quality.
   * There is no default.
   * Callers must explicitly set this value.
   * Currently, this is 2.
   */
  compressionLevel: number;

  /**
   * Gets or sets the quality level for compression.
   *
   * @remarks
   * QualityLevel must be in the range [1, 255].
   * Lower values give better compression and faster processing but lower quality,
   * while higher values give less compression, higher quality, and slower processing.
   * This parameter automatically determines values for maxEndpoints, maxSelectors, endpointRDOThreshold,
   * and selectorRDOThreshold for the target quality level.
   * Setting these parameters overrides the values determined by QualityLevel,
   * which defaults to 128 if neither it nor both of maxEndpoints and maxSelectors have been set.
   */
  qualityLevel: number;

  /**
   * Specifies whether to use UASTC encoding.
   */
  uastc: boolean;

  /**
   * Specifies UASTC encoding options.
   */
  uastcFlags: KtxUastcFlags;

  /**
   * Tunes codec parameters for better quality on normal maps (no selector RDO, no endpoint RDO) and sets the texture's DFD appropriately.
   * Only valid for linear textures.
   */
  normalMap: boolean;

  /**
   * Number of threads used for compression. Default is 1.
   */
  threadCount: number;

  /**
   * A swizzle to apply before encoding.
   * It must match the regular expression /^[rgba01]{4}$/.
   * If both this and preSwizzle are specified, ktxTexture_CompressBasisEx will raise KTX_INVALID_OPERATION.
   * Usable with both ETC1S and UASTC.
   */
  inputSwizzle: string[];

  /**
   * Enable Rate Distortion Optimization (RDO) post-processing.
   */
  uastcRDO: boolean;

  /**
   * UASTC RDO quality scalar (lambda).
   * Lower values yield higher quality/larger LZ compressed files, higher values yield lower quality/smaller LZ compressed files.
   * A good range to try is [.2,4].
   * The full range is [.001,50.0].
   * Default is 1.0.
   */
  uastcRDOQualityScalar: number;

  /**
   * If true>, prints Basis Universal encoder operation details to output stream.
   * Not recommended for GUI apps.
   */
  verbose: boolean;
}
