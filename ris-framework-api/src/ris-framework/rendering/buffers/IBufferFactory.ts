import {IIndexBuffer} from "./IIndexBuffer";

/**
 * The buffer factory interface.
 */
export interface IBufferFactory {

    /**
     * Creates a new index buffer and prefills it with data.
     * @param data - The data to prefill the buffer with.
     * @param label - The buffer label.
     * @returns The index buffer.
     */
    createIndexBuffer(data: number[], label: string): IIndexBuffer;
}
