import type { vec2 } from "gl-matrix";
import type { IRenderTarget2D } from "./render-target-2d";

export interface IRenderTargetFactory {

    /**
     * Creates a 2D render target with the specified size and optional depth buffer size and labels.
     * @param renderTargetSize The size of the render target in pixels.
     * @param depthBufferSize The optional size of the depth buffer in pixels. If not provided, depth buffer will not be created.
     * @param label The optional label for the render target, which can be used for debugging and profiling purposes.
     * @param depthStencilLabel The optional label for the depth stencil buffer, which can be used for debugging and profiling purposes.
     */
    createRenderTarget2D(renderTargetSize: vec2, depthBufferSize?: vec2, label?: string, depthStencilLabel?: string): IRenderTarget2D;

}