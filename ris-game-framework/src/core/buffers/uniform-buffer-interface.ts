import type { IDisposable } from "../../common/disposable";
import type { BufferUsage } from "../rendering/enums";

/**
 * The interface for a uniform buffer.
 *  A uniform buffer is a buffer that contains uniform data that can be accessed by the shaders during rendering.
 *  Uniform buffers are typically used to store data that is shared across multiple draw calls, such as transformation matrices, lighting information, or other global parameters.
 */
export interface IUniformBuffer extends IDisposable {

    /**
     * The label of the uniform buffer.
     */
    readonly label: string;

    /**
     * The byte length of the uniform buffer. 
     */
    readonly byteLength: number;

    /**
     * The usage of the uniform buffer. 
     */
    readonly bufferUsage: BufferUsage;

    /**
     * The initialize method for the uniform buffer. 
     * @param dataOrByteLength The data or byte length to initialize the uniform buffer with. If data is provided, it should be an ArrayBuffer or a TypedArray containing the initial data for the uniform buffer. If a number is provided, it represents the byte length of the buffer to create.
     */
    initialize(dataOrByteLength: ArrayBuffer | ArrayBufferView | number): void;

    /**
     * Updates the data in the uniform buffer. This method should be called whenever the data in the uniform buffer needs to be updated, such as when the values of the uniforms change.
     * @param data The data to update the uniform buffer with. This should be an ArrayBuffer or a TypedArray containing the data for the uniforms.
     */
    updateData(data: ArrayBuffer | ArrayBufferView): void;
}
