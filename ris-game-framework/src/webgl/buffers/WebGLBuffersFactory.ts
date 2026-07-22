import type { ITempBuffersFactory } from "../../core/buffers/buffers-factory-interface";
import type { IVertexBuffer } from "../../core/buffers/vertex-buffer-interface";
import type { TempIFramework } from "../../core/framework-interface";
import { BufferUsage } from "../../core/rendering/enums";
import { WebGLVertexBuffer as WebGlVertexBuffer } from "./webgl-vertex-buffer";
import type { IUniformBuffer } from "../../core/buffers/uniform-buffer-interface";
import type {IIndexBuffer} from "../../buffers/IIndexBuffer.ts";
import {WebGLIndexBuffer} from "./webgl-index-buffer.ts";

export class WebGLBuffersFactory implements ITempBuffersFactory {

    /**
     * The constructor of the WebGLBuffersFactory class.
     * @param _framework The framework instance to use for creating buffers.
     */
    public constructor(private readonly _framework: TempIFramework) {
    }

    /** @inheritdoc */
    public createIndexBuffer(data: number[], label?: string): IIndexBuffer {
        const buffer = new WebGLIndexBuffer(this._framework, label);
        buffer.initialize(data);
        return buffer;
    }

    /** @inheritdoc */
    createUniformBuffer(_dataOrByteLength: ArrayBuffer | ArrayBufferView | number[], _bufferUsage: BufferUsage, _label?: string): IUniformBuffer {
        throw new Error("Method not implemented.");
    }

    /** @inheritdoc */
    /*
    public createIndexBuffer(data: Uint16Array | Uint32Array, label: string | null): IIndexBuffer {
        const indexBuffer = new WebGlIndexBuffer(this._framework, label);
        indexBuffer.initialize(data);
        return indexBuffer;
    }

     */

    /** @inheritdoc */
    public createVertexBuffer(
        dataOrByteSize: Float32Array | number,
        byteStride: number,
        vertexCount: number,
        bufferUsage: BufferUsage = BufferUsage.VERTEX | BufferUsage.COPY_DST,
        label: string | null = null): IVertexBuffer {

        const vertexBuffer = new WebGlVertexBuffer(this._framework, label);
        vertexBuffer.initialize(dataOrByteSize, byteStride, vertexCount, bufferUsage);
        return vertexBuffer;
    }

    /** @inheritdoc */
    /*
    public createUniformBuffer(dataOrByteLength: ArrayBuffer | ArrayBufferView | number, bufferUsage: BufferUsage = BufferUsage.UNIFORM | BufferUsage.COPY_DST, label: string | null = null): IUniformBuffer {
        const uniformBuffer = new WebGlUniformBuffer(this._graphicsDevice, bufferUsage, label ?? "");
        uniformBuffer.initialize(dataOrByteLength);
        return uniformBuffer;
    }

     */
}