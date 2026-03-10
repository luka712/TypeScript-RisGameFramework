import type { IDisposable } from "../../common/disposable";
import type { IndexBufferType } from "../../common/enums";

/**
 * The IIndexBuffer interface represents a buffer that holds index data for rendering. It provides properties to access the type, size, and count of indices, as well as a method to initialize the buffer with index data. The interface extends IDisposable, indicating that it can be disposed of to free resources when it is no longer needed.
 */
export interface IIndexBuffer extends IDisposable {

    /**
     * The type of the index buffer.
     * This indicates the size of the indices (16-bit or 32-bit) and determines the appropriate type to use when rendering.
     * @returns The type of the index buffer.
     */
    type: IndexBufferType;

    /**
     * The size in bytes of each index element in the buffer. 
     * This is determined by the type of the index buffer (2 bytes for Uint16 and 4 bytes for Uint32) and is used when rendering to correctly interpret the index data.
     * @returns The size in bytes of each index element in the buffer.
     */
    elementByteSize: number;

    /**
     * The label of the index buffer.
     * This is an optional string that can be used to identify the buffer for debugging or profiling purposes.
     * @returns The label of the index buffer.
     */
    label: string | null | undefined;

    /**
     * The number of indices currently stored in the buffer.
     * This is determined by the length of the data used to initialize the buffer and is used when rendering to specify how many indices to draw.
     * @returns The number of indices currently stored in the buffer.
     */
    indicesCount: number;

    /**
     * The total size in bytes of the index buffer.
     *  This is calculated as the number of indices multiplied by the byte size of each index element (elementByteSize). This value is used when allocating memory for the buffer and when rendering to specify the size of the index data.
     * @returns The total size in bytes of the index buffer.
     */
    byteSize: number;

    /**
     * Initializes the index buffer with the given data.
     * @param data The data to initialize the index buffer with. This can be either a Uint16Array or a Uint32Array, depending on the size of the indices.
     */
    initialize(data: Uint16Array | Uint32Array): void;
}
