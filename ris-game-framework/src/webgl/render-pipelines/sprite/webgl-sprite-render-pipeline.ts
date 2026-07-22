import type { IUniformBuffer } from "../../../core/buffers/uniform-buffer-interface";
import type { TempIFramework } from "../../../core/framework-interface";
import type { ISpriteRenderPipeline } from "../../../core/render-pipelines/sprite-render-pipeline";
import type { ITexture2D } from "../../../core/rendering/texture/texture";
import { VertexBufferLayout } from "../../../core/rendering/vertex-buffer-layout";
import type { WebGlUniformBuffer } from "../../buffers/webgl-uniform-buffer";
import {  asWebGLTexture2D, asWebGLUniformBuffer } from "../../cast/cast";
import { WebGLShaderModule } from "../../shader/webgl-shader-module";
import { WebGLTexture2D } from "../../texture/webgl-texture-2d";
import { WebGLVertexBuffer } from '../../buffers/webgl-vertex-buffer';
import type { IVertexBuffer } from "../../../core/buffers/vertex-buffer-interface";
import { AWebGlRenderPipeline } from "../a-webgl-render-pipeline";
import type { WebGLIndexBuffer } from "../../buffers/webgl-index-buffer";
import type {IIndexBuffer} from "../../../buffers/IIndexBuffer.ts";
import {IndexBufferType} from "../../../buffers/IndexBufferType.ts";

/**
 * The WebGL implementation of the sprite render pipeline. 
 */
export class WebGlSpriteRenderPipeline extends AWebGlRenderPipeline implements ISpriteRenderPipeline {

    private static readonly CAMERA_BINDING_POINT: number = 0;

    private _texture: WebGLTexture2D | null = null;
    private _projectionViewBuffer: WebGlUniformBuffer;
    private _cameraBlockIndex: number = -1;
    private _buffersArray: WebGLBuffer[] = [null!];
    private _lastVertexBuffer: WebGLVertexBuffer | null = null;

    /**
     * The constructor.
     * @param framework The framework. 
     */
    constructor(framework: TempIFramework, projectionViewBuffer: IUniformBuffer) {
        super(framework);
        this._projectionViewBuffer = asWebGLUniformBuffer(projectionViewBuffer);
    }

    /** @inheritdoc */
    public get projectionViewBuffer(): IUniformBuffer {
        return this._projectionViewBuffer;
    }

    /** @inheritdoc */
    public set projectionViewBuffer(value: IUniformBuffer) {
        this._projectionViewBuffer = asWebGLUniformBuffer(value);
    }

    /** @inheritdoc */
    public get spriteTexture(): ITexture2D | null {
        return this._texture;
    }

    /** @inheritdoc */
    public set spriteTexture(value: ITexture2D | null) {
        this._texture = asWebGLTexture2D(value!);
    }


    /** @inheritdoc */
    public override initialize(): void {

        this._framework.content.load<WebGLShaderModule>(WebGLShaderModule.name, "sprite").webGlProgramPromise!.then(program => {
            this._program = program;
        }).catch(error => {
            console.error("Failed to load shader module for main render target render pipeline.", error);
        });

        this._createResources();
        this.vertexBufferLayouts = [VertexBufferLayout.createFloat3Float2Layout()];
        super.initialize();
    }

    private _createResources(): void {
        {
            this._texture = WebGLTexture2D.getOrCreateDefault(this._framework);

            this._cameraBlockIndex = this._gl.getUniformBlockIndex(this._program, "_MatrixStorage_float4x4_ColMajorstd140");
            this._gl.uniformBlockBinding(this._program, this._cameraBlockIndex, WebGlSpriteRenderPipeline.CAMERA_BINDING_POINT);
        }
    }


    /** @inheritdoc */
    protected _provideBuffers(): WebGLBuffer[] {
        if (this._lastVertexBuffer === null) {
            return this._buffersArray;
        }

        this._buffersArray[0] = this._lastVertexBuffer.buffer!;
        return this._buffersArray;
    }

    /** @inheritdoc */
    public render(vertexBuffer: IVertexBuffer, indexBuffer: IIndexBuffer, indicesCount: number = -1, indicesOffset: number = 0): void {

        if (indicesCount == 0) {
            return;
        }

        const webGlVertexBuffer = vertexBuffer as WebGLVertexBuffer;
        const webGlIndexBuffer = indexBuffer as WebGLIndexBuffer;


        this._primitiveState.apply(this._gl);
        this._blendState.apply(this._gl);

        // if it was changed, we need to create a new vao.
        if (this._lastVertexBuffer != webGlVertexBuffer) {
            // Create a new VAO. Internally deletes the old one.
            this._lastVertexBuffer = webGlVertexBuffer;
            this._createVertexArrayObject();
        }

        this._gl.useProgram(this._program);
        // Bind the vao. It contains all the information about the vertex buffer layout ( vertices + instances)
        this._gl.bindVertexArray(this._vertexArrayObject);
        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, webGlIndexBuffer.buffer);
        this._gl.bindBufferBase(this._gl.UNIFORM_BUFFER, this._cameraBlockIndex, this._projectionViewBuffer.glBuffer!);
        this._gl.activeTexture(this._gl.TEXTURE0);
        this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture!.glTexture);
        this._gl.bindSampler(0, this._sampler.glSampler);

        // We can only really use two types uint16 and uint32. Boolean check to see which one to use.
        const type = indexBuffer.type == IndexBufferType.UINT_16
            ? this._gl.UNSIGNED_SHORT
            : this._gl.UNSIGNED_INT;

        // api.PolygonMode(GLEnum.FrontAndBack, GLEnum.Line);

        // Either draw all indices or a specific amount. If indicesCount is -1, draw all as defined by the index buffer.
        const toIndices = indicesCount > 0 ? indicesCount : indexBuffer.indicesCount;
        const fromIndices = indicesOffset * indexBuffer.elementByteSize;

        this._gl.drawElements(this._primitiveState.glPrimitiveType, toIndices, type, fromIndices);

    }

}