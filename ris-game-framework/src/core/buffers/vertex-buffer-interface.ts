import { BufferUsage } from "../rendering/enums";

export interface IVertexBuffer {

    /**
     * Indicates whether the vertex buffer is writable. 
     * If the vertex buffer is not writable, it cannot be updated with new data after it has been created.
     */
    get isWritable(): boolean;

    /**
     * Gets the label of the vertex buffer. 
     * The label is a string that can be used to identify the vertex buffer for debugging purposes.
     */
    get label(): string | null;

    /**
     * Gets the number of vertices in the vertex buffer.
     */
    get vertexCount(): number;

    /**
     * Gets the byte size of the vertex buffer. 
     * This is the total size in bytes of the vertex data stored in the buffer.
     */
    get byteSize(): number;

    /**
     * Gets the byte stride of the vertex buffer. 
     * The byte stride is the distance in bytes between the start of one vertex and the start of the next vertex in the buffer. 
     * It is used to determine how to read the vertex data from the buffer when rendering.
     */
    get byteStride(): number;

    /**
     * Initializes the vertex buffer with the given data, vertex count, and buffer usage.
     * @param dataOrByteSize The vertex data to be stored in the buffer as a Float32Array, or the byte size of the buffer to create if the data is not provided.
     * @param byteStride The byte stride of the vertex data, which is the distance in bytes between the start of one vertex and the start of the next vertex in the buffer.
     * @param vertexCount The number of vertices represented by the data in the buffer. This is used to determine how many vertices can be rendered from the buffer.
     * @param bufferUsage The intended usage of the buffer, which can affect how the buffer is created and optimized by the graphics API. For example, a vertex buffer may be optimized for use as a vertex buffer in rendering operations.
     */
    initialize(dataOrByteSize: Float32Array | number, byteStride: number, vertexCount: number, bufferUsage: BufferUsage): void;
}