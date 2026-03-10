import { IndexBufferType } from "../../common/enums";
import type { IIndexBuffer } from "../../core/buffers/index-buffer-interface";
import type { IFramework } from "../../core/framework-interface";
import { BufferUsage } from "../../core/rendering/enums";
import { asWebGLRenderer } from "../cast/cast";
import { WebGLUtilities } from "../utilities/webgl-utilities";

/**
 * The WebGLIndexBuffer class is an implementation of the IIndexBuffer interface for WebGL.
 * It represents a buffer that holds index data for rendering in a WebGL context. The class provides properties to access the type, size, and count of indices, as well as a method to initialize the buffer with index data. It also implements the IDisposable interface, allowing it to be disposed of to free resources when it is no longer needed.
 */
export class WebGLIndexBuffer implements IIndexBuffer {

    private readonly _gl: WebGL2RenderingContext;

    private _type = IndexBufferType.Uint16;
    private _elementByteSize = 0;
    private _label: string | null | undefined = null
    private _indicesCount = 0;
    private _byteSize = 0;

    /**
     * The constructor.
     * @param framework The framework.
     * @param label An optional label for the index buffer, which can be used for debugging purposes.
     */
    constructor(framework: IFramework, label: string | null = null) {
        this._gl = asWebGLRenderer(framework.renderer).gl!;
        this._label = label;
    }

    /**
     * The WebGL buffer object that represents the index buffer in WebGL.
     * This buffer is used to store the index data on the GPU and is bound to the appropriate target when rendering.
     */
    public buffer: WebGLBuffer | null = null;

    /** @inheritdoc */
    public get type(): IndexBufferType {
        return this._type;
    }

    /** @inheritdoc */
    public get elementByteSize(): number {
        return this._elementByteSize;
    }

    /** @inheritdoc */
    public get label(): string | null | undefined {
        return this._label;
    }

    /** @inheritdoc */
    public get indicesCount(): number {
        return this._indicesCount;
    }

    /** @inheritdoc */
    public get byteSize(): number {
        return this._byteSize;
    }

    /** @inheritdoc */
    public initialize(data: Uint16Array | Uint32Array): void {
        if (data instanceof Uint16Array) {
            this._type = IndexBufferType.Uint16;
            this._elementByteSize = Uint16Array.BYTES_PER_ELEMENT;
        } else if (data instanceof Uint32Array) {
            this._type = IndexBufferType.Uint32;
            this._elementByteSize = Uint32Array.BYTES_PER_ELEMENT;
        } else {
            throw new Error("Invalid data type for index buffer. Expected Uint16Array or Uint32Array.");
        }

        this._indicesCount = data.length;
        this._byteSize = this._indicesCount * this._elementByteSize;
        this.buffer = WebGLUtilities.buffer.createIndexBuffer(this._gl, data, BufferUsage.Index);
    }


     /** @inheritdoc */
    public dispose(): void {
      
        if (this.buffer) {
            this._gl.deleteBuffer(this.buffer);
            this.buffer = null;
        }
    }
}