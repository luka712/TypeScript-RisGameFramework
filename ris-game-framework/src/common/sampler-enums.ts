/**
 * The min filter to use when sampling a texture. This determines how the texture is sampled when it is minified (i.e., when it is smaller than its original size).
 * The options are:
 * - Nearest: The nearest texel is used. This can result in a pixelated look when the texture is minified.
 * - Linear: A weighted average of the four nearest texels is used. This can result in a smoother look when the texture is minified.
 */
export enum SamplerMinFilter {
    /**
     * The nearest texel is used. This can result in a pixelated look when the texture is minified.
     */
    Nearest = "nearest",

    /**
     * The weighted average of the four nearest texels is used. This can result in a smoother look when the texture is minified.
     */
    Linear = "linear",
}

/**
 * The mag filter to use when sampling a texture. This determines how the texture is sampled when it is magnified (i.e., when it is larger than its original size).
 * The options are:
 * - Nearest: The nearest texel is used. This can result in a pixelated look when the texture is magnified.
 * - Linear: A weighted average of the four nearest texels is used. This can result in a smoother look when the texture is magnified.
 */
export enum SamplerMagFilter {
    /**
     * The nearest texel is used. This can result in a pixelated look when the texture is magnified.
     */
    Nearest = "nearest",

    /**
     * The weighted average of the four nearest texels is used. This can result in a smoother look when the texture is magnified.
     */
    Linear = "linear",
}

/**
 * The mipmap filter to use when sampling a texture. This determines how the texture is sampled when it is minified and mipmaps are used.
 * The options are:
 * - Nearest: The nearest mipmap level is used, and the nearest texel from that level is used. This can result in a pixelated look when the texture is minified.
 * - Linear: The nearest mipmap level is used, and a weighted average of the four nearest texels from that level is used. This can result in a smoother look when the texture is minified.
 */
export enum SamplerMipmapFilter {
    /**
     * The nearest mipmap level is used, and the nearest texel from that level is used. This can result in a pixelated look when the texture is minified.
     */
    Nearest = "nearest",

    /**
     * The nearest mipmap level is used, and a weighted average of the four nearest texels from that level is used. This can result in a smoother look when the texture is minified.
     */
    Linear = "linear",
}

/**
 * The compare function to use when sampling a texture. This is used for depth textures and determines how the sampled depth value is compared to the reference value.
 */
export enum SamplerCompareFunction {

    /**
     * The sampled depth value is never less than the reference value. This means that the comparison will always fail, and the texture will not contribute to the final image.
     */
    Never,

    /**
     * The sampled depth value is less than the reference value. This means that the comparison will pass if the sampled depth value is less than the reference value, and the texture will contribute to the final image.
     */
    LessEqual,
}


/**
 * The sampler address mode.
 */
export enum SamplerAddressMode
{
    Repeat = 0,
    MirrorRepeat = 1,
    ClampToEdge = 2,
}