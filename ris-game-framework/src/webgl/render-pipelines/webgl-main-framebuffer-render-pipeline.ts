import type { IMainFrameBufferRenderPipeline } from "../../core/render-pipelines/main-framebuffer-render-pipeline-interface";
import type { IRenderTarget2D } from "../../render-target/render-target-2d";
import type { WebGLVertexBuffer } from "../buffers/webgl-vertex-buffer";
import { AWebGLRenderPipeline } from "./a-webgl-render-pipeline";

export class WebGLMainFrameBufferRenderPipeline extends AWebGLRenderPipeline implements IMainFrameBufferRenderPipeline {
   
    private _renderTarget: IRenderTarget2D | undefined;
    public get renderTarget(): IRenderTarget2D {
        if (!this._renderTarget) {
            throw new Error("Render target is not set.");
        }
        return this._renderTarget;
    }
   
    renderTarget: IRenderTarget2D | undefined;
    render(): void {
        throw new Error("Method not implemented.");
    }
   
    private _program : WebGLProgram | null = null;
    private _vertexBuffer: WebGLVertexBuffer | null = null;
 
}