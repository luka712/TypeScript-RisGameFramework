import type { vec2 } from "gl-matrix";
import type { TextureFormat } from "../../../common/texture-enums";

export interface ISwapChain {

    /**
     * The size of the back buffer, represented as a 2D vector.
     */
    readonly backBufferSize: vec2;

    /**
     * The format of the texture used for the back buffer, which determines how pixel data is stored and interpreted.
     */
    readonly textureFormat: TextureFormat;

    /**
     * Sets the size of the back buffer, allowing for dynamic resizing of the rendering area.
     * This is important for handling window resizing and ensuring that the rendered content fits the display correctly.
     * @param width The new width of the back buffer.
     * @param height The new height of the back buffer.
     */
    setSize(width: number, height: number): void;

    /**
     * Presents the rendered content to the display, swapping the back buffer with the front buffer.
     */
    present(): void;
}