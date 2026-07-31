import type { DependencyContainer } from "tsyringe";
import { type IRegisterServices } from "../core/dependency-injection/register-services-interface";
import { IRenderPipelineFactorySymbol } from "../core/render-pipelines/render-pipeline-factory-interface";
import { WebGlRenderPipelineFactory } from "./render-pipelines/webgl-render-pipeline-factory";

export class WebGLRegisterServices implements IRegisterServices {

    /** @inheritdoc */
    public register(container: DependencyContainer): void {
        container.registerSingleton(IRenderPipelineFactorySymbol, WebGlRenderPipelineFactory);
    }
}