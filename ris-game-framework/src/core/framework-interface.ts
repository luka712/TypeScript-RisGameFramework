import type { TextureFormat } from "../common/texture-enums";
import type { IRenderer } from "./renderer/IRenderer";
import type { ITextureFactory } from "./texture/texture-factory";
import type { IWindowManager } from "./window/window-manager-interface";

export interface IFramework {

    /**
     * Gets the window manager associated with this framework.
     * @returns The IWindowManager instance.
     */
    get windowManager(): IWindowManager;

    /**
     * Gets the renderer associated with this framework.
     * @returns The IRenderer instance.
     */
    get renderer(): IRenderer;

    /**
     * The texture factory associated with this framework. This is used to create textures for the renderer.
     * @returns The ITextureFactory instance.
     */
    get textureFactory(): ITextureFactory;

    /**
     * Initializes the framework.
     */
    initalize(): void;

}
