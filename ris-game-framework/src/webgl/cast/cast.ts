import type { IRenderer } from "../../core/renderer/renderer-interface";
import type { ITexture2D } from "../../core/texture/texture";
import type { IRenderTarget2D } from "../../render-target/render-target-2d";
import { WebGLRenderTarget2D } from "../render-target/webgl-render-target-2d";
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

/**
 * Casts the given render target to a WebGLRenderTarget2D. If the render target is not a WebGLRenderTarget2D, an error is thrown.
 * @param renderTarget The render target to cast.
 * @returns The given render target casted to a WebGLRenderTarget2D.
 */
export function asWebGLRenderTarget2D(renderTarget: IRenderTarget2D): WebGLRenderTarget2D {
    if (renderTarget instanceof WebGLRenderTarget2D) {
        return renderTarget;
    } else {
        throw new Error("Render target is not a WebGLRenderTarget2D.");
    }
}