import { inject, injectable } from "tsyringe";
import type { TempIFramework } from "../../core/framework-interface";
import type { IMainRenderTargetRenderPipeline } from "../../core/render-pipelines/main-render-target-render-pipeline-interface";
import type { IRenderPipelineFactory } from "../../core/render-pipelines/render-pipeline-factory-interface";
import type { ITexture2D } from "../../core/rendering/texture/texture";
import { WebGlMainRenderTargetRenderPipeline } from "./webgl-main-render-target-render-pipeline";
import { IFrameworkSymbol } from "../../core/dependency-injection/register-services-interface";
import type { IUniformBuffer } from "../../core/buffers/uniform-buffer-interface";
import type { ISpriteRenderPipeline } from "../../core/render-pipelines/sprite-render-pipeline";
import { WebGlSpriteRenderPipeline } from "./sprite/webgl-sprite-render-pipeline";

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
    constructor(@inject(IFrameworkSymbol) private readonly _framework: TempIFramework) {
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