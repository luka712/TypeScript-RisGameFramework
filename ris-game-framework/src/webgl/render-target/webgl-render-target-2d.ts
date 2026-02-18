import type { vec2 } from "gl-matrix";
import { TextureFormat, TextureUsage } from "../../common/texture-enums";
import type { IFramework } from "../../core/framework-interface";
import type { IRenderTarget2D } from "../../render-target/render-target-2d";
import { asWebGLRenderer, asWebGLTexture2D } from "../cast/cast";
import type { WebGLTexture2D } from "../texture/webgl-texture-2d";

export class WebGLRenderTarget2D implements IRenderTarget2D {

    private readonly _gl: WebGL2RenderingContext;

    protected _textureAttachment0: WebGLTexture2D = null!;
    protected _depthStencilTexture?: WebGLTexture2D;

    /**
     * The constructor for the WebGLRenderTarget2D class.
     * @param _framework 
     * @param renderTargetSize 
     * @param depthBufferSize 
     * @param colorAttachmentFormat0 
     * @param depthStencilFormat 
     * @param depthTextureUsage 
     * @param colorAttachmentLabel 
     * @param depthStencilAttachmentLabel 
     */
    constructor(private readonly _framework: IFramework,
        private readonly _renderTargetSize: vec2,
        depthBufferSize?: vec2,
        private readonly _colorAttachmentFormat0 = TextureFormat.Undefined,
        depthStencilFormat?: TextureFormat,
        depthTextureUsage?: TextureUsage,
        private readonly _colorAttachment0Label?: string,
        private readonly _depthStencilAttachmentLabel?:
    ) {
        this._gl = asWebGLRenderer(_framework.renderer).gl!;
        colorAttachmentFormat0 = colorAttachmentFormat0 ?? TextureFormat.Undefined;
        depthStencilFormat = depthStencilFormat ?? TextureFormat.Undefined;
        depthTextureUsage = depthTextureUsage ?? TextureUsage.RenderAttachment;
    }

    /** @inheritdoc */
    public get width(): number {
        return this._renderTargetSize[0];
    }

    /** @inheritdoc */
    public get height(): number {
        return this._renderTargetSize[1];
    }

    /** @inheritdoc */
    public get colorAttachment0Label(): string | undefined {
        return this._colorAttachment0Label;
    }

    /** @inheritdoc */
    public get depthStencilLabel(): string | undefined {
        return this._depthStencilAttachmentLabel;
    }

    /** @inheritdoc */
    public initialize(): void {

        const texture = this._framework.textureFactory
            .createEmpty(
                this._renderTargetSize[0], this._renderTargetSize[1],
                null, null, null,
                TextureUsage.TextureBinding_RenderTarget,
                this._colorAttachmentFormat0
            );
            
        this._textureAttachment0 = asWebGLTexture2D(texture);
    }
    dispose(): void {
        throw new Error("Method not implemented.");
    }

}