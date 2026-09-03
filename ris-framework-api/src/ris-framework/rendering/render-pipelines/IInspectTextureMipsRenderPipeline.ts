import {IDisposable} from "../../core/IDisposable";
import {ITexture2D} from "../texture/ITexture2D";
import {ISampler} from "../sampler/ISampler";
import {IUniformBuffer} from "../buffers/IUniformBuffer";
import {IVertexBuffer} from "../buffers/IVertexBuffer";
import {IIndexBuffer} from "../buffers/IIndexBuffer";

/**
 * The pipeline for inspecting texture mip levels.
 */
export interface IInspectTextureMipsRenderPipeline extends IDisposable {

    /**
     * The diffuse texture.
     */
    spriteTexture: ITexture2D;

    /**
     * The texture sampler.
     */
    textureSampler?: ISampler;

    /**
     * The projection view uniform buffer.
     * Contains a single matrix representing the projection view matrix.
     */
    projectionViewBuffer: IUniformBuffer;

    /**
     * The world matrix uniform buffer.
     * Contains a single matrix representing the world matrix.
     */
    modelBuffer: IUniformBuffer;

    /**
     * The buffer of texture constants.
     * For now, it is just a single float value representing the mip level.
     */
    textureConstantsBuffer: IUniformBuffer;

    /**
     * Draw the pipeline.
     * @param vertexBuffer - The vertex buffer.
     * @param indexBuffer - The index buffer.
     * @param indicesCount - The number of indices to draw. If -1 draws all indices.
     * @param indicesOffset - Indices offset. By default, 0 for no offset.
     */
    render(vertexBuffer: IVertexBuffer, indexBuffer: IIndexBuffer, indicesCount?: number, indicesOffset?: number): void;

}
