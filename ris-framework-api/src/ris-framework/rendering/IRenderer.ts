import {Color} from "../data/Color";
import {IGraphicsDevice} from "./IGraphicsDevice";
import {vec2} from "gl-matrix";
import {TextureFormat} from "./texture/TextureFormat";

/**
 * The interface for a renderer.
 */
export interface IRenderer {

    /**
     * The graphics device used by the renderer.
     */
    readonly graphicsDevice: IGraphicsDevice;

    /**
     * The surface preferred a texture format.
     */
    readonly preferredTextureFormat : TextureFormat;

    /**
     * The clear color of the renderer.
     Framebuffer will be cleared with this color at the beginning of the frame.
     */
    clearColor: Color;

    /**
     * The back buffer size.
     */
    backBufferSize: vec2;
}
