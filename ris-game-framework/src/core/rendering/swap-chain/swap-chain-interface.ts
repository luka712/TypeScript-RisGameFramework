import type { vec2 } from "gl-matrix";
import type { TextureFormat } from "../../../common/texture-enums";

/**
 * The ISwapChain interface defines the contract for a swap chain, which is responsible for managing the back buffer and presenting rendered content to the display. 
 * A swap chain typically handles the creation and management of the back buffer, as well as the presentation of rendered frames to the screen. 
 * This interface provides methods for resizing the back buffer and presenting the rendered content, as well as properties for accessing the back buffer size and texture format.
 */
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
    resize(width: number, height: number): void;

    /**
     * Presents the rendered content to the display, swapping the back buffer with the front buffer.
     */
    present(): void;
}