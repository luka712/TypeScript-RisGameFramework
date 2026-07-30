import {BufferUsage} from "./BufferUsage";
import {IDisposable} from "../../core/IDisposable";

/**
 * Interface for uniform buffer.
 */
export interface IUniformBuffer extends IDisposable {

    /**
     * Gets the label.
     */
    readonly label: string;

    /**
     * The size of a buffer in bytes.
     */
    readonly byteLength: number;

    /**
     * The .
     */
    readonly bufferUsage: BufferUsage;

    /**
     * Initialize the constant buffer.
     */
    initialize(): void;

    /**
     * Initialize the constant buffer.
     * @param data - The data to initialize with.
     */
    initialize(data: number[]): void;

    /**
     * Update the constant buffer.
     * @param data - The data array.
     * @param offset - Defines where to start buffer write. Must be in bytes.
     * @param length - Defines how many bytes to write. By default, -1 that means data length is used.
     */
    update(data: number[], offset: number, length: number): void;

}
