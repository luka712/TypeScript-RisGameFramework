import type { IUniformBuffer } from "../buffers/uniform-buffer-interface";
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

    projectionViewBuffer: IUniformBuffer;
}