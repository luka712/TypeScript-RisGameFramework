import {IBlendState} from "../blending/IBlendState";
import {IDisposable} from "../../core/IDisposable";
import {IPrimitiveState} from "../primitive/IPrimitiveState";
import {IVertexBufferLayout} from "../buffers/IVertexBufferLayout";


/**
 * The render pipeline interface.
 *     Render pipelines are responsible for defining the rendering process, including the shaders,
 *     the vertex buffer layout, the render targets, and the draw calls.
 */
export interface IRenderPipeline extends IDisposable {

/**
 * The blend state of the render pipeline.
 */
  readonly blendState: IBlendState;

/**
 * The primitive state of the render pipeline.
 */
  readonly primitiveState: IPrimitiveState;

/**
 * The vertex buffer layout of the render pipeline.
 */
  readonly vertexBufferLayouts: IVertexBufferLayout[];

/**
 * Initializes the render pipeline.
 *     This method is called by the renderer when the pipeline is added to the renderer.
 */
  initialize(): void;

}
