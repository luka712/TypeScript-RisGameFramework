import type { Color } from "../math/color";

/**
 * The interface for renderers.
 */
export interface IRenderer {

    /**
     * The clear color used by the renderer.
     */
    clearColor: Color

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