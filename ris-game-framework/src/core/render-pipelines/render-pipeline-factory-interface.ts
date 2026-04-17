import type { ITexture2D } from '../rendering/texture/texture';
import type { IMainRenderTargetRenderPipeline } from './main-render-target-render-pipeline-interface';

export const IRenderPipelineFactorySymbol = Symbol("IRenderPipelineFactory");

/**
 * The interface for the render pipeline factory. 
 * This factory is responsible for creating render pipelines, which define the rendering process and the resources used in rendering.
 */
export interface IRenderPipelineFactory {
    /**
     * Creates a render pipeline for the main frame buffer.
     * @param renderTarget The render target that will be used for the main frame buffer. This is typically the back buffer of the swap chain.
     * @returns An instance of MainRenderTargetRenderPipelineInterface that represents the created render pipeline for the main frame buffer.
     */
    createMainRenderTargetRenderPipeline(renderTarget: ITexture2D): IMainRenderTargetRenderPipeline;
}