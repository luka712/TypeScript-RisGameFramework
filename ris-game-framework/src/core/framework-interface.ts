import type { IRenderer } from "./renderer/IRenderer";
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
     * Initializes the framework.
     */
    initalize(): void;

}
