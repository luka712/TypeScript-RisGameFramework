import type { BufferUsage } from "../../core/rendering/enums";
import { WebGLConverter } from "./webgl-converter";

/**
 * This file contains utility functions for working with WebGL buffers, 
 * such as creating and managing vertex buffers, index buffers, and uniform buffers.
 * It provides a higher-level abstraction over the raw WebGL API to simplify buffer management in a WebGL application.
 */
export class WebGLBufferUtilities {

    /**
     * Creates a vertex buffer in WebGL with the given data and usage.
     * @param gl The WebGL2RenderingContext to use for creating the buffer.
     * @param dataOrByteSize The data to upload to the vertex buffer, typically a Float32Array containing vertex attributes, or a number representing the byte size of the buffer to create.
     * @param usage The intended usage of the buffer, which can affect how the buffer is created and optimized by the graphics API. For example, a vertex buffer may be optimized for use as a vertex buffer in rendering operations.
     * @returns The created WebGLBuffer object that represents the vertex buffer in WebGL.
     */
    public createVertexBuffer(gl: WebGL2RenderingContext, dataOrByteSize: Float32Array | number, usage: BufferUsage): WebGLBuffer {
        const buffer = gl.createBuffer();
        if (!buffer) {
            throw new Error("Failed to create vertex buffer.");
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        if (typeof dataOrByteSize === "number") {
            gl.bufferData(gl.ARRAY_BUFFER, dataOrByteSize, WebGLConverter.convertBufferUsage(usage));
        } else {
            gl.bufferData(gl.ARRAY_BUFFER, dataOrByteSize, WebGLConverter.convertBufferUsage(usage));
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        return buffer;
    }

    /**
     * Creates an index buffer in WebGL with the given data and usage.
     * @param gl The WebGL2RenderingContext to use for creating the buffer.
     * @param dataOrByteSize The data to upload to the index buffer, typically a Uint16Array or Uint32Array containing index data, or a number representing the byte size of the buffer to create.
     * @param usage The intended usage of the buffer, which can affect how the buffer is created and optimized by the graphics API. For example, an index buffer may be optimized for use as an index buffer in rendering operations.
     * @returns The created WebGLBuffer object that represents the index buffer in WebGL.
     */
    public createIndexBuffer(gl: WebGL2RenderingContext, dataOrByteSize: Uint16Array | Uint32Array | number, usage: BufferUsage): WebGLBuffer {
        const buffer = gl.createBuffer();
        if (!buffer) {
            throw new Error("Failed to create index buffer.");
        }

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
        if (typeof dataOrByteSize === "number") {
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, dataOrByteSize, WebGLConverter.convertBufferUsage(usage));
        } else {
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, dataOrByteSize, WebGLConverter.convertBufferUsage(usage));
        }

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        return buffer;
    }

    /**
     * Creates a uniform buffer in WebGL with the given data and usage.
     * @param gl The WebGL2RenderingContext to use for creating the buffer.
     * @param dataOrByteSize The data to upload to the uniform buffer, typically an ArrayBuffer or a TypedArray containing uniform data, or a number representing the byte size of the buffer to create.
     * @param usage The intended usage of the buffer, which can affect how the buffer is created and optimized by the graphics API. For example, a uniform buffer may be optimized for use as a uniform buffer in rendering operations.
     * @param label An optional label for the buffer, which can be used for debugging purposes to identify the buffer in graphics debugging tools. 
    * @returns The created WebGLBuffer object that represents the uniform buffer in WebGL.
     */
    public createUniformBuffer(gl: WebGL2RenderingContext, dataOrByteSize: ArrayBuffer | ArrayBufferView | number, usage: BufferUsage, label?: string): WebGLBuffer {
        const buffer = gl.createBuffer();
        if (!buffer) {
            throw new Error("Failed to create uniform buffer.");
        }

        if(label) {
            (buffer as any)["__SPECTOR_Metadata"] = { name: label };
        }

        gl.bindBuffer(gl.UNIFORM_BUFFER, buffer);
        if (typeof dataOrByteSize === "number") {
            gl.bufferData(gl.UNIFORM_BUFFER, dataOrByteSize, WebGLConverter.convertBufferUsage(usage));
        } else {
            gl.bufferData(gl.UNIFORM_BUFFER, dataOrByteSize, WebGLConverter.convertBufferUsage(usage));
        }

        gl.bindBuffer(gl.UNIFORM_BUFFER, null);
        return buffer;
    }
}