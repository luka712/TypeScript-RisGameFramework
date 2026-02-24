import type { vec2 } from "gl-matrix";
import { TextureFormat, TextureUsage } from "../../common/texture-enums";
import type { IFramework } from "../../core/framework-interface";
import type { IRenderTarget2D } from "../../render-target/render-target-2d";
import { asWebGLRenderer, asWebGLTexture2D } from '../cast/cast';
import type { WebGLTexture2D } from "../texture/webgl-texture-2d";
import { Color } from "../../core/math/color";
import { SamplerCompareFunction, SamplerMagFilter, SamplerMinFilter } from "../../common/sampler-enums";
import { WebGLUtilities } from "../utilities/webgl-utilities";

export class WebGLRenderTarget2D implements IRenderTarget2D {

    private readonly _gl: WebGL2RenderingContext;

    protected _textureAttachment0: WebGLTexture2D = null!;
    protected _depthStencilTexture?: WebGLTexture2D;

    /**
     * It will exist if depthStencilTexture is not used.
     * It is faster than using texture, but cannot be used as texture binding.
     */
    protected _depthRenderBuffer: WebGLRenderbuffer = null!;

    /**
     *It will be set if texture is used as depth/stencil attachment.
     * It won't be used if depthRenderBuffer is used as depth/stencil attachment.
     */
    protected _depthStencilTextureAttachment: GLenum = 0;

    /**
     * It will be set if depthRenderBuffer is used as depth/stencil attachment.
     *It won't be used if depthStencilTexture is used as depth/stencil attachment.
    */
    protected _depthStencilFrameBufferAttachment: GLenum = 0;

    /**
     * The clear mask for the underlying frame buffer.
     */
    protected _clearMask: GLenum = 0;

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
        private readonly _depthBufferSize: vec2 | null = null,
        private readonly _colorAttachmentFormat0 = TextureFormat.Undefined,
        private readonly _depthStencilFormat = TextureFormat.Undefined,
        private readonly _depthTextureUsage = TextureUsage.RenderAttachment,
        private readonly _colorAttachment0Label: string | null | undefined = undefined,
        private readonly _depthStencilAttachmentLabel: string | null | undefined = undefined
    ) {
        this._gl = asWebGLRenderer(_framework.renderer).gl!;
        this._clearMask = this._gl.COLOR_BUFFER_BIT;
    }

    /**
     * The WebGL framebuffer object that represents the render target. 
     * This framebuffer will have the color and depth/stencil attachments configured according to the properties of the render target.
     */
    public framebuffer: WebGLFramebuffer = null!;

    public get colorAttachment0Format(): TextureFormat {
        return this._colorAttachmentFormat0;
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
    public get colorAttachment0Label(): string | null | undefined {
        return this._colorAttachment0Label;
    }

    /** @inheritdoc */
    public get depthStencilLabel(): string | null | undefined {
        return this._depthStencilAttachmentLabel;
    }

    private _resolveAttachmentAndClearMask() {
        // Depth only.
        if (this._depthStencilFormat == TextureFormat.Depth_32_Float) {
            if (this._depthTextureUsage == TextureUsage.CopyDst_TextureBinding || this._depthTextureUsage == TextureUsage.CopyDst_TextureBinding_RenderTarget) {
                this._depthStencilTextureAttachment = this._gl.DEPTH_ATTACHMENT;
            }
            else {
                this._depthStencilFrameBufferAttachment = this._gl.DEPTH_ATTACHMENT;
            }
            this._clearMask |= this._gl.DEPTH_BUFFER_BIT;
        }
        // Depth and stencil.
        else {
            if (this._depthTextureUsage == TextureUsage.CopyDst_TextureBinding || this._depthTextureUsage == TextureUsage.CopyDst_TextureBinding_RenderTarget) {
                this._depthStencilTextureAttachment = this._gl.DEPTH_STENCIL_ATTACHMENT;
            }
            else {
                this._depthStencilFrameBufferAttachment = this._gl.DEPTH_STENCIL_ATTACHMENT;
            }
            this._clearMask |= this._gl.STENCIL_BUFFER_BIT;
        }
    }

    /** @inheritdoc */
    public initialize(): void {

        const texture = this._framework.textureFactory
            .createEmpty(
                this._renderTargetSize[0], this._renderTargetSize[1],
                Color.black(), 
                SamplerMinFilter.Linear, SamplerMagFilter.Linear,
                TextureUsage.TextureBinding_RenderTarget,
                this._colorAttachmentFormat0,
                SamplerCompareFunction.Never,
                this._colorAttachment0Label,
                false
            );

        this._textureAttachment0 = asWebGLTexture2D(texture);

        // Should we have depth buffer?
        if (this._depthBufferSize) {
            this._resolveAttachmentAndClearMask();

            // Now based on format, we can decide to create a texture or render buffer.
            // Render buffer is faster but cannot be used as texture binding.
            // If any of texture usages are TextureBinding, we must use texture.
            if (this._depthTextureUsage == TextureUsage.CopyDst_TextureBinding
                || this._depthTextureUsage == TextureUsage.CopyDst_TextureBinding_RenderTarget) {
                this._depthStencilTexture = asWebGLTexture2D(this._framework.textureFactory.createEmpty(
                    this._depthBufferSize[0], this._depthBufferSize[1],
                    Color.black(),
                    SamplerMinFilter.Linear, SamplerMagFilter.Linear,
                    this._depthTextureUsage, this._depthStencilFormat,
                    SamplerCompareFunction.LessEqual,
                    this._depthStencilAttachmentLabel,
                    false));

                this.framebuffer = WebGLUtilities.framebuffer.createWithRenderTextureAsDepthBuffer(
                    this._gl,
                    this._textureAttachment0.texture,
                    this._depthStencilTextureAttachment,
                    this._depthStencilTexture.texture);
            }
            else {
                // We can have render buffer instead.
                this._depthRenderBuffer = WebGLUtilities.renderbuffer.create(
                    this._gl,
                    this._depthStencilFormat,
                    this._depthBufferSize[0], this._depthBufferSize[1],
                    this._depthStencilAttachmentLabel);

                this.framebuffer = WebGLUtilities.framebuffer.createWithRenderBufferAsDepthBuffer(
                    this._gl,
                    this._textureAttachment0.texture,
                    this._depthStencilFrameBufferAttachment,
                    this._depthRenderBuffer,
                    undefined);
            }



        }
        // Without depth buffer.
        else {
            // Create a framebuffer with texture being attached as color attachment 0.
            this.framebuffer = WebGLUtilities.framebuffer.create(this._gl, this._textureAttachment0.texture);
        }

    }

    /** @inheritdoc */
    public dispose(): void {
        if (this.framebuffer) {
            this._gl.deleteFramebuffer(this.framebuffer);
            this.framebuffer = null!;
        }
        if (this._depthStencilTexture) {
            this._depthStencilTexture.dispose();
            this._depthStencilTexture = undefined;
        }
        if (this._depthRenderBuffer) {
            this._gl.deleteRenderbuffer(this._depthRenderBuffer);
            this._depthRenderBuffer = null!;
        }
        if (this._textureAttachment0) {
            this._textureAttachment0.dispose();
            this._textureAttachment0 = null!;
        }
    }

}