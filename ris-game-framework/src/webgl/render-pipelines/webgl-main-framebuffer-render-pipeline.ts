import { vec2 } from "gl-matrix";
import type { IFramework } from "../../core/framework-interface";
import type { IMainFrameBufferRenderPipeline } from "../../core/render-pipelines/main-framebuffer-render-pipeline-interface";
import type { WebGLVertexBuffer } from "../buffers/webgl-vertex-buffer";
import { AWebGLRenderPipeline } from "./a-webgl-render-pipeline";
import { GeometryFormat } from "../../core/geometry/geometry-format";
import { BufferUsage } from "../../core/rendering/enums";
import { asWebGLIndexBuffer, asWebGLVertexBuffer } from "../cast/cast";
import type { WebGLIndexBuffer } from "../buffers/webgl-index-buffer";
import type { IRenderTarget2D } from "../../core/render-target/render-target-2d";
import { AVertexBufferLayout } from "../../core/rendering/a-vertex-buffer-layout";

export class WebGLMainFrameBufferRenderPipeline extends AWebGLRenderPipeline implements IMainFrameBufferRenderPipeline {

    private _vertexBuffer: WebGLVertexBuffer = null!;
    private _indexBuffer: WebGLIndexBuffer = null!;

    private _renderTarget: IRenderTarget2D | undefined;

    constructor(framework: IFramework) {
        super(framework);

        this._createResources();
        this.vertexBufferLayouts = [AVertexBufferLayout.CreateFloat3Float2Layout()];

    }

    public get renderTarget(): IRenderTarget2D {
        if (!this._renderTarget) {
            throw new Error("Render target is not set.");
        }
        return this._renderTarget;
    }

    private _createResources(): void {

        // By default, quad is from [-0.5, 0.5] space. We want to move it to
        // [-1, 1] space to cover the whole screen.
        var geometry = this._framework.geometryBuilder.quadGeometry(vec2.fromValues(2, 2));
        const data = geometry.toInterleaved(GeometryFormat.Pos3_TextureCoords2);

        this._vertexBuffer = asWebGLVertexBuffer(this._framework.buffersFactory.createVertexBuffer(
            data,
            (3 + 2) * Float32Array.BYTES_PER_ELEMENT,
            4,
            BufferUsage.Vertex,
            "Main Frame Buffer Render Pipeline Vertex Buffer"
        ));

        this._indexBuffer = asWebGLIndexBuffer(this._framework.buffersFactory.createIndexBuffer(
            geometry.indices!, "Main Frame Buffer Render Pipeline Index Buffer",
         ));
    }

}
