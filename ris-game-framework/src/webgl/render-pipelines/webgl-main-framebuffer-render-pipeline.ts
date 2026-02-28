import type { IMainFrameBufferRenderPipeline } from "../../core/render-pipelines/main-framebuffer-render-pipeline-interface";
import type { IRenderTarget2D } from "../../render-target/render-target-2d";
import { AWebGLRenderPipeline } from "./a-webgl-render-pipeline";

export class WebGLMainFrameBufferRenderPipeline extends AWebGLRenderPipeline implements IMainFrameBufferRenderPipeline {
    renderTarget: IRenderTarget2D;
    render(): void {
        throw new Error("Method not implemented.");
    }