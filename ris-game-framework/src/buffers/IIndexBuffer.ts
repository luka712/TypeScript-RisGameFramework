import type {IndexBufferType} from "./IndexBufferType.ts";
import type {BufferUsage} from "../core/rendering/enums.ts";
import type {IDisposable} from "../common/disposable.ts";

/**
 * The index buffer.
 */
export interface IIndexBuffer extends IDisposable {
  /**
   * The type of buffer.
   */
  readonly type: IndexBufferType;

  /**
   * The usage of the buffer.
   */
  readonly usage: BufferUsage;

  /**
   * Size of the element.
   * Usually 2 or 4 bytes depending on the Type property.
   */
  readonly elementByteSize: number;

  /**
   * The label.
   */
  readonly label?: string;

  /**
   * The count of indices.
   */
  readonly indicesCount: number;

  /**
   * Gets the byte size.
   */
  readonly byteSize: number;
  /**
   * Initialize the vertex buffer.
   * @param data - The data to initialize with.
   */
  initialize(data: number[]): void;
}
