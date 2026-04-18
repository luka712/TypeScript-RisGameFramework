import type { IUniformBuffer } from "../../core/buffers/uniform-buffer-interface";
import type { BufferUsage } from "../../core/rendering/enums";
import type { IGraphicsDevice } from "../../core/rendering/graphics-device-interface";
import { WebGLUtilities } from "../utilities/webgl-utilities";
import type { WebGLGraphicsDevice } from "../webgl-graphics-device";

/**
 * The WebGL implementaiton of the uniform buffer. 
 */
export class WebGlUniformBuffer implements IUniformBuffer {

    private readonly _gl: WebGL2RenderingContext;
    private _byteLength: number = 0;

    /**
     * The constructor for the WebGLUniformBuffer.
     */
    public constructor(graphicsDevice: IGraphicsDevice, bufferUsage: BufferUsage, label: string) {
        this._gl = (graphicsDevice as WebGLGraphicsDevice).gl;
        this.bufferUsage = bufferUsage;
        this.label = label;
    }

    /** 
     * The native WebGL buffer object that is used to store the uniform data. 
     */
    public glBuffer: WebGLBuffer | null = null;

    /** @inheritdoc */
    public readonly label: string;

    /** @inheritdoc */
    public get byteLength(): number {
        return this._byteLength;
    }

    /** @inheritdoc */
    public readonly bufferUsage: BufferUsage;

    /** @inheritdoc */
    public initialize(dataOrByteLength: ArrayBuffer | ArrayBufferView | number): void {

        this._byteLength = typeof dataOrByteLength === "number" ? dataOrByteLength : dataOrByteLength.byteLength;
        const glBuffer = WebGLUtilities.buffer.createUniformBuffer(this._gl, dataOrByteLength ?? this.byteLength, this.bufferUsage, this.label);
        this.glBuffer = glBuffer;
    }

    /** @inheritdoc */
    public updateData(data: ArrayBuffer | ArrayBufferView): void {
        this._gl.bindBuffer(this._gl.UNIFORM_BUFFER, this.glBuffer);
        this._gl.bufferSubData(this._gl.UNIFORM_BUFFER, 0, data);
    }

    /** @inheritdoc */
    public dispose(): void {
        if (this.glBuffer) {
            this._gl.deleteBuffer(this.glBuffer);
            this.glBuffer = null;
        }
    }
}