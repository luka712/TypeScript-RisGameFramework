import { TextureFormat } from "../../common/texture-enums";
import type { Color } from "../math/color";
import type { IGraphicsDevice } from "../rendering/graphics-device-interface";
import type { IRenderer } from "./renderer-interface";
import type { RenderingLimits } from "./RenderingLimits";
import { SwapChainDescriptor } from "../rendering/swap-chain/swap-chain-descriptor";
import type { ISwapChain } from "../rendering/swap-chain/swap-chain-interface";
import type { IWindowManager } from "../window/window-manager-interface";
import type { IFramework } from "../framework-interface";
import type { IRenderPass } from "../rendering/render-pass/render-pass-interface";
import type { IMainRenderTargetRenderPipeline } from "../render-pipelines/main-render-target-render-pipeline-interface";
import { RenderPassColorAttachment, RenderPassDepthStencilAttachment } from '../rendering/render-pass/render-pass-descriptor';
import type { ITexture2D } from "../rendering/texture/texture";

export abstract class ARendererer implements IRenderer {

    protected readonly _framework: IFramework;
    private readonly _windowManager: IWindowManager;
    private _graphicsDevice: IGraphicsDevice = null!;
    private _preferredTextureFormat: TextureFormat = TextureFormat.BGRA_8_UNORM;
    private _preferredDepthStencilFormat: TextureFormat = TextureFormat.DEPTH_24_STENCIL_8;

    protected _swapChain: ISwapChain = null!;
    protected _mainRenderTarget: ITexture2D = null!;
    protected _depthStencilBuffer: ITexture2D = null!;
    protected _swapChainRenderPass: IRenderPass = null!;
    protected _mainRenderTargetRenderPass: IRenderPass = null!;
    protected _mainRenderTargetPipeline: IMainRenderTargetRenderPipeline = null!;


    public get graphicsDevice(): IGraphicsDevice {
        return this._graphicsDevice;
    }
    public get clearColor(): Color {
        throw new Error("Method not implemented.");
    }
    public get limits(): RenderingLimits | null {
        throw new Error("Method not implemented.");
    }

    /** @inheritdoc */
    public get preferredTextureFormat(): TextureFormat {
        return this._preferredTextureFormat;
    }

    /** @inheritdoc */
    public get preferredDepthStencilFormat(): TextureFormat {
        return this._preferredDepthStencilFormat;
    }

    constructor(framework: IFramework) {
        this._framework = framework;
        this._windowManager = framework.windowManager;
    }

    /**
     * Creates the graphics device for the renderer.
     *  This is an abstract method that must be implemented by subclasses to provide the specific graphics device implementation for the renderer.
     * @returns The graphics device for the renderer.
     */
    protected abstract createGraphicsDevice(): IGraphicsDevice;

    /** @inheritdoc */
    public initialize(): void {
        this._graphicsDevice = this.createGraphicsDevice();
        this._graphicsDevice.initialize();
        this._swapChain = this._graphicsDevice.createSwapChain(this._windowManager.canvas, new SwapChainDescriptor());
        this._preferredTextureFormat = this._swapChain.textureFormat

        // TODO: RESIZE EVENT

    }

    /** @inheritdoc */
    public afterInitialize(): void {

        this._swapChainRenderPass = this._graphicsDevice.createRenderPass({
            colorAttachments: [new RenderPassColorAttachment(undefined, this._swapChain)]
        });

        this._mainRenderTarget = this._framework.textureFactory.createEmpty(
            this._swapChain.backBufferSize[0],
            this._swapChain.backBufferSize[1],
        );

        this._depthStencilBuffer = this._framework.textureFactory.createEmpty(
            this._swapChain.backBufferSize[0],
            this._swapChain.backBufferSize[1],
            undefined,
            undefined,
            undefined,
            undefined,
            this.preferredDepthStencilFormat,
        );

        this._mainRenderTargetPipeline = this._framework.renderPipelineFactory.createMainRenderTargetRenderPipeline(this._mainRenderTarget);

        this._mainRenderTargetRenderPass = this._graphicsDevice.createRenderPass({
            colorAttachments: [new RenderPassColorAttachment(this._mainRenderTarget)],
            depthStencilAttachment: new RenderPassDepthStencilAttachment(this._depthStencilBuffer)
        });
    }

    /** @inheritdoc */
    public beginRenderPass(): void {
        this._mainRenderTargetRenderPass.beginPass();
    }

    /** @inheritdoc */
    public endRenderPass(): void {
        this._mainRenderTargetRenderPass.endPass();

        this._swapChainRenderPass.beginPass();
        this._mainRenderTargetPipeline.render();
        this._swapChainRenderPass.endPass();

        this._swapChain.present();
    }

}