import type { DependencyContainer } from "tsyringe";
import { IBuffersFactorySymbol, ITextureFactorySymbol, type IRegisterServices } from "../core/dependency-injection/register-services-interface";
import { WebGLTextureFactory } from "./texture/webgl-texture-factory";
import { WebGlBuffersFactory } from "./buffers/WebGlBuffersFactory.ts";
import { IRenderPipelineFactorySymbol } from "../core/render-pipelines/render-pipeline-factory-interface";
import { WebGlRenderPipelineFactory } from "./render-pipelines/webgl-render-pipeline-factory";

export class WebGLRegisterServices implements IRegisterServices {

    /** @inheritdoc */
    public register(container: DependencyContainer): void {
        container.registerSingleton(ITextureFactorySymbol, WebGLTextureFactory);
        container.registerSingleton(IBuffersFactorySymbol, WebGlBuffersFactory);
        container.registerSingleton(IRenderPipelineFactorySymbol, WebGlRenderPipelineFactory);
    }
}