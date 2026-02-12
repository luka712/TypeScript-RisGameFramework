import { Culling } from "../../core/renderer/enums";
import { BlendFactor, BlendOperation } from "../common/blend-state";

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
}
