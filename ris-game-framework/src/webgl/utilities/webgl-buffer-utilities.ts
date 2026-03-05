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
        return buffer;
    }
}