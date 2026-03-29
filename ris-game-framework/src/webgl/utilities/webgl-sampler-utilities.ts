import { SamplerCompareFunction } from '../../common/sampler-enums';
import { MipmapSamplerFilter, SamplerAddressMode, SamplerFilter } from '../../core/rendering/sampler/enums';
import { SpectorJSUtilities } from './spector-js-utilities';
import { WebGLConverter } from './webgl-converter';

export class WebGLSamplerUtilities {

      
    /**
     * Creates a WebGLSampler with the specified parameters.
     * @param gl The WebGL2RenderingContext.
     * @param minFilter The minification filter of the sampler.
     * @param magFilter The magnification filter of the sampler.
     * @param mipMapFilter The mipmap filter of the sampler.
     * @param addressModeU The address mode of the sampler for the U coordinate.
     * @param addressModeV The address mode of the sampler for the V coordinate.
     * @param addressModeW The address mode of the sampler for the W coordinate.
     * @param compareFunction The compare function of the sampler. This is used for shadow samplers.
     * @param anisotropy The anisotropy level of the sampler. This is used for anisotropic filtering. The default value is 1, which means no anisotropic filtering.
     * @param label The label of the sampler. This is used for debugging purposes and can be viewed in graphics debuggers like SpectorJS.
     * @returns 
     */
    public create( gl: WebGL2RenderingContext,
        minFilter: SamplerFilter = SamplerFilter.LINEAR,
        magFilter: SamplerFilter = SamplerFilter.LINEAR,
        mipMapFilter: MipmapSamplerFilter = MipmapSamplerFilter.NONE,
        addressModeU: SamplerAddressMode = SamplerAddressMode.CLAMP_TO_EDGE,
        addressModeV: SamplerAddressMode = SamplerAddressMode.CLAMP_TO_EDGE,
        addressModeW: SamplerAddressMode = SamplerAddressMode.CLAMP_TO_EDGE,
        compareFunction: SamplerCompareFunction = SamplerCompareFunction.Never,
        anisotropy: number = 1,
        label: string = "") : WebGLSampler
    {
        const sampler = gl.createSampler();

        const glMinFilter = WebGLConverter.convertMinFIlter(gl, minFilter, mipMapFilter);
        const glMagFilter = WebGLConverter.convertMagFilter(gl, magFilter);
        const glAddressModeU = WebGLConverter.convertAddressMode(gl, addressModeU);
        const glAddressModeV = WebGLConverter.convertAddressMode(gl, addressModeV);
        const glAddressModeW = WebGLConverter.convertAddressMode(gl, addressModeW);
        

        gl.samplerParameteri(sampler, gl.TEXTURE_MIN_FILTER, glMinFilter);
        gl.samplerParameteri(sampler, gl.TEXTURE_MAG_FILTER, glMagFilter);
        gl.samplerParameteri(sampler, gl.TEXTURE_WRAP_S, glAddressModeU);
        gl.samplerParameteri(sampler, gl.TEXTURE_WRAP_T, glAddressModeV);
        gl.samplerParameteri(sampler, gl.TEXTURE_WRAP_R, glAddressModeW);
        if (compareFunction != SamplerCompareFunction.Never)
        {
            // gl.samplerParameteri(sampler, gl.TEXTURE_COMPARE_FUNC, WebGLConverter.convertCompareFunction(gl, compareFunction));
            gl.samplerParameteri(sampler, gl.TEXTURE_COMPARE_MODE, gl.COMPARE_REF_TO_TEXTURE);
        }
        else
        {
            gl.samplerParameteri(sampler, gl.TEXTURE_COMPARE_MODE, gl.NONE);
        }

        if(label && label.length > 0)
        {
            SpectorJSUtilities.setLabel(sampler, label);
        }

        //if (anisotropy > 1)
        //{
        //    // Check if anisotropic filtering is supported
        //    if (gl.Extensions.Contains("GL_EXT_texture_filter_anisotropic"))
        //    {
        //        float maxAnisotropy = gl.GetFloat(GLEnum.MaxTextureMaxAnisotropyExt);
        //        float anisotropyLevel = Math.Min(anisotropy, maxAnisotropy);
        //        gl.SamplerParameter(sampler, GLEnum.TextureMaxAnisotropyExt, anisotropyLevel);
        //    }
        //    else
        //    {
        //        Console.WriteLine("Anisotropic filtering is not supported on this device.");
        //    }
        //}
        return sampler;
    }
}