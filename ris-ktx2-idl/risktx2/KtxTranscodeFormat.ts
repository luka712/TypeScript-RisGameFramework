export enum KtxTranscodeFormat {
  KTX_TTF_ETC1_RGB = 0,

  /**
   * Transcode to ETC2 compressed RGBA texture.
   */
  ETC2_RGBA = 1,

  KTX_TTF_BC1_RGB = 2,

  /**
   * Transcode to BC3 compressed RGBA texture.
   * Common on desktop devices.
   * Oldest and most widely supported block compression format for color textures.
   */
  BC3_RGBA = 3,

  KTX_TTF_BC4_R = 4,

  KTX_TTF_BC5_RG = 5,

  /**
   * BC7 compressed RGBA texture.
   * High quality block compression for color textures.
   * Supports alpha channel and is suitable for diffuse/physically based textures.
   */
  BC7_RGBA = 6,

  KTX_TTF_PVRTC1_4_RGB = 8,

  KTX_TTF_PVRTC1_4_RGBA = 9,

  /**
   * Compressed ASTC 4x4 RGBA texture.
   * Common on mobile devices, especially Apple. High quality block compression for color textures.
   * Supports alpha channel and is suitable for diffuse/physically based textures.
   */
  ASTC_4X4_RGBA = 10,

  KTX_TTF_PVRTC2_4_RGB = 18,

  KTX_TTF_PVRTC2_4_RGBA = 19,

  KTX_TTF_ETC2_EAC_R11 = 20,

  KTX_TTF_ETC2_EAC_RG11 = 21,

  /**
   * Uncompressed RGBA 32bpp image format.
   * Not a block compressed format.
   * Supported on all devices.
   */
  RGBA32 = 13,

  KTX_TTF_RGB565 = 14,

  KTX_TTF_BGR565 = 15,

  KTX_TTF_RGBA4444 = 16,

  KTX_TTF_ETC = 22,

  KTX_TTF_BC1_OR_3 = 23,

  KTX_TTF_NOSELECTION = 2147483647
}
