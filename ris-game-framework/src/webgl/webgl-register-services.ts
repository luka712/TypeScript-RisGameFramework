import type { DependencyContainer } from "tsyringe";
import { IBuffersFactorySymbol, ITextureFactorySymbol, type IRegisterServices } from "../core/dependency-injection/register-services-interface";
import { WebGLTextureFactory } from "./texture/webgl-texture-factory";
import { WebGLBuffersFactory } from "./buffers/WebGLBuffersFactory.ts";
import { IRenderPipelineFactorySymbol } from "../core/render-pipelines/render-pipeline-factory-interface";
import { WebGlRenderPipelineFactory } from "./render-pipelines/webgl-render-pipeline-factory";
import { IContentModuleSymbol } from '../core/content/content-module-interface';
import { WebGLShaderContentModule } from "./shader/webgl-shader-content-module";

export class WebGLRegisterServices implements IRegisterServices {

    /** @inheritdoc */
    public register(container: DependencyContainer): void {
        container.registerSingleton(ITextureFactorySymbol, WebGLTextureFactory);
        container.registerSingleton(IBuffersFactorySymbol, WebGLBuffersFactory);
        container.registerSingleton(IRenderPipelineFactorySymbol, WebGlRenderPipelineFactory);
        container.registerSingleton(IContentModuleSymbol, WebGLShaderContentModule);
    }
}