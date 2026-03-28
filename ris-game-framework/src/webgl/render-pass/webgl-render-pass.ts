import { LoadAction, StoreAction } from "../../core/rendering/enums";
import type { RenderPassColorAttachment, RenderPassDepthStencilAttachment, RenderPassDescriptor } from "../../core/rendering/render-pass/render-pass-descriptor";
import type { IRenderPass } from "../../core/rendering/render-pass/render-pass-interface";
import type { WebGLGraphicsDevice } from "../webgl-graphics-device";

export class WebGLRenderPass implements IRenderPass {

    private readonly _graphicsDevice: WebGLGraphicsDevice;
    private readonly _gl: WebGL2RenderingContext;
    private readonly _descriptor: RenderPassDescriptor;

    private _frameBuffer: WebGLFramebuffer | null = null;
    private _clearBufferMask: GLbitfield = 0;
    private _enableDepthTest = false;
    private _enableStencilTest = false;
    private _clearDepth = 0;
    private _clearStencil = 0;
    private _discardAttachments: GLenum[] = [];

    /**
     * The constructor.
     * @param graphicsDevice The graphics device.
     * @param descriptor The render pass descriptor.
     */
    public constructor(graphicsDevice: WebGLGraphicsDevice, descriptor: RenderPassDescriptor) {
        this._graphicsDevice = graphicsDevice;
        this._gl = graphicsDevice.gl;
        this._descriptor = descriptor;


    }

    private _setupFrameBuffer(colorAttachments: RenderPassColorAttachment[]): void {
    }

    private _setupDepthStencilAttachment(depthStencilAttachment?: RenderPassDepthStencilAttachment): void {

        if (!depthStencilAttachment) {
            return;
        }

        // DEPTH
        this._clearDepth = depthStencilAttachment.depthClearValue;
        if (depthStencilAttachment.depthLoadAction == LoadAction.CLEAR) {
            this._clearBufferMask |= this._gl.DEPTH_BUFFER_BIT;
            this._enableDepthTest = true;
        }
        if (depthStencilAttachment.depthStoreAction == StoreAction.DISCARD) {
            this._discardAttachments.push(this._gl.DEPTH_ATTACHMENT);
        }

        // STENCIL
        this._clearStencil = depthStencilAttachment.stencilClearValue;
        if (depthStencilAttachment.stencilLoadAction == LoadAction.CLEAR) {
            this._clearBufferMask |= this._gl.STENCIL_BUFFER_BIT;
            this._enableStencilTest = true;
        }
        if (depthStencilAttachment.stencilStoreAction == StoreAction.DISCARD) {
            this._discardAttachments.push(this._gl.STENCIL_ATTACHMENT);
        }

        // TODO: HANDLE TEXTURE
    }

    /** @inheritdoc */
    public beginPass(): void {
        const gl = this._gl;

        gl.bindFramebuffer(gl.FRAMEBUFFER, this._frameBuffer);

        if (this._enableDepthTest) {
            gl.enable(gl.DEPTH_TEST);
            gl.clearDepth(this._clearDepth);
            gl.depthFunc(gl.LEQUAL);
        } else {
            gl.disable(gl.DEPTH_TEST);
        }

        if (this._enableStencilTest) {
            gl.enable(gl.STENCIL_TEST);
            gl.clearStencil(this._clearStencil);
            gl.stencilFunc(gl.ALWAYS, 0, 0xFF);
        } else {
            gl.disable(gl.STENCIL_TEST);
        }

        // COLOR
        gl.clear(this._clearBufferMask);
    }

    /** @inheritdoc */
    public endPass(): void {

        const gl = this._gl;
        if(this._discardAttachments.length > 0) {
            gl.invalidateFramebuffer(gl.FRAMEBUFFER, this._discardAttachments);
        }
    }
}