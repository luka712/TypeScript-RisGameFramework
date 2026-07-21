/**
 * The KtxTranscodeFlags enumeration defines flags that can be used to control the transcoding process when converting BasisU/ETC1S or UASTC compressed textures to other formats. These flags can specify options such as how to handle non-power-of-two textures, whether to transcode alpha data for opaque formats, and whether to request higher quality transcoding for certain formats.
 */
export enum KtxTranscodeFlags {
  /**
   * No special transcoding options.
   */
  NONE = 0,

  KTX_TF_PVRTC_DECODE_TO_NEXT_POW2 = 2,

  KTX_TF_TRANSCODE_ALPHA_DATA_TO_OPAQUE_FORMATS = 4,

  KTX_TF_HIGH_QUALITY = 32
}
