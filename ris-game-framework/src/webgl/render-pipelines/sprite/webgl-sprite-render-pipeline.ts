import type { IUniformBuffer } from "../../../core/buffers/uniform-buffer-interface";
import type { IFramework } from "../../../core/framework-interface";
import type { ISpriteRenderPipeline } from "../../../core/render-pipelines/sprite-render-pipeline";
import type { ITexture2D } from "../../../core/rendering/texture/texture";
import { VertexBufferLayout } from "../../../core/rendering/vertex-buffer-layout";
import type { WebGlUniformBuffer } from "../../buffers/webgl-uniform-buffer";
import { asWebGLIndexBuffer, asWebGLTexture2D, asWebGLUniformBuffer, asWebGLVertexBuffer } from "../../cast/cast";
import { WebGLShaderModule } from "../../shader/webgl-shader-module";
import { WebGLTexture2D } from "../../texture/webgl-texture-2d";
import { AWebGLRenderPipeline } from "../a-webgl-render-pipeline";
import { WebGLVertexBuffer } from '../../buffers/webgl-vertex-buffer';
import type { IIndexBuffer } from "../../../core/buffers/index-buffer-interface";
import type { IVertexBuffer } from "../../../core/buffers/vertex-buffer-interface";

/**
 * The WebGL implementation of the sprite render pipeline. 
 */
export class WebGLSpriteRenderPipeline extends AWebGLRenderPipeline implements ISpriteRenderPipeline {

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
    constructor(framework: IFramework, projectionViewBuffer: IUniformBuffer) {
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
            this._gl.uniformBlockBinding(this._program, this._cameraBlockIndex, WebGLSpriteRenderPipeline.CAMERA_BINDING_POINT);
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
    public render(vertexBuffer: IVertexBuffer, indexBuffer: IIndexBuffer, indicesCount?: number, indicesOffset?: number): void {
        if (indicesCount == 0) {
            return;
        }

        const webGlVertexBuffer = asWebGLVertexBuffer(vertexBuffer);
        const webGlIndexBuffer = asWebGLIndexBuffer(indexBuffer);

        
        _primitiveState.Apply(_gl);
        _blendState.Apply(_gl);

        // if it was changed, we need to create a new vao.
        if (_lastVertexBuffer != openGlVertexBuffer) {
            // Create a new VAO. Internally deletes the old one.
            _lastVertexBuffer = openGlVertexBuffer;
            CreateVertexArrayObject();
        }

        _gl.UseProgram(_program);
        // Bind the vao. It contains all the information about the vertex buffer layout ( vertices + instances)
        _gl.BindVertexArray(_vertexArrayObject);
        _gl.BindBuffer(GLEnum.ElementArrayBuffer, openGlIndexBuffer.Buffer);
        _gl.BindBufferBase(GLEnum.UniformBuffer, _cameraBlockIndex, _projectionViewBuffer.Buffer);
        _gl.ActiveTexture(GLEnum.Texture0);
        _gl.BindTexture(GLEnum.Texture2D, _texture.GLTexture);
        _gl.BindSampler(0, _sampler.GLSampler);

 // We can only really use two types uint16 and uint32. Boolean check to see which one to use.
 GLEnum type = indexBuffer.Type == IndexBufferType.Uint16
            ? GLEnum.UnsignedShort
            : GLEnum.UnsignedInt;

 // api.PolygonMode(GLEnum.FrontAndBack, GLEnum.Line);

 // Either draw all indices or a specific amount. If indicesCount is -1, draw all as defined by the index buffer.
 uint toIndices = indicesCount > 0 ? (uint)indicesCount: indexBuffer.IndicesCount;
 uint fromIndices = indicesOffset * indexBuffer.ElementByteSize;
        unsafe
        {
            _gl.DrawElements(_primitiveState.GLPrimitiveType, toIndices, type, (void*)fromIndices);
        }
    }

}