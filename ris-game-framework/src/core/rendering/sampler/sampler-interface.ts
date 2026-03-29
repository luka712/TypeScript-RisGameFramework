import type { IDisposable } from "../../../common/disposable";
import type { MipmapSamplerFilter, SamplerAddressMode, SamplerFilter } from "./enums";

/**
 * The interface for the sampler.
 * A sampler is used to sample a texture in the shader.
 *  It defines how the texture is sampled, including the filtering method and the address mode.
 * The sampler is used in conjunction with a texture to sample the texture in the shader. 
 */
export interface ISampler extends IDisposable {
 */
export interface ISampler extends IDisposable {

    /**
     * The minification filter of the sampler.
     *  This is used to determine how the texture is sampled when it is minified (i.e., when the texture is displayed smaller than its original size).
     */
    minFilter: SamplerFilter;

    /**
     * The magnification filter of the sampler.
     * This is used to determine how the texture is sampled when it is magnified (i.e., when the texture is displayed larger than its original size).
     */
    magFilter: SamplerFilter;

    /**
     * The mipmap filter of the sampler.
     * This is used to determine how the texture is sampled when mipmapping is enabled (i.e., when the texture has multiple levels of detail).
     */
    mipMapFilter: MipmapSamplerFilter;

    /**
     * The address mode of the sampler for the U coordinate.
     * This is used to determine how the texture is sampled when the texture coordinates are outside the range [0, 1] for the U coordinate.
     */
    addressModueU: SamplerAddressMode;


    /**
     * The address mode of the sampler for the V coordinate.
     * This is used to determine how the texture is sampled when the texture coordinates are outside the range [0, 1] for the V coordinate.
     */
    addressModueV: SamplerAddressMode;

    /**
     * The address mode of the sampler for the W coordinate.
     * This is used to determine how the texture is sampled when the texture coordinates are outside the range [0, 1] for the W coordinate.
     */
    addressModueW: SamplerAddressMode;

    /**
     * The handle of the sampler. This is used to bind the sampler to the graphics pipeline.
     * The type of the handle is implementation-specific and should be treated as an opaque value.
     */
    handle: any;

    /**
     * Apply the changes to the sampler. 
     * This should be called after setting the properties of the sampler to apply the changes to the graphics pipeline.
     */
    applyChanges(): void;
}