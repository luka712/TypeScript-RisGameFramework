import { inject, injectable } from "tsyringe";
import type { IFramework } from "../../core/framework-interface";
import type { IMainRenderTargetRenderPipeline } from "../../core/render-pipelines/main-render-target-render-pipeline-interface";
import type { IRenderPipelineFactory } from "../../core/render-pipelines/render-pipeline-factory-interface";
import type { ITexture2D } from "../../core/rendering/texture/texture";
import { WebGLMainRenderTargetRenderPipeline } from "./webgl-main-render-target-render-pipeline";
import { IFrameworkSymbol } from "../../core/dependency-injection/register-services-interface";

/**
 * The WebGL implementation of the IRenderPipelineFactory interface. 
 * This factory is responsible for creating render pipelines for WebGL rendering.
 */
@injectable()   
export class WebGLRenderPipelineFactory implements IRenderPipelineFactory {

    /**
     * The constructor for the WebGLRenderPipelineFactory class.
     * @param _framework The framework instance.
     */
    constructor(@inject(IFrameworkSymbol) private readonly _framework: IFramework) {
    }


    /** @inheritdoc */
    public createMainRenderTargetRenderPipeline(renderTarget: ITexture2D): IMainRenderTargetRenderPipeline {

        const renderPipeline = new WebGLMainRenderTargetRenderPipeline(this._framework, renderTarget);
        renderPipeline.initialize();
        return renderPipeline;
    }


}