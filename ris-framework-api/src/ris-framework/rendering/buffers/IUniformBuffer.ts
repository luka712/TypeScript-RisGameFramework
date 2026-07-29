import {IDisposable} from "../../core/IDisposable";
import {BufferUsage} from "./BufferUsage";

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
     * Initialize the constant buffer. Use this to initialize it as array of .
     * @param data - The data to initialize with.
     */
    initialize(data: number[] | number): void;

    /**
     * Update the constant buffer.
     * @param data - The data array.
     */
    update(data: number[] | number): void;

    /**
     * Logs information about the buffer and returns it as a string.
     * @returns The buffer information.
     */
    printInfo(): string;

}
