import type { IFramework } from "../core/framework-interface";
import type { IGraphicsDevice } from "../core/rendering/graphics-device-interface";
import type { RenderPassDescriptor } from "../core/rendering/render-pass/render-pass-descriptor";
import type { IRenderPass } from "../core/rendering/render-pass/render-pass-interface";
import type { SwapChainDescriptor } from "../core/rendering/swap-chain/swap-chain-descriptor";
import type { ISwapChain } from "../core/rendering/swap-chain/swap-chain-interface";
import type { IWindowManager } from "../core/window/window-manager-interface";
import { WebGLSwapChain } from "./swap-chain/webgl-swap-chain";

export class WebGLGraphicsDevice implements IGraphicsDevice {

    private readonly _windowManager: IWindowManager;
    private _canvas: HTMLCanvasElement = null!;
    private _gl: WebGL2RenderingContext = null!;

    public constructor(windowManager: IWindowManager) {
        this._windowManager = windowManager;
    }
    createRenderPass(descriptor: RenderPassDescriptor): IRenderPass {
        throw new Error("Method not implemented.");
    }

    /**
     * The WebGL rendering context.
     */
    public get gl(): WebGL2RenderingContext {
        return this._gl;
    }


    /** @inheritdoc */
    public initialize(): void {
        this._canvas = this._windowManager.canvas;

        const contextOptions: WebGLContextAttributes = {
            antialias: false,
            // powerPreference: "high-performance", // TODO: Make configurable.
        };

        this._gl = this._canvas.getContext(
            "webgl2",
            contextOptions,
        ) as WebGL2RenderingContext;

        // If not supported, throw an error.
        if (!this._gl) {
            throw new Error("WebGL not supported.");
        }
    }

    /** @inheritdoc */
    public createSwapChain(canvas: HTMLCanvasElement, swapChainDescriptor: SwapChainDescriptor): ISwapChain {
        return new WebGLSwapChain(canvas);
    }
}