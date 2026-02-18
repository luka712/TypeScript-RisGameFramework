import type { DependencyContainer } from "tsyringe";
import { IRendererSymbol, IRenderTargetFactorySymbol, ITextureFactorySymbol, type IRegisterServices } from "../core/dependency-injection/register-services-interface";
import { WebGLRenderer } from "./webgl-renderer";
import { WebGLRenderTargetFactory } from "./render-target/webgl-render-target-factory";
import { WebGLTextureFactory } from "./texture/webgl-texture-factory";

export class WebGLRegisterServices implements IRegisterServices {

    /** @inheritdoc */
    register(container: DependencyContainer): void {
        container.registerSingleton(IRendererSymbol, WebGLRenderer);
        container.registerSingleton(IRenderTargetFactorySymbol, WebGLRenderTargetFactory);
        container.registerSingleton(ITextureFactorySymbol, WebGLTextureFactory);
    }
}