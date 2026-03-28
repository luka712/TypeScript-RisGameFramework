
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
    RGBA_8_UNORM,

    /**
     * Ordinary format with four 8-bit normalized unsigned integer components in BGRA order.
     */
    BGRA_8_UNORM,

    /**
     * Ordinary format with four 8-bit normalized unsigned integer components in BGRA order. Uses sRGB color space.
     */
    BGRA_8_UNORM_SRGB,

    /**
     * Depth 24 and stencil 8.
     */
    DEPTH_24_STENCIL_8,

    /**
     * Depth 32 float.
     */
    DEPTH_32_FLOAT,

    /**
     * The 32-bit float format with one red component.
     */
    RED_32_FLOAT,
}

/**
 * The texture usage.
 */
export enum TextureUsage {

    /**
     * Default value. For unknown texture usage.
     */
    UNDEFINED,

    /**
     * The texture can be used as a shader resource.
     */
    TEXTURE_BINDING,

    /**
     * The texture can be used as a copy destination.
     */
    COPY_DST,

    /**
     * The texture can be used as a copy source.
     */
    COPY_SRC,

    /**
     * The texture can be used as a render target attachment.
     */
    RENDER_ATTACHMENT,

    /**
     * The texture can be used as a copy destination and a shader resource.
     */
    COPY_DST_TEXTURE_BINDING,

    /**
     * The texture can be used as a render target attachment and a shader resource.
     */
    TEXTURE_BINDING_RENDER_TARGET,

    /**
     * The texture can be used as a copy destination, a render target attachment and a shader resource.
     */
    COPY_DST_TEXTURE_BINDING_RENDER_TARGET
}
