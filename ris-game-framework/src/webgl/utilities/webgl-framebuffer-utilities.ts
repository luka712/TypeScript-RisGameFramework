import type { vec2 } from "gl-matrix";


/**
 * This file defines the WebGLFrameBufferUtilities class, which provides utility functions for working with WebGL framebuffers.
 * The WebGLFrameBufferUtilities class includes methods for creating framebuffers with specific configurations, such as attaching textures as color and depth attachments.
 * These utilities simplify the process of setting up framebuffers for rendering to textures, which is a common technique in graphics programming for effects like render-to-texture, post-processing, and off-screen rendering.
 */
export class WebGLFrameBufferUtilities {

       /// <summary>
   /// Creates a framebuffer with texture being attached as color attachment 0.
   /// </summary>
   /// <param name="gl">The <see cref="GL"/>.</param>
   /// <param name="textureId">The attachment texture.</param>
   /// <param name="framebufferLabel">The framebuffer label.</param>
   /// <returns>The framebuffer id.</returns>
   /// <exception cref="InvalidOperationException">If framebuffer is not complete.</exception>
   public create(gl: WebGL2RenderingContext, textureId: WebGLTexture, framebufferLabel: string | null = null): WebGLFramebuffer {
       const framebuffer = gl.createFramebuffer();
       gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);

       // -- LABEL FRAMEBUFFER
       if (framebufferLabel) {
              // @ts-ignore
                framebuffer.__SPECTOR_Metadata = {
                    name: framebufferLabel,
                };
       }

       
       // Bind the texture to the framebuffer, so we can render to it.
       gl.bindTexture(gl.TEXTURE_2D, textureId);

       // Connect the texture to the framebuffer.
       gl.framebufferTexture2D(gl.FRAMEBUFFER,
           gl.COLOR_ATTACHMENT0,
           gl.TEXTURE_2D,
           textureId,
           0);

       // Check if the framebuffer is complete.
       if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) != gl.FRAMEBUFFER_COMPLETE) {
           throw new Error("Framebuffer is not complete.");
       }

       return framebuffer;
   }

    /**
     * Creates a framebuffer with texture being attached as color attachment 0 and depth render buffer.
     * @param gl The WebGL2 rendering context.
     * @param textureAttachment0 The texture to be attached as color attachment 0.
     * @param depthAttachmentType The type of the depth attachment, which can be DepthAttachment, DepthStencilAttachment or StencilAttachment.
     * @param depthStencilRenderBuffer The render buffer to be attached as the depth/stencil attachment.
     * @param label An optional label for the framebuffer, which can be used for debugging purposes.
     * @return The created framebuffer.
     */
    public createWithRenderBufferAsDepthBuffer(gl: WebGL2RenderingContext,
        textureAttachment0: WebGLTexture,
        depthAttachmentType: GLenum,
        depthStencilRenderBuffer: WebGLRenderbuffer, label: string | null | undefined): WebGLFramebuffer {

        if (depthAttachmentType != gl.DEPTH_ATTACHMENT
            && depthAttachmentType != gl.DEPTH_STENCIL_ATTACHMENT
            && depthAttachmentType != gl.STENCIL_ATTACHMENT) {
            const msg = "Invalid depth attachment type + " + depthAttachmentType;
            throw new Error(msg);
        }

        const framebuffer = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);

        // Connect the texture to the framebuffer.
        gl.framebufferTexture2D(gl.FRAMEBUFFER,
            gl.COLOR_ATTACHMENT0,
            gl.TEXTURE_2D,
            textureAttachment0,
            0);

        // Connect the render buffer to the framebuffer.
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER,
            depthAttachmentType,
            gl.RENDERBUFFER,
            depthStencilRenderBuffer);

        // Check if the framebuffer is complete.
        if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) != gl.FRAMEBUFFER_COMPLETE) {
            const msg = "Framebuffer is not complete.";
            throw new Error(msg);
        }

        if (label) {
            // @ts-ignore
            framebuffer.__SPECTOR_Metadata = {
                name: label,
            };
        }

        return framebuffer;
    }

    /**
     * Creates a framebuffer with texture being attached as color attachment 0 and depth render buffer.
     * @param gl The WebGL2 rendering context.
     * @param textureAttachment0 The texture to be attached as color attachment 0.
     * @param depthAttachmentType The type of the depth attachment, which can be DepthAttachment, DepthStencilAttachment or StencilAttachment.
     * @param depthStencilTexture The texture to be attached as the depth/stencil attachment.
     * @param label An optional label for the framebuffer, which can be used for debugging purposes.
     * @returns The created framebuffer.
     */
    public createWithRenderTextureAsDepthBuffer(gl: WebGL2RenderingContext,
        textureAttachment0: WebGLTexture,
        depthAttachmentType: GLenum,
        depthStencilTexture: WebGLTexture,
        label?: string): WebGLFramebuffer {
        if (depthAttachmentType != gl.DEPTH_ATTACHMENT
            && depthAttachmentType != gl.DEPTH_STENCIL_ATTACHMENT
            && depthAttachmentType != gl.STENCIL_ATTACHMENT) {
            const msg = "Invalid depth attachment type.";
            throw new Error(msg);
        }

        const framebuffer = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);

        // Connect the texture to the framebuffer.
        gl.framebufferTexture2D(gl.FRAMEBUFFER,
            gl.COLOR_ATTACHMENT0,
            gl.TEXTURE_2D,
            textureAttachment0,
            0);

        // Connect the render buffer to the framebuffer.
        gl.framebufferTexture2D(gl.FRAMEBUFFER,
            depthAttachmentType,
            gl.TEXTURE_2D,
            depthStencilTexture,
            0);

        // Check if the framebuffer is complete.
        if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) != gl.FRAMEBUFFER_COMPLETE) {
            const msg = "Framebuffer is not complete.";
            throw new Error(msg);
        }

        if (label) {

            // @ts-ignore
            framebuffer.__SPECTOR_Metadata = {
                name: label,
            };
        }


        return framebuffer;
    }


}
