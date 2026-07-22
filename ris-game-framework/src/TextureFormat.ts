/**
 * The texture format.
 */
export enum TextureFormat {
  /**
   * Default value.
   * For unknown texture format.
   */
  UNDEFINED = 0,

  /**
   * Ordinary format with four 8-bit normalized unsigned integer components in RGBA order.
   */
  RGBA_8_UNORM = 1,

  /**
   * Ordinary format with four 8-bit normalized unsigned integer components in BGRA order.
   */
  BGRA_8_UNORM = 2,

  /**
   * Ordinary format with four 8-bit normalized unsigned integer components in BGRA order. Uses sRGB color space.
   */
  BGRA_8_UNORM_SRGB = 3,

  /**
   * Depth 24 and stencil 8.
   */
  DEPTH_24_STENCIL_8 = 4,

  /**
   * The depth 32 float.
   */
  DEPTH_32_FLOAT = 5,

  RED_32_FLOAT = 6,

  /**
   * The 32-bit float format with one red component. It is typeless.
   * Valid only for D3D11.
   */
  RED_32_TYPELESS = 7,

  /**
   * The BC7 compressed format with four 8-bit normalized unsigned integer components in RGBA order.
   */
  BC7_RGBA_UNORM = 8,

  /**
   * The BC3 compressed format with four 8-bit normalized unsigned integer components in RGBA order.
   */
  BC3_RGBA_UNORM = 9,

  /**
   * The ETC2 compressed format with four 8-bit normalized unsigned integer components in RGBA order.
   */
  ETC2_RGBA8_UNORM = 10,

  /**
   * The ASTC 4x4 compressed format with four 8-bit normalized unsigned integer components in RGBA order.
   */
  ATSC_4X4_RGBA = 11
}
