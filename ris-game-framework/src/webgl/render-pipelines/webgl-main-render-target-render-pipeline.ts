import { vec2 } from "gl-matrix";
import type { IFramework } from "../../core/framework-interface";
import type { IMainRenderTargetRenderPipeline } from "../../core/render-pipelines/main-render-target-render-pipeline-interface";
import type { WebGLVertexBuffer } from "../buffers/webgl-vertex-buffer";
import { AWebGLRenderPipeline } from "./a-webgl-render-pipeline";
import { GeometryFormat } from "../../core/geometry/geometry-format";
import { BufferUsage } from "../../core/rendering/enums";
import { asWebGLIndexBuffer, asWebGLVertexBuffer } from "../cast/cast";
import type { WebGLIndexBuffer } from "../buffers/webgl-index-buffer";
import { VertexBufferLayout } from "../../core/rendering/vertex-buffer-layout";
import type { ITexture2D } from "../../core/rendering/texture/texture";

export class WebGLMainRenderTargetRenderPipeline extends AWebGLRenderPipeline implements IMainRenderTargetRenderPipeline {

    private _vertexBuffer: WebGLVertexBuffer = null!;
    private _indexBuffer: WebGLIndexBuffer = null!;

    private _mainRenderTarget: ITexture2D | undefined;

    constructor(framework: IFramework, mainRenderTarget: ITexture2D) {
        super(framework);
        this._mainRenderTarget = mainRenderTarget;
        this._createResources();
        this._vertexBufferLayouts = [VertexBufferLayout.createFloat3Float2Layout()];

    }

    /** @inheritdoc */
    protected _provideBuffers(): WebGLBuffer[] {
        return [this._vertexBuffer.buffer!];
    }

    render(): void {
        throw new Error("Method not implemented.");
    }

    public get mainRenderTarget(): ITexture2D {
        if (!this._mainRenderTarget) {
            throw new Error("Render target is not set.");
        }
        return this._mainRenderTarget;
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
            BufferUsage.VERTEX,
            "Main Frame Buffer Render Pipeline Vertex Buffer"
        ));

        this._indexBuffer = asWebGLIndexBuffer(this._framework.buffersFactory.createIndexBuffer(
            geometry.indices!, "Main Frame Buffer Render Pipeline Index Buffer",
        ));
    }

}
