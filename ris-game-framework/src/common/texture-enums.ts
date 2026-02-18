
/**
 * The texture format.
 */
export enum TextureFormat {
    /**
     * Default value.
     * For unknown texture format.
     */
    Undefined = 0,

    /**
     * Ordinary format with four 8-bit normalized unsigned integer components in RGBA order.
     */
    RGBA_8_Unorm,

    /**
     * Ordinary format with four 8-bit normalized unsigned integer components in BGRA order.
     */
    BGRA_8_Unorm,

    /**
     * Ordinary format with four 8-bit normalized unsigned integer components in BGRA order. Uses sRGB color space.
     */
    BGRA_8_Unorm_sRGB,

    /**
     * Depth 24 and stencil 8.
     */
    Depth_24_Stencil_8,

    /**
     * Depth 32 float.
     */
    Depth_32_Float,

    /**
     * The 32-bit float format with one red component.
     */
    Red_32_Float,
}

/**
 * The texture usage.
 */
export enum TextureUsage {

    /**
     * Default value. For unknown texture usage.
     */
    Undefined,

    /**
     * The texture can be used as a shader resource.
     */
    TextureBinding,

    /**
     * The texture can be used as a copy destination.
     */
    CopyDst,

    /**
     * The texture can be used as a copy source.
     */
    CopySrc,

    /**
     * The texture can be used as a render target attachment.
     */
    RenderAttachment,

    /**
     * The texture can be used as a copy destination and a shader resource.
     */
    CopyDst_TextureBinding,

    /**
     * The texture can be used as a render target attachment and a shader resource.
     */
    TextureBinding_RenderTarget,
}
