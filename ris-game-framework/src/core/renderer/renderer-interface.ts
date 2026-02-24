import { vec2 } from "gl-matrix";
import type { TextureFormat } from "../../common/texture-enums";
import type { Color } from "../math/color";
import type { RenderingLimits } from "./RenderingLimits";

export const RenderConfigurationSymbol = Symbol("RenderConfiguration");

/**
 * The configuration for the renderer. This is used to initialize the renderer.
 */
export class RenderConfiguration {
 
    /**
     * The size of the main frame buffer. This is used to initialize the main render target.
     */
    frameBufferSize: vec2 = vec2.fromValues(800, 600);
}

/**
 * The interface for renderers.
 */
export interface IRenderer {

    /**
     * The clear color used by the renderer.
     */
    clearColor: Color

    /**
     * The rendering limits of the renderer.
     */
    limits: RenderingLimits | null;

    /**
     * The preferred texture format for the renderer.
     * @returns The preferred texture format for the renderer.
     */
    get preferredTextureFormat(): TextureFormat;

    /**
     * The preferred depth stencil format for the renderer.
     * @returns The preferred depth stencil format for the renderer.
     */
    get preferredDepthStencilFormat(): TextureFormat;

    /**
     * Initializes the renderer.
     */
    initialize(): void;

    /**
     * Begins a new render pass.
     */
    beginRenderPass(): void;

    /**
     * Ends the current render pass.
     */
    endRenderPass(): void;
}