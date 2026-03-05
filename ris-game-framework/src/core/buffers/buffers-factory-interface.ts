import type { BufferUsage } from "../rendering/enums";
import type { IVertexBuffer } from "./vertex-buffer-interface";

export const IBuffersFactorySymbol = Symbol("IBuffersFactory");

/**
 * The interface for the buffers factory, which is responsible for creating vertex buffers.
 */
export interface IBuffersFactory {

    /**
     * Creates a vertex buffer.
     * @param dataOrByteSize The data to initialize the buffer with, or the byte size of the buffer to create.
     * @param byteStride The byte stride of the vertex data, which is the distance in bytes between the start of one vertex and the start of the next vertex in the buffer.
     * @param vertexCount The number of vertices represented by the data in the buffer. This is used to determine how many vertices can be rendered from the buffer.
     * @param bufferUsage The intended usage of the buffer, which can affect how the buffer is created and optimized by the graphics API. For example, a vertex buffer may be optimized for use as a vertex buffer in rendering operations.
     * @param label The label for the buffer, which can be used for debugging purposes to identify the buffer in graphics debugging tools.
     * @returns The created vertex buffer.
     */
    createVertexBuffer(
        dataOrByteSize: Float32Array | number,
        byteStride: number,
        vertexCount: number,
        bufferUsage: BufferUsage,
        label: string | null): IVertexBuffer;
}