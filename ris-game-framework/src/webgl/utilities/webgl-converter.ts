import { BlendFactor, BlendOperation } from "../../common/blend-state";
import { TextureFormat } from "../../common/texture-enums";
import { VertexFormat } from "../../common/vertex-format";
import { Culling } from "../../core/renderer/enums";
import { BufferUsage } from "../../core/rendering/enums";
import { MipmapSamplerFilter, SamplerAddressMode, SamplerFilter } from "../../core/rendering/sampler/enums";
import { State } from '../../common/state';

export class WebGLConverter {

    /**
     * Converts BufferUsage to WebGL enum.
     * @param usage The BufferUsage.
     * @return The WebGL enum.
     */
    public static convertBufferUsage(usage: BufferUsage): GLenum {
        switch (usage) {
            case BufferUsage.VERTEX:
            case BufferUsage.INDEX:
                return WebGL2RenderingContext.STATIC_DRAW;
            default:
                throw new Error("NotImplementedException");
        }
    }
    /**
     * Conversts BlendOperation to WebGL enum.
     * @parma gl The WebGL2RenderingContext.
     * @param blendOperation The BlendOperation.
     * @return The WebGL enum.
     */
    public static convertBlendOperation(
        gl: WebGL2RenderingContext,
        blendOperation: BlendOperation,
    ): GLenum {
        switch (blendOperation) {
            case BlendOperation.Add:
                return gl.FUNC_ADD;
            case BlendOperation.Subtract:
                return gl.FUNC_SUBTRACT;
            case BlendOperation.ReverseSubtract:
                return gl.FUNC_REVERSE_SUBTRACT;
            case BlendOperation.Min:
                return gl.MIN;
            case BlendOperation.Max:
                return gl.MAX;
            default:
                throw new Error("NotImplementedException");
        }
    }

    /**
     * Converts BlendFactor to WebGL enum.
     * @param gl The WebGL2RenderingContext.
     * @param blendingFactor The BlendFactor.
     * @returns The WebGL enum.
     */
    public static convertBlendFactor(
        gl: WebGL2RenderingContext,
        blendingFactor: BlendFactor,
    ): number {
        switch (blendingFactor) {
            case BlendFactor.Zero:
                return gl.ZERO;
            case BlendFactor.One:
                return gl.ONE;
            case BlendFactor.Src:
                return gl.SRC_COLOR;
            case BlendFactor.SrcAlpha:
                return gl.SRC_ALPHA;
            case BlendFactor.OneMinusSrcAlpha:
                return gl.ONE_MINUS_SRC_ALPHA;
            case BlendFactor.DstAlpha:
                return gl.DST_ALPHA;
            case BlendFactor.OneMinusDstAlpha:
                return gl.ONE_MINUS_DST_ALPHA;
            default:
                throw new Error("NotImplementedException");
        }
    }

    /**
     * Converts Culling to WebGL enum.
     * @param gl The WebGL2RenderingContext.
     * @param culling The Culling.
     * @returns The WebGL enum.
     */
    public static convertCulling(gl: WebGL2RenderingContext, culling: Culling): number {
        switch (culling) {
            case Culling.Front:
                return gl.FRONT;
            case Culling.Back:
                return gl.BACK;
            case Culling.None:
                return gl.NONE;
            default:
                throw new Error("NotImplementedException");
        }
    }

    /**
     * Converts TextureFormat to WebGL internal format, format, and type.
     * @param gl The WebGL2RenderingContext.
     * @param textureFormat The TextureFormat.
     * @returns The WebGL internal format.
     */
    public static convertInternalFormat(gl: WebGL2RenderingContext, textureFormat: TextureFormat): number {
        switch (textureFormat) {
            // Same format regardless.
            case TextureFormat.RGBA_8_UNORM:
            case TextureFormat.BGRA_8_UNORM:
                return gl.RGBA8;
            case TextureFormat.DEPTH_32_FLOAT:
                return gl.DEPTH_COMPONENT32F;
            case TextureFormat.DEPTH_24_STENCIL_8:
                return gl.DEPTH24_STENCIL8;
            default:
                throw new Error("NotImplementedException");
        }
    }

    /**
     * Converts TextureFormat to WebGL format.
     * @param gl The WebGL2RenderingContext.
     * @param textureFormat The TextureFormat.
     * @returns The WebGL format.
     */
    public static convertToPixelFormat(gl: WebGL2RenderingContext, textureFormat: TextureFormat): number {
        switch (textureFormat) {
            case TextureFormat.RGBA_8_UNORM:
                return gl.RGBA;
            default:
                throw new Error("NotImplementedException");
        }
    }

    /**
     * Converts TextureFormat to WebGL texture type.
     * @param gl The WebGL2RenderingContext.
     * @param textureFormat The TextureFormat.
     * @returns The WebGL texture type.
     */
    public static convertToTextureType(gl: WebGL2RenderingContext, textureFormat: TextureFormat): number {
        switch (textureFormat) {
            case TextureFormat.RGBA_8_UNORM:
            case TextureFormat.BGRA_8_UNORM:
                return gl.UNSIGNED_BYTE;
            default:
                throw new Error("NotImplementedException");
        }
    }

    /**
     * Converts SamplerMinFilter to WebGL enum.
     * @param gl The WebGL2RenderingContext.
     * @param minFilter The SamplerMinFilter.
     * @param mipMapFilter The MipmapSamplerFilter.
     * @returns The WebGL enum.
     */
    public static convertToMinFilter(gl: WebGL2RenderingContext, minFilter: SamplerFilter, mipMapFilter: MipmapSamplerFilter): number {
        if (mipMapFilter == MipmapSamplerFilter.NONE) {
            return this.convertMagFilter(gl, minFilter);
        }

        if (minFilter == SamplerFilter.NEAREST) {
            switch (mipMapFilter) {
                case MipmapSamplerFilter.NEAREST:
                    return gl.NEAREST_MIPMAP_NEAREST;
                case MipmapSamplerFilter.LINEAR:
                    return gl.NEAREST_MIPMAP_LINEAR;
                default:
                    throw new Error("NotImplementedException");
            }
        }
        else if (minFilter == SamplerFilter.LINEAR) {
            switch (mipMapFilter) {
                case MipmapSamplerFilter.NEAREST:
                    return gl.LINEAR_MIPMAP_NEAREST;
                case MipmapSamplerFilter.LINEAR:
                    return gl.LINEAR_MIPMAP_LINEAR;
                default:
                    throw new Error("NotImplementedException");
            }
        }

        throw new Error("NotImplementedException");
    }

    /**
     * Converts SamplerMagFilter to WebGL enum.
     * @param gl The WebGL2RenderingContext.
     * @param magFilter The SamplerMagFilter.
     * @returns The WebGL enum.
     */
    public static convertToMagFilter(gl: WebGL2RenderingContext, magFilter: SamplerFilter): number {
        switch (magFilter) {
            case SamplerFilter.NEAREST:
                return gl.NEAREST;
            case SamplerFilter.LINEAR:
                return gl.LINEAR;
            default:
                throw new Error("NotImplementedException");
        }
    }

    /**
     * Converts VertexFormat to the number of components for WebGL vertex attribute pointer.
     * @param vertexFormat The VertexFormat.
     * @returns The number of components for WebGL vertex attribute pointer.
     */
    public static convertVertexFormat(vertexFormat: VertexFormat): number {
        switch (vertexFormat) {
            case VertexFormat.Float32:
                return 1;
            case VertexFormat.Float32x2:
                return 2;
            case VertexFormat.Float32x3:
                return 3;
            case VertexFormat.Float32x4:
                return 4;
            case VertexFormat.Float32x16:
                return 16;
            default:
                throw new Error("NotImplementedException");
        }
    }

    /**
     * Converts SamplerFilter to WebGL enum.
     * @param gl The WebGL2RenderingContext.
     * @param filter The SamplerFilter.
     * @returns The WebGL enum.
     */
    public static convertMagFilter(gl: WebGL2RenderingContext, filter: SamplerFilter): number {
        switch (filter) {
            case SamplerFilter.NEAREST:
                return gl.NEAREST;
            case SamplerFilter.LINEAR:
                return gl.LINEAR;
            default:
                throw new Error("NotImplementedException");
        }
    }

    /**
     * Converts SamplerFilter and MipmapSamplerFilter to WebGL enum for minification filter.
     * @param gl The WebGL2RenderingContext.
     * @param filter The SamplerFilter.
     * @param mipMapFilter The MipmapSamplerFilter.
     * @returns The WebGL enum.
     */
    public static convertMinFIlter(gl: WebGL2RenderingContext, filter: SamplerFilter, mipMapFilter: MipmapSamplerFilter): number {

        if (mipMapFilter == MipmapSamplerFilter.NONE) {
            return this.convertMagFilter(gl, filter);
        }
        switch (filter) {
            case SamplerFilter.NEAREST:
                switch (mipMapFilter) {
                    case MipmapSamplerFilter.NEAREST:
                        return gl.NEAREST_MIPMAP_NEAREST;
                    case MipmapSamplerFilter.LINEAR:
                        return gl.NEAREST_MIPMAP_LINEAR;
                    default:
                        throw new Error("NotImplementedException");
                }
            case SamplerFilter.LINEAR:
                switch (mipMapFilter) {
                    case MipmapSamplerFilter.NEAREST:
                        return gl.LINEAR_MIPMAP_NEAREST;
                    case MipmapSamplerFilter.LINEAR:
                        return gl.LINEAR_MIPMAP_LINEAR;
                    default:
                        throw new Error("NotImplementedException");
                }
            default:
                throw new Error("NotImplementedException");
        }
    }

    /**
     * Converts SamplerAddressMode to WebGL enum.
     * @param gl The WebGL2RenderingContext.
     * @param addressMode The SamplerAddressMode.
     * @returns The WebGL enum.
     */
    public static convertAddressMode(gl: WebGL2RenderingContext, addressMode: SamplerAddressMode): number {
        switch (addressMode) {
            case SamplerAddressMode.CLAMP_TO_EDGE:
                return gl.CLAMP_TO_EDGE;
            case SamplerAddressMode.REPEAT:
                return gl.REPEAT;
            case SamplerAddressMode.MIRROR_REPEAT:
                return gl.MIRRORED_REPEAT;
            case SamplerAddressMode.CLAMP_TO_BORDER:
                return gl.CLAMP_TO_EDGE;
            default:
                throw new Error("NotImplementedException");
        }
    }

}