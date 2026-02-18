import type { vec2 } from "gl-matrix";
import type { IRenderTarget2D } from "../../render-target/render-target-2d";
import { WebGLRenderTarget2D } from "./webgl-render-target-2d";
import { inject, injectable } from "tsyringe";
import type { IFramework } from "../../core/framework-interface";
import { IFrameworkSymbol } from "../../core/dependency-injection/register-services-interface";
import type { WebGLTexture2D } from "../texture/webgl-texture-2d";

@injectable()
export class WebGLRenderTargetFactory implements IRenderTargetFactory {

  

    /**
     * The constructor for the WebGLRenderTargetFactory class.
     * @param _framework The framework instance.
     */
    constructor(@inject(IFrameworkSymbol) private readonly _framework: IFramework) {

    }

    /** @inheritdoc */
    createRenderTarget2D(renderTargetSize: vec2, depthBufferSize?: vec2, label?: string, depthStencilLabel?: string): IRenderTarget2D {
        const renderTarget2D = new WebGLRenderTarget2D(
            _framework,
            renderTargetSize: renderTargetSize,
            depthBufferSize: depthBufferSize,
            colorAttachmentFormat0: _framework.Renderer.PreferredTextureFormat,
            depthStencilFormat: _framework.Renderer.PreferredDepthStencilFormat,
            depthTextureUsage: TextureUsage.RenderAttachment,
            colorAttachmentLabel: label,
            depthStencilAttachmentLabel: depthStencilLabel);

        renderTarget2D.Initialize();
        return renderTarget2D;
        renderTarget.initialize();
        return renderTarget;
    }
}