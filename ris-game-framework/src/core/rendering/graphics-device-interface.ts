import { SwapChainDescriptor } from './swap-chain/swap-chain-descriptor';
import type { ISwapChain } from './swap-chain/swap-chain-interface';
import type { RenderPassDescriptor } from './render-pass/render-pass-descriptor';
import type { IRenderPass } from './render-pass/render-pass-interface';

/**
 * This file defines the IGraphicsDevice interface,
 *  which serves as an abstraction layer for graphics device operations.
 *  It provides a common interface for different graphics APIs (e.g., WebGL, WebGPU) to implement their 
 * specific rendering functionalities while maintaining a consistent API for the rest of the application.
 *  The IGraphicsDevice interface may include methods for creating render targets, managing resources, and handling rendering states.
 */
export interface IGraphicsDevice{

    /**
     * Initializes the graphics device, setting up necessary resources and configurations for rendering operations.
     */
    initialize(): void;

    /**
     * Creates a swap chain based on the provided descriptor, which contains configuration details for the swap chain.
     * @param canvas The HTML canvas element to associate with the swap chain.
     * @param swapChainDescriptor The descriptor containing configuration details for the swap chain.
     */
    createSwapChain(canvas:HTMLCanvasElement, swapChainDescriptor: SwapChainDescriptor): ISwapChain;

    /**
     * Creates a render pass based on the provided descriptor, which contains configuration details for the render pass.
     * @param descriptor The descriptor containing configuration details for the render pass.
     * @returns An instance of IRenderPass that represents the created render pass.
     */
    createRenderPass(descriptor: RenderPassDescriptor) : IRenderPass;
}