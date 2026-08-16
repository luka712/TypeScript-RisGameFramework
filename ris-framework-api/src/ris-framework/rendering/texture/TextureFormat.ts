/**
 * The texture format.
 */
export enum TextureFormat {
    /**
     * Default value.
     For unknown texture format.
     */
    UNDEFINED = 0,
    /**
     * Ordinary format with four 8-bit normalized unsigned integer components in RGBA order.
     */
    RGBA_8_UNORM = 1,

    /**
     * Depth 24 and stencil 8.
     */
    DEPTH_24_STENCIL_8 = 2,

    /**
     * The depth 32 float.
     */
    DEPTH_32_FLOAT = 3,

    RED_32_FLOAT = 4,
    /**
     * The 32-bit float format with one red component. It is typeless.

     Valid only for D3D11.
     */
    RED_32_TYPELESS = 5,
    /**
     * The BC7 compressed format with four 8-bit normalized unsigned integer components in RGBA order.
     */
    BC7_RGBA_UNORM = 6,
    /**
     * The BC3 compressed format with four 8-bit normalized unsigned integer components in RGBA order.
     */
    BC3_RGBA_UNORM = 7,
    /**
     * The ETC2 compressed format with four 8-bit normalized unsigned integer components in RGBA order.
     */
    ETC2_RGBA8_UNORM = 8,
    /**
     * The ASTC 4x4 compressed format with four 8-bit normalized unsigned integer components in RGBA order.
     */
    ATSC_4X4_RGBA = 9
}
