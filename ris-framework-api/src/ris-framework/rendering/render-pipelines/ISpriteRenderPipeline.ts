import {IIndexBuffer} from "../buffers/IIndexBuffer";
import {IUniformBuffer} from "../buffers/IUniformBuffer";
import {IVertexBuffer} from "../buffers/IVertexBuffer";
import {ITexture2D} from "../texture/ITexture2D";
import {IDisposable} from "../../core/IDisposable";

/**
 * The pipeline for sprite rendering.
 */
export interface ISpriteRenderPipeline extends IDisposable {

/**
 * The diffuse texture.
 */
  spriteTexture: ITexture2D;

/**
 * The projection view uniform buffer.
 */
  projectionViewBuffer: IUniformBuffer;

/**
 * Draw the pipeline.
 * @param vertexBuffer - The .
 * @param indexBuffer - The .
 * @param indicesCount - The number of indices to draw. If -1 draws all indices.
 * @param indicesOffset - Indices offset. By default, 0 for no offset.
 */
  render(vertexBuffer: IVertexBuffer, indexBuffer: IIndexBuffer, indicesCount: number, indicesOffset: number): void;

}
