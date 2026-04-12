import type { BlendStateDescriptor } from "../../core/rendering/blending/blend-state-descriptor";
import type { IBlendState } from "../../core/rendering/blending/blend-state-interface";
import { WebGLConverter } from "../utilities/webgl-converter";
import type { WebGLGraphicsDevice } from "../webgl-graphics-device";

export class WebGLBlendState implements IBlendState {

    private readonly _gl: WebGL2RenderingContext;

    private _blendEnabled: boolean;
    private _srcColorFactor: GLenum;
    private _dstColorFactor: GLenum;
    private _colorBlendOperation: GLenum;
    private _srcAlphaFactor: GLenum;
    private _dstAlphaFactor: GLenum;
    private _alphaBlendOperation: GLenum;

    /**
     * The constructor.
     * @param _graphicsDevice The graphics device.
     * @param descriptor The blend state descriptor.
     */
    public constructor(private readonly _graphicsDevice: WebGLGraphicsDevice, descriptor: BlendStateDescriptor) {
        this._gl = this._graphicsDevice.gl;
        this._blendEnabled = descriptor.blendingEnabled;
        this._srcColorFactor = WebGLConverter.convertBlendFactor(this._gl, descriptor.color.srcFactor);
        this._dstColorFactor = WebGLConverter.convertBlendFactor(this._gl, descriptor.color.dstFactor);
        this._colorBlendOperation = WebGLConverter.convertBlendOperation(this._gl, descriptor.color.operation);
        this._srcAlphaFactor = WebGLConverter.convertBlendFactor(this._gl, descriptor.alpha.srcFactor);
        this._dstAlphaFactor = WebGLConverter.convertBlendFactor(this._gl, descriptor.alpha.dstFactor);
        this._alphaBlendOperation = WebGLConverter.convertBlendOperation(this._gl, descriptor.alpha.operation);
    }
    
    /** @inheritdoc */
    public nativeObject: any;

    /**
     * For internal use only. Applies the blend state to the WebGL context.
     * @param gl The WebGL context to apply the blend state to.
     */
    public apply(gl: WebGL2RenderingContext): void {
        if (this._blendEnabled) {
            gl.enable(gl.BLEND);
            gl.blendFuncSeparate(this._srcColorFactor, this._dstColorFactor, this._srcAlphaFactor, this._dstAlphaFactor);
            gl.blendEquationSeparate(this._colorBlendOperation, this._alphaBlendOperation);
        } else {
            gl.disable(gl.BLEND);
        }
    }

    /** @inheritdoc */
    public dispose(): void {
        // No resources to dispose for blend state in WebGL, as the state is applied directly to the WebGL context.
    }

}