import { inject } from "tsyringe";
import type { IBuffersFactory } from "../../core/buffers/buffers-factory-interface";
import type { IVertexBuffer } from "../../core/buffers/vertex-buffer-interface";
import { IFrameworkSymbol } from "../../core/dependency-injection/register-services-interface";
import type { IFramework } from "../../core/framework-interface";
import { BufferUsage } from "../../core/rendering/enums";
import { WebGLVertexBuffer } from "./webgl-vertex-buffer";

export class WebGLBuffersFactory implements IBuffersFactory {

    /**
     * The constructor of the WebGLBuffersFactory class.
     * @param _framework The framework instance to use for creating buffers.
     */
    constructor(@inject(IFrameworkSymbol) private readonly _framework: IFramework) {
    }

    /** @inheritdoc */
    public createVertexBuffer(
        dataOrByteSize: Float32Array | number,
        byteStride: number,
        vertexCount: number,
        bufferUsage: BufferUsage = BufferUsage.Vertex_CopyDst,
        label: string | null = null): IVertexBuffer {

        const vertexBuffer = new WebGLVertexBuffer(this._framework, label);
        vertexBuffer.initialize(dataOrByteSize, byteStride, vertexCount, bufferUsage);
        return vertexBuffer;
    }
}