export enum BufferUsage {

    /** 
     * No specific usage.
     */
    NONE,

    /**
     * The buffer is intended to be used as a vertex buffer.
     */
    VERTEX ,

    /**
     * The buffer is intended to be used as an index buffer.
     */
    INDEX,

    /**
     * The buffer is intended to be used as a uniform buffer.
     */
    UNIFORM,

    /**
     * The buffer is intended to be used as a copy destination.
     */
    COPY_DST,
}

/**
 * Specifies the action to take with the attachment contents at the **end** of a render pass.
 */
export enum StoreAction {
    /**
     * The contents of the attachment will be stored after the render pass. 
     * This is the default value.
     */
    STORE,

    /**
     * The contents of the attachment will be discarded after the render pass.
     */
    DISCARD,
}

/**
 * Specifies the action to take with the attachment contents at the **beginning** of a render pass.
 */
export enum LoadAction {
    /**
     * The contents of the attachment will be cleared at the beginning of the render pass.
     */
    CLEAR,

    /**
     * The contents of the attachment will be loaded from the previous render pass or from the texture/swap chain at the beginning of the render pass.
     */
    LOAD,

    /**
     * The contents of the attachment are undefined at the beginning of the render pass.
     */
    UNDEFINED
}

/**
 * The preset for texture sampler filtering.
 * This is used to configure the default texture sampler in the graphics device.
 *  The default texture sampler is used when a texture is sampled without a specific sampler being bound.
 */
export enum TextureSamplerFilteringPreset {
    /**
     * Point filtering preset. This will configure the texture sampler to use point filtering for minification and magnification, and no mipmapping.
     */
    POINT,

    /**
     * Bilinear filtering preset. This will configure the texture sampler to use bilinear filtering for minification and magnification, and no mipmapping.
     */
    BILINEAR,

    /**
     * Trilinear filtering preset. This will configure the texture sampler to use bilinear filtering for minification and magnification, and linear mipmapping.
     */
    TRILINEAR
}

/**
 * The shader stage. This is used to specify the shader stage for a shader module or a shader resource binding.
 */
export enum ShaderStage {
    /**
     * The vertex shader stage. This is used to specify that a shader module is a vertex shader, or to specify that a shader resource binding is visible to the vertex shader stage.
     */
    VERTEX = 1 << 0,

    /**
     * The fragment shader stage. This is used to specify that a shader module is a fragment shader, or to specify that a shader resource binding is visible to the fragment shader stage.
     */
    FRAGMENT = 1 << 1,

}