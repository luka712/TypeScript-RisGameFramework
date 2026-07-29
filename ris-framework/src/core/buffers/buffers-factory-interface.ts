import type { IUniformBuffer } from "./uniform-buffer-interface";
import type { IVertexBuffer } from "./vertex-buffer-interface";
import type {BufferUsage, IBufferFactory} from "ris-framework-api";


/**
 * The interface for the buffers factory, which is responsible for creating vertex buffers.
 */
export interface ITempBuffersFactory extends IBufferFactory{

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
        dataOrByteSize: Float32Array | number[] | number,
        byteStride: number,
        vertexCount: number,
        bufferUsage: BufferUsage,
        label?: string): IVertexBuffer;

    /**
     * Creates a uniform buffer.
     * @param dataOrByteLength The data to initialize the buffer with, which can be an ArrayBuffer or a TypedArray containing uniform data, or a number representing the byte length of the buffer to create.
     * @param bufferUsage The intended usage of the buffer, which can affect how the buffer is created and optimized by the graphics API. For example, a uniform buffer may be optimized for use as a uniform buffer in rendering operations. By default it is UNIFORM | COPY_DST, which means the buffer is intended to be used as a uniform buffer and can also be updated with new data after creation.  
     * @param label The label for the buffer, which can be used for debugging purposes to identify the buffer in graphics debugging tools.
     * @returns The created uniform buffer.
     */
    createUniformBuffer(dataOrByteLength: ArrayBuffer | ArrayBufferView | number[], bufferUsage: BufferUsage, label?: string): IUniformBuffer;
}