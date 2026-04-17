import type { IDisposable } from "../../common/disposable";
import type { IBlendState } from "../rendering/blending/blend-state-interface";
import type { VertexBufferLayout } from "../rendering/vertex-buffer-layout";

/**
 * The interface for a render pipeline. A render pipeline defines the rendering process, including the vertex buffer layouts and the rendering steps.
 */
export interface IRenderPipeline extends IDisposable{

    /**
     * The blend state used by the render pipeline. This defines how the output of the fragment shader is blended with the existing color in the render target.
     */
    readonly blendState: IBlendState;

    /**
     * The vertex buffer layouts used by the render pipeline.
     */
    readonly vertexBufferLayouts: VertexBufferLayout[];

    /**
     * Initializes the render pipeline. This should be called before rendering with the pipeline.
     */
    initialize(): void;
}