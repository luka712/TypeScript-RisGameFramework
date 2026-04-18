import { inject, injectable } from "tsyringe";
import type { IBuffersFactory } from "../../core/buffers/buffers-factory-interface";
import type { IVertexBuffer } from "../../core/buffers/vertex-buffer-interface";
import { IFrameworkSymbol } from "../../core/dependency-injection/register-services-interface";
import type { IFramework } from "../../core/framework-interface";
import { BufferUsage } from "../../core/rendering/enums";
import { WebGLVertexBuffer as WebGlVertexBuffer } from "./webgl-vertex-buffer";
import type { IIndexBuffer } from "../../core/buffers/index-buffer-interface";
import { WebGLIndexBuffer as WebGlIndexBuffer } from "./webgl-index-buffer";
import type { IUniformBuffer } from "../../core/buffers/uniform-buffer-interface";
import { WebGlUniformBuffer } from "./webgl-uniform-buffer";
import type { WebGLGraphicsDevice } from "../webgl-graphics-device";

@injectable()
export class WebGLBuffersFactory implements IBuffersFactory {

    private readonly _graphicsDevice: WebGLGraphicsDevice;

    /**
     * The constructor of the WebGLBuffersFactory class.
     * @param _framework The framework instance to use for creating buffers.
     */
    public constructor(@inject(IFrameworkSymbol) private readonly _framework: IFramework) {
        this._graphicsDevice = this._framework.renderer.graphicsDevice as WebGLGraphicsDevice;
    }

    /** @inheritdoc */
    public createIndexBuffer(data: Uint16Array | Uint32Array, label: string | null): IIndexBuffer {
        const indexBuffer = new WebGlIndexBuffer(this._framework, label);
        indexBuffer.initialize(data);
        return indexBuffer;
    }

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
    public createUniformBuffer(dataOrByteLength: ArrayBuffer | ArrayBufferView | number, bufferUsage: BufferUsage = BufferUsage.UNIFORM | BufferUsage.COPY_DST, label: string | null = null): IUniformBuffer {
        const uniformBuffer = new WebGlUniformBuffer(this._graphicsDevice, bufferUsage, label ?? "");
        uniformBuffer.initialize(dataOrByteLength);
        return uniformBuffer;
    }
}