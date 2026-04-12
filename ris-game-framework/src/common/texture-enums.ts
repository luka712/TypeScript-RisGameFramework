
/**
 * The texture format.
 */
export enum TextureFormat {
    /**
     * Default value.
     * For unknown texture format.
     */
    UNDEFINED = "undefined",

    /**
     * Ordinary format with four 8-bit normalized unsigned integer components in RGBA order.
     */
    RGBA_8_UNORM = "rgba_8_unorm",

    /**
     * Ordinary format with four 8-bit normalized unsigned integer components in BGRA order.
     */
    BGRA_8_UNORM = "bgra_8_unorm",

    /**
     * Ordinary format with four 8-bit normalized unsigned integer components in BGRA order. Uses sRGB color space.
     */
    BGRA_8_UNORM_SRGB = "bgra_8_unorm_srgb",

    /**
     * Depth 24 and stencil 8.
     */
    DEPTH_24_STENCIL_8 = "depth_24_stencil_8",

    /**
     * Depth 32 float.
     */
    DEPTH_32_FLOAT = "depth_32_float",

    /**
     * The 32-bit float format with one red component.
     */
    RED_32_FLOAT = "red_32_float",
}

/**
 * The texture usage.
 */
export enum TextureUsage {

    /**
     * Default value. For unknown texture usage.
     */
    UNDEFINED = 0,

    /**
     * The texture can be used as a shader resource.
     */
    TEXTURE_BINDING = 1 << 0,

    /**
     * The texture can be used as a copy destination.
     */
    COPY_DST = 1 << 1,

    /**
     * The texture can be used as a copy source.
     */
    COPY_SRC = 1 << 2,

    /**
     * The texture can be used as a render target attachment.
     */
    RENDER_ATTACHMENT = 1 << 3,
}
