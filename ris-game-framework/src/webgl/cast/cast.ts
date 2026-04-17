import type { IIndexBuffer } from "../../core/buffers/index-buffer-interface";
import type { IVertexBuffer } from "../../core/buffers/vertex-buffer-interface";
import type { IRenderer } from "../../core/renderer/renderer-interface";
import type { IBlendState } from "../../core/rendering/blending/blend-state-interface";
import type { ITexture2D } from "../../core/rendering/texture/texture";
import { WebGlBlendState } from "../blending/webgl-blend-state";
import { WebGLIndexBuffer } from "../buffers/webgl-index-buffer";
import { WebGLVertexBuffer } from "../buffers/webgl-vertex-buffer";
import { WebGLTexture2D } from "../texture/webgl-texture-2d";
import { WebGLGraphicsDevice } from "../webgl-graphics-device";
import { WebGLRenderer } from "../webgl-renderer";

/**
 * Casts the given renderer to a WebGLRenderer. If the renderer is not a WebGLRenderer, an error is thrown.
 * @param renderer The renderer to cast.
 * @returns The given renderer casted to a WebGLRenderer.
 */
export function asWebGLRenderer(renderer: IRenderer): WebGLRenderer {
    if (renderer instanceof WebGLRenderer) {
        return renderer;
    } else {
        throw new Error("Renderer is not a WebGLRenderer.");
    }
}

/**
 * Casts the given texture to a WebGLTexture2D. If the texture is not a WebGLTexture2D, an error is thrown.
 * @param texture The texture to cast.
 * @returns The given texture casted to a WebGLTexture2D.
 */
export function asWebGLTexture2D(texture: ITexture2D): WebGLTexture2D {
    if (texture instanceof WebGLTexture2D) {
        return texture;
    } else {
        throw new Error("Texture is not a WebGLTexture2D.");
    }
}

/**
 * Casts the given vertex buffer to a WebGLVertexBuffer. If the vertex buffer is not a WebGLVertexBuffer, an error is thrown.
 * @param vertexBuffer The vertex buffer to cast.
 * @returns The given vertex buffer casted to a WebGLVertexBuffer.
 */
export function asWebGLVertexBuffer(vertexBuffer: IVertexBuffer): WebGLVertexBuffer {
    if (vertexBuffer instanceof WebGLVertexBuffer) {
        return vertexBuffer;
    } else {
        throw new Error("Vertex buffer is not a WebGLVertexBuffer.");
    }
}

/**
 * Casts the given index buffer to a WebGLIndexBuffer. If the index buffer is not a WebGLIndexBuffer, an error is thrown.
 * @param indexBuffer The index buffer to cast.
 * @returns The given index buffer casted to a WebGLIndexBuffer.
 */
export function asWebGLIndexBuffer(indexBuffer: IIndexBuffer): WebGLIndexBuffer {
    if (indexBuffer instanceof WebGLIndexBuffer) {
        return indexBuffer;
    } else {
        throw new Error("Index buffer is not a WebGLIndexBuffer.");
    }
}

/**
 * Casts the given graphics device to a WebGLGraphicsDevice. If the graphics device is not a WebGLGraphicsDevice, an error is thrown.
 * @param graphicsDevice The graphics device to cast.
 * @returns The given graphics device casted to a WebGLGraphicsDevice.
 */
export function asWebGLGraphicsDevice(graphicsDevice: IRenderer["graphicsDevice"]): WebGLGraphicsDevice {
    if (graphicsDevice instanceof WebGLGraphicsDevice   ) {
        return graphicsDevice as WebGLGraphicsDevice;
    } else {
        throw new Error("Graphics device is not a WebGL graphics device.");
    }   
}

/**
 * Casts the given blend state to a WebGLBlendState. If the blend state is not a WebGLBlendState, an error is thrown.
 * @param blendState The blend state to cast.
 * @returns The given blend state casted to a WebGLBlendState.
 */
export function asWebGLBlendState(blendState: IBlendState): WebGlBlendState {
    if (blendState instanceof WebGlBlendState) {
        return blendState as WebGlBlendState;
    } else {
        throw new Error("Blend state is not a WebGL blend state.");
    }
}