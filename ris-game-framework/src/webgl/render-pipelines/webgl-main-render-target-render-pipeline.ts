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
import type { WebGLTexture2D } from "../texture/webgl-texture-2d";
import { WebGLShaderModule } from "../shader/webgl-shader-module";

/**
 * The WebGL implementation of the main render target render pipeline. 
 */
export class WebGLMainRenderTargetRenderPipeline extends AWebGLRenderPipeline implements IMainRenderTargetRenderPipeline {

    private _program: WebGLProgram = null!;
    private _vertexBuffer: WebGLVertexBuffer = null!;
    private _indexBuffer: WebGLIndexBuffer = null!;
    private _mainRenderTarget: WebGLTexture2D = null!;


    /**
     * The constructor.
     * @param framework The framework. 
     * @param mainRenderTarget The main render target texture. This is the texture that will be rendered to by this render pipeline. It should be the same texture as the one used in the swap chain's render pass descriptor for the main render target.
     */
    public constructor(framework: IFramework, mainRenderTarget: ITexture2D) {
        super(framework);
        this._mainRenderTarget = mainRenderTarget as WebGLTexture2D;
    }

    /** @inheritdoc */
    protected _provideBuffers(): WebGLBuffer[] {
        return [this._vertexBuffer.buffer!];
    }

    /** @inheritdoc */
    public get mainRenderTarget(): ITexture2D {
        if (!this._mainRenderTarget) {
            throw new Error("Render target is not set.");
        }
        return this._mainRenderTarget;
    }

    /** @inheritdoc */
    public set mainRenderTarget(value: ITexture2D) {
        this._mainRenderTarget = value as WebGLTexture2D;
    }

    /** @inheritdoc */
    public initialize(): void {
        this._framework.content.load<WebGLShaderModule>(WebGLShaderModule.name, "main_render_target_flip_y").webGlProgramPromise!.then(program => {
            this._program = program;
        }).catch(error => {
            console.error("Failed to load shader module for main render target render pipeline.", error);
        });
        this._createResources();
        this.vertexBufferLayouts = [VertexBufferLayout.createFloat3Float2Layout()];
        super.initialize();
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

    /** @inheritdoc */
    public render(): void {

        if (this._program == null) {
            return;
        }

        this._setupPipeline();

        this._gl.useProgram(this._program);
        this._gl.bindVertexArray(this._vertexArrayObject);
        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer.buffer);

        this._gl.activeTexture(this._gl.TEXTURE0);
        this._gl.bindTexture(this._gl.TEXTURE_2D, this._mainRenderTarget.glTexture);
        this._gl.bindSampler(0, this._sampler.glSampler);

        this._gl.drawElements(this._gl.TRIANGLES, this._indexBuffer.indicesCount, this._gl.UNSIGNED_SHORT, 0);
    }
}
