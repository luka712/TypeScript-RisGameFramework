import type { Color } from "../math/color";
import type { RenderingLimits } from "./RenderingLimits";

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