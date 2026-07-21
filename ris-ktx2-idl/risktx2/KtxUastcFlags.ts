/**
 * UASTC encoding configuration flags.
 *
 * @remarks
 * This is a packed bitfield matching the KTX/BasisU API:
 * - Bits 0–3: compression level (mutually exclusive)
 * - Bits 4+: optional encoding hints (combinable flags)
 */
export enum KtxUastcFlags {
  /**
   * Fastest compression (the lowest quality, the highest speed). ~43.45 dB.
   */
  LEVEL_FASTEST = 0,

  /**
   * Faster compression. ~46.49 dB.
   */
  LEVEL_FASTER = 1,

  /**
   * Default compression level (balanced). ~47.47 dB.
   */
  LEVEL_DEFAULT = 2,

  /**
   * Slower compression (higher quality). ~48.01 dB.
   */
  LEVEL_SLOWER = 3,

  /**
   * Very slow compression (the highest quality). ~48.24 dB.
   */
  LEVEL_VERY_SLOW = 4,

  /**
   * Bitmask used to extract the compression level (0–3/4).
   */
  LEVEL_MASK = 15,

  /**
   * Optimize encoding for the lowest UASTC reconstruction error.
   */
  FAVOR_UASTC_ERROR = 8,

  /**
   * Optimize encoding for the lowest BC7 decode error.
   */
  FAVOR_BC7_ERROR = 16,

  /**
   * Hint to optimize for faster ETC1 transcoding performance.
   */
  ETC1_FASTER_HINTS = 64,

  /**
   * Hint to optimize for fastest ETC1 transcoding performance.
   */
  ETC1_FASTEST_HINTS = 128,

  /**
   * Disables flip-and-individual optimizations for ETC1 transcoding.
   * (Advanced/rarely used option.)
   */
  ETC1_DISABLE_FLIP_AND_INDIVIDUAL = 256
}
