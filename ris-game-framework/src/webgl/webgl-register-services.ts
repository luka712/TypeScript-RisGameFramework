import type { DependencyContainer } from "tsyringe";
import { IBuffersFactorySymbol, IRendererSymbol, ITextureFactorySymbol, type IRegisterServices } from "../core/dependency-injection/register-services-interface";
import { WebGLRenderer } from "./webgl-renderer";
import { WebGLTextureFactory } from "./texture/webgl-texture-factory";
import { WebGLBuffersFactory } from "./buffers/webgl-buffers-factory";
import { IRenderPipelineFactorySymbol } from "../core/render-pipelines/render-pipeline-factory-interface";
import { WebGLRenderPipelineFactory } from "./render-pipelines/webgl-render-pipeline-factory";

export class WebGLRegisterServices implements IRegisterServices {

    /** @inheritdoc */
    register(container: DependencyContainer): void {
        container.registerSingleton(IRendererSymbol, WebGLRenderer);
        container.registerSingleton(ITextureFactorySymbol, WebGLTextureFactory);
        container.registerSingleton(IBuffersFactorySymbol, WebGLBuffersFactory);
        container.registerSingleton(IRenderPipelineFactorySymbol, WebGLRenderPipelineFactory);
    }
}