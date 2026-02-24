import type { TextureFormat } from "../common/texture-enums";
import type { IRenderTargetFactory } from "../render-target/render-target-factory";
import type { IRenderer } from "./renderer/renderer-interface";
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
     * The render target factory associated with this framework. This is used to create render targets for the renderer.
     * @return The IRenderTargetFactory instance.
     */
    get renderTargetFactory(): IRenderTargetFactory;

    /**
     * Initializes the framework.
     */
    initalize(): void;

}
