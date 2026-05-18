import type { IIndexBuffer } from "../buffers/index-buffer-interface";
import type { IUniformBuffer } from "../buffers/uniform-buffer-interface";
import type { IVertexBuffer } from "../buffers/vertex-buffer-interface";
import type { ITexture2D } from "../rendering/texture/texture";
import type { IRenderPipeline } from "./render-pipeline-interface";

/**
 * The pipeline for sprite rendering. This pipeline is used for rendering 2D sprites in the game. 
 */
export interface ISpriteRenderPipeline extends IRenderPipeline {

    /**
     * The texture that is used for sprite rendering.
     *  This texture is typically a texture atlas that contains all the sprites that will be rendered using this pipeline.
     */
    spriteTexture: ITexture2D | null;

    /**
     * The projection view buffer that is used for sprite rendering. Tresents a camera transformation.
     */
    projectionViewBuffer: IUniformBuffer;

    /**
     * Draws the sprites using the given vertex buffer and index buffer. 
     * @param vertexBuffer The vertex buffer containing the sprite vertices. The vertex buffer should be in the format of a float3 for the position and a float2 for the texture coordinates, interleaved together.
     * @param indexBuffer The index buffer containing the indices for the sprite vertices. The index buffer should be in the format of uint16 or uint32, depending on the number of vertices.
     * @param indicesCount The number of indices to draw. If not provided, the entire index buffer will be drawn.
     * @param indicesOffset The offset in the index buffer to start drawing from, in bytes. If not provided, drawing will start from the beginning of the index buffer.
     */
    render(vertexBuffer: IVertexBuffer, indexBuffer: IIndexBuffer, indicesCount?: number, indicesOffset?: number): void;
}