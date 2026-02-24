import type { IDisposable } from "../common/disposable";
import type { TextureFormat } from "../common/texture-enums";
import type { WebGLTexture2D } from "../webgl/texture/webgl-texture-2d";

/**
 * This file defines the IRenderTarget2D interface, which represents a 2D render target in the rendering system. 
 * A render target is a texture or buffer that can be rendered to, allowing for off-screen rendering and post-processing effects.
 * The IRenderTarget2D interface may include properties and methods for managing the render target, such as its dimensions, format, and methods for binding and unbinding it for rendering.
 * This interface is essential for implementing features like render-to-texture, where the output of a rendering pass can be used as an input for subsequent passes, enabling effects like reflections, shadows, and post-processing.
 */
export interface IRenderTarget2D extends IDisposable {

    /**
     * The width of the render target in pixels.
     */
    width: number;

    /**
     * The height of the render target in pixels.
     */
    height: number;

    /**
     * The label of the color attachment 0.
     */
    colorAttachment0Label: string | null | undefined;

    /**
     * The format of the color attachment 0.
     */
    colorAttachment0Format: TextureFormat;

    /**
     * The label of the depth stencil attachment.
     */
    depthStencilLabel : string | null | undefined;

    /**
     * The WebGL texture attachment for d
     */
    depthStencilTextureAttachment?: WebGLTexture2D;

/**
 * Initializes the render target, creating necessary resources and setting up the rendering context.
 */
initialize(): void;
}