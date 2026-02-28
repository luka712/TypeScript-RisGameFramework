import type { IDisposable } from "../../common/disposable";
import type { AVertexBufferLayout } from "../rendering/a-vertex-buffer-layout";

/**
 * The interface for a render pipeline. A render pipeline defines the rendering process, including the vertex buffer layouts and the rendering steps.
 */
export interface IRenderPipeline extends IDisposable{

    /**
     * The vertex buffer layouts used by the render pipeline.
     */
    vertexBufferLayouts: AVertexBufferLayout[];

    /**
     * Initializes the render pipeline. This should be called before rendering with the pipeline.
     */
    initialize(): void;
}