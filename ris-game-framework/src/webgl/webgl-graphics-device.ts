import type { RenderPassDescriptor } from "../core/rendering/render-pass/render-pass-descriptor";
import type { IRenderPass } from "../core/rendering/render-pass/render-pass-interface";
import type { ISampler } from "../core/rendering/sampler/sampler-interface";
import type { SamplerDescriptor } from "../core/rendering/sampler/sampler-descriptor";
import type { SwapChainDescriptor } from "../core/rendering/swap-chain/swap-chain-descriptor";
import type { ISwapChain } from "../core/rendering/swap-chain/swap-chain-interface";
import type { IWindowManager } from "../core/window/window-manager-interface";
import { WebGLSwapChain } from "./swap-chain/webgl-swap-chain";
import { WebGLSampler } from "./sampler/webgl-sampler";
import { WebGLRenderPass } from "./render-pass/webgl-render-pass";
import { AGraphicsDevice, GraphicsDeviceDescriptor } from "../core/rendering/a-graphics-device";
import type { BlendStateDescriptor } from "../core/rendering/blending/blend-state-descriptor";
import type { IBlendState } from "../core/rendering/blending/blend-state-interface";
import { WebGLBlendState } from "./blending/webgl-blend-state";

export class WebGLGraphicsDevice extends AGraphicsDevice {


    private readonly _windowManager: IWindowManager;
    private _canvas: HTMLCanvasElement = null!;
    private _gl: WebGL2RenderingContext = null!;

    /**
     * The constructor.
     * @param windowManager The window manager that provides access to the canvas element and other window-related functionalities needed for initializing the graphics device and creating rendering contexts. 
     * @param descriptor The descriptor for the graphics device. This is used to configure the graphics device during initialization.
     */
    public constructor(windowManager: IWindowManager, descriptor: GraphicsDeviceDescriptor) {

        super(descriptor);
        this._windowManager = windowManager;
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

        super.initialize();
    }

    /** @inheritdoc */
    public createSwapChain(canvas: HTMLCanvasElement, swapChainDescriptor: SwapChainDescriptor): ISwapChain {
        return new WebGLSwapChain(canvas);
    }

    /** @inheritdoc */
    public createSampler(descriptor?: SamplerDescriptor): ISampler {
        return new WebGLSampler(this, descriptor);
    }

    /** @inheritdoc */
    public createRenderPass(descriptor: RenderPassDescriptor): IRenderPass {
        return new WebGLRenderPass(this, descriptor);
    }

    /** @inheritdoc */
    public createBlendState(descriptor: BlendStateDescriptor): IBlendState {
        return new WebGLBlendState(this, descriptor);
    }
}