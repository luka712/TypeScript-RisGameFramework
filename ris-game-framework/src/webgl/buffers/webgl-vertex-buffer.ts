import type { IVertexBuffer } from "../../core/buffers/vertex-buffer-interface";
import type { IFramework } from "../../core/framework-interface";
import { BufferUsage } from "../../core/rendering/enums";
import { asWebGLGraphicsDevice } from "../cast/cast";
import { WebGLUtilities } from "../utilities/webgl-utilities";
import type { WebGLGraphicsDevice } from "../webgl-graphics-device";

/**
 * The WebGL implementation of the vertex buffer. 
 * This class is responsible for managing a vertex buffer in WebGL,
 * including creating the buffer, uploading data to the buffer,
 * and providing information about the buffer such as its size and stride.
 */
export class WebGLVertexBuffer implements IVertexBuffer {

    private readonly _graphicsDevice: WebGLGraphicsDevice;
    private readonly _gl: WebGL2RenderingContext;
    private _byteStride = 0;
    private _vertexCount = 0;
    private _byteSize = 0;
    private _bufferUsage = BufferUsage.None;

    /**
     * The constructor.
     * @param framework The framework.
     * @param label An optional label for the vertex buffer, which can be used for debugging purposes.
     */
    constructor(framework: IFramework, private readonly _label: string | null = null) {
        this._graphicsDevice = asWebGLGraphicsDevice(framework.renderer.graphicsDevice);
        this._gl = this._graphicsDevice.gl;
    }

    /**
     * The WebGL buffer object that represents the vertex buffer in WebGL.
     */
    public buffer: WebGLBuffer | null = null;

    public get isWritable(): boolean {
        throw new Error("Method not implemented.");
    }

    /** @inheritdoc */
    public get label(): string | null {
        return this._label;
    }

    /** @inheritdoc */
    public get vertexCount(): number {
        return this._vertexCount;
    }

    /** @inheritdoc */
    public get byteSize(): number {
        return this._byteSize;
    }

    /** @inheritdoc */
    public get byteStride(): number {
        return this._byteStride;
    }

    /** @inheritdoc */
    public initialize(dataOrByteSize: Float32Array | number, byteStride: number, vertexCount: number, bufferUsage: BufferUsage): void {
        this._byteStride = byteStride;
        this._vertexCount = vertexCount;
        this._bufferUsage = bufferUsage;
        
        if (typeof dataOrByteSize === "number") {
            this._byteSize = dataOrByteSize;
            this.buffer = WebGLUtilities.buffer.createVertexBuffer(this._gl, dataOrByteSize, bufferUsage);
            return;
        }
        const data = dataOrByteSize;
        this._byteSize = data.byteLength;

        this.buffer = WebGLUtilities.buffer.createVertexBuffer(this._gl, data, bufferUsage);
    }
}