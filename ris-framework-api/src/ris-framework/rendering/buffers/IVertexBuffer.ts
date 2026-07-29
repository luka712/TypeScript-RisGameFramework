import {BufferUsage} from "./BufferUsage";
import {IDisposable} from "../../core/IDisposable";

/**
 * Create a new vertex buffer.
 */
export interface IVertexBuffer extends IDisposable {

/**
 * The label of the buffer.
 */
  readonly label?: string;

/**
 * The number of vertices.
 */
  readonly vertexCount: number;

/**
 * Size of the buffer in bytes.
 */
  readonly byteSize: number;

/**
 * The byte stride of the buffer.
 */
  readonly byteStride: number;

/**
 * Initialize the vertex buffer.
 * @param dataOrByteSize - The data for the buffer.
 * @param vertexCount - The vertex count.
 * @param usage - The buffer usage.
 */
  initialize(dataOrByteSize: number[], vertexCount: number, usage?: BufferUsage): void;

/**
 * Update the vertex buffer.
 * @param data - The data to be written to buffer.
 * @param offset - The offset to write data. By default, 0. This is in bytes of the buffer.
 * @param byteSize - The byte size of data. By default -1 that means data length is used.
 */
  update(data: number[], offset: number, byteSize: number): void;

}
