import type { IRenderer } from "../../core/renderer/IRenderer";
import type { ITexture2D } from "../../core/texture/texture";
import { WebGLTexture2D } from "../texture/webgl-texture-2d";
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