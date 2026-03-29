
/**
 * The sampler filter of setting minification and magnification filter of the sampler.
 */
export enum SamplerFilter {

    /**
     * The nearest filtering method. 
     * The texture will be sampled using the value of the nearest texel.
     */
    NEAREST,

    /**
     * The linear filtering method.
     *  The texture will be sampled using the weighted average of the four nearest texels.
     */
    LINEAR,
}

/**
 * The sampler filter of setting mipmap filter of the sampler.
 */
export enum MipmapSamplerFilter {
    /**
     * Mipmap filtering is disabled. The mipmap level 0 will be used for sampling.
     */
    NONE = 0,

    /**
     * The nearest mipmap filtering method. The mipmap level will be selected using the value of the nearest mipmap level.
     */
    NEAREST,
    /**
     * The linear mipmap filtering method. The mipmap level will be selected using the weighted average of the two nearest mipmap levels.
     */
    LINEAR,
}

/**
 * The sampler address mode of setting the address mode of the sampler.
 */
export enum SamplerAddressMode {
    /**
     * The repeat address mode. 
     * The texture will be repeated when the texture coordinates are outside the range [0, 1].
     */
    REPEAT = 0,

    /**
     * The mirror repeat address mode.
     */
    /// </summary>
    MIRROR_REPEAT = 1,

    /**
     * The clamp to edge address mode.
     */
    CLAMP_TO_EDGE = 2,

    /**
     * The clamp to border address mode. 
     * The texture will be clamped to a border color when the texture coordinates are outside the range [0, 1].
     */
    CLAMP_TO_BORDER = 3,
}
