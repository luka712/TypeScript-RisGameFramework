import type { ITexture2D } from "../rendering/texture/texture";
import type { IRenderPipeline } from "./render-pipeline-interface";

/**
 * The interface for the main frame buffer render pipeline. 
 * This is used to render the main frame buffer. 
 * The main frame buffer is the default render target that is presented to the screen.
 * It is also used as the default render target for all rendering operations if no other render target is specified.
 */
export interface IMainRenderTargetRenderPipeline extends IRenderPipeline {
    /**
     * The main render target.
     */
    mainRenderTarget: ITexture2D;

    /**
     * Render the main frame buffer.
     * This should be called after all render targets have been rendered to and before the main frame buffer is presented to the screen.
     */
    render(): void;
}