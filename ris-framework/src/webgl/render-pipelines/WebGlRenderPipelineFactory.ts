import { inject, injectable } from "tsyringe";
import { WebGlMainRenderTargetRenderPipeline } from "./WebGlMainRenderTargetRenderPipeline.ts";
import { IFrameworkSymbol } from "../../core/dependency-injection/register-services-interface";
import { WebGlSpriteRenderPipeline } from "./sprite/WebGlSpriteRenderPipeline.ts";
import type {
    IFramework,
    IInspectTextureMipsRenderPipeline,
    IMainRenderTargetRenderPipeline, IRenderPipelineFactory,
    ISpriteRenderPipeline, ITexture2D,
    IUniformBuffer
} from "ris-framework-api";
import {WebGlInspectTextureMipsRenderPipeline} from "./inspect/WebGlInspectTextureMipsRenderPipeline.ts";

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

    /** @inheritDoc */
    public createMainFrameBufferPipeline(mainFrameBuffer: ITexture2D): IMainRenderTargetRenderPipeline {
        const renderPipeline = new WebGlMainRenderTargetRenderPipeline(this._framework, mainFrameBuffer);
        renderPipeline.initialize();
        return renderPipeline;
    }

    /** @inheritDoc */
    public createInspectTextureMipsRenderPipeline(projectionViewBuffer: IUniformBuffer, modelBuffer: IUniformBuffer, textureConstantsBuffer: IUniformBuffer): IInspectTextureMipsRenderPipeline {
        const pipeline = new WebGlInspectTextureMipsRenderPipeline(
            this._framework, projectionViewBuffer, modelBuffer, textureConstantsBuffer
        );
        pipeline.initialize();
        return pipeline;
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