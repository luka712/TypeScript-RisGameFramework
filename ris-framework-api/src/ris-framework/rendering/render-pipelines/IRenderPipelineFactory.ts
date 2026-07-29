import {ITexture2D} from "../texture/ITexture2D";
import {IMainRenderTargetRenderPipeline} from "./IMainRenderTargetRenderPipeline";
import {IUniformBuffer} from "../buffers/IUniformBuffer";
import {ISpriteRenderPipeline} from "./ISpriteRenderPipeline";

/**
 * The pipeline factory.
 */
export interface IRenderPipelineFactory {

/**
 * Creates the .
 * @param mainFrameBuffer - The  acting as a main frame buffer.
 * @returns The .
 */
  createMainFrameBufferPipeline(mainFrameBuffer: ITexture2D): IMainRenderTargetRenderPipeline;

/**
 * Creates the .
 * @param projectionViewBuffer - The projection view .
 * @returns The .
 */
  createSpriteRenderPipeline(projectionViewBuffer: IUniformBuffer): ISpriteRenderPipeline;

}
