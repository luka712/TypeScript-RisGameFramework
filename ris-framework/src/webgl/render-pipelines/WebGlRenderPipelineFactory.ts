import { inject, injectable } from "tsyringe";
import type { IRenderPipelineFactory } from "../../core/render-pipelines/render-pipeline-factory-interface";
import { WebGlMainRenderTargetRenderPipeline } from "./WebGlMainRenderTargetRenderPipeline.ts";
import { IFrameworkSymbol } from "../../core/dependency-injection/register-services-interface";
import { WebGlSpriteRenderPipeline } from "./sprite/WebGlSpriteRenderPipeline.ts";
import type {
    IFramework,
    IMainRenderTargetRenderPipeline,
    ISpriteRenderPipeline, ITexture2D,
    IUniformBuffer
} from "ris-framework-api";

/**
 * The WebGL implementation of the IRenderPipelineFactory interface. 
 * This factory is responsible for creating render pipelines for WebGL rendering.
 */
@injectable()
export class WebGlRenderPipelineFactory implements IRenderPipelineFactory {

    /**
     * The constructor for the WebGLRenderPipelineFactory class.
     * @param _framework The framework instance.
     */
    constructor(@inject(IFrameworkSymbol) private readonly _framework: IFramework) {
    }

    /** @inheritdoc */
    public createSpriteRenderPipeline(projectionViewBuffer: IUniformBuffer): ISpriteRenderPipeline {
        const renderPipeline = new WebGlSpriteRenderPipeline(this._framework, projectionViewBuffer);
        renderPipeline.initialize();
        return renderPipeline;
    }

    /** @inheritdoc */
    public createMainRenderTargetRenderPipeline(renderTarget: ITexture2D): IMainRenderTargetRenderPipeline {

        const renderPipeline = new WebGlMainRenderTargetRenderPipeline(this._framework, renderTarget);
        renderPipeline.initialize();
        return renderPipeline;
    }
}