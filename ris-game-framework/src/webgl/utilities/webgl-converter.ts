import { BlendFactor, BlendOperation } from "../../common/blend-state";
import { SamplerMagFilter, SamplerMinFilter } from "../../common/sampler-enums";
import { TextureFormat } from "../../common/texture-enums";
import { VertexFormat } from "../../common/vertex-format";
import { Culling } from "../../core/renderer/enums";

export class WebGLConverter {
    /**
     * Conversts BlendOperation to WebGL enum.
     * @parma gl The WebGL2RenderingContext.
     * @param blendOperation The BlendOperation.
     * @return The WebGL enum.
     */
    public static convertBlendOperation(
        gl: WebGL2RenderingContext,
        blendOperation: BlendOperation,
    ): number {
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
            case TextureFormat.RGBA_8_Unorm:
            case TextureFormat.BGRA_8_Unorm:
                return gl.RGBA8;
            case TextureFormat.Depth_32_Float:
                return gl.DEPTH_COMPONENT32F;
            case TextureFormat.Depth_24_Stencil_8:
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
            case TextureFormat.RGBA_8_Unorm:
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
            case TextureFormat.RGBA_8_Unorm:
            case TextureFormat.BGRA_8_Unorm:
                return gl.UNSIGNED_BYTE;
            default:
                throw new Error("NotImplementedException");
        }
    }

    /**
     * Converts SamplerMinFilter to WebGL enum.
     * @param gl The WebGL2RenderingContext.
     * @param minFilter The SamplerMinFilter.
     * @returns The WebGL enum.
     */
    public static convertToMinFilter(gl: WebGL2RenderingContext, minFilter: SamplerMinFilter): number {
        switch (minFilter) {
            case SamplerMinFilter.Nearest:
                return gl.NEAREST;
            case SamplerMinFilter.Linear:
                return gl.LINEAR;
            default:
                throw new Error("Cannot convert min filter " + minFilter);
        }
    }

    /**
     * Converts SamplerMagFilter to WebGL enum.
     * @param gl The WebGL2RenderingContext.
     * @param magFilter The SamplerMagFilter.
     * @returns The WebGL enum.
     */
    public static convertToMagFilter(gl: WebGL2RenderingContext, magFilter: SamplerMagFilter): number {
        switch (magFilter) {
            case SamplerMagFilter.Nearest:
                return gl.NEAREST;
            case SamplerMagFilter.Linear:
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

}

