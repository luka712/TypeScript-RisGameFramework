import { SwapChainDescriptor } from './swap-chain/swap-chain-descriptor';
import type { ISwapChain } from './swap-chain/swap-chain-interface';
import type { RenderPassDescriptor } from './render-pass/render-pass-descriptor';
import type { IRenderPass } from './render-pass/render-pass-interface';
import type { ISampler } from './sampler/sampler-interface';
import type { SamplerDescriptor } from './sampler/sampler-descriptor';
import type { IBlendState } from './blending/blend-state-interface';
import type { BlendStateDescriptor } from './blending/blend-state-descriptor';

/**
 * This file defines the IGraphicsDevice interface,
 *  which serves as an abstraction layer for graphics device operations.
 *  It provides a common interface for different graphics APIs (e.g., WebGL, WebGPU) to implement their 
 * specific rendering functionalities while maintaining a consistent API for the rest of the application.
 *  The IGraphicsDevice interface may include methods for creating render targets, managing resources, and handling rendering states.
 */
export interface IGraphicsDevice {

    /**
     * The default texture sampler. 
     * This sampler is used for sampling textures when no other sampler is specified.
     *  It is configured based on the graphics device descriptor and can be overridden by derived classes to provide custom sampler configurations.
     */
    readonly defaultTextureSampler: ISampler;

    /**
     * The default blend state.
     *  This blend state is used for blending operations when no other blend state is specified. It is configured based on the graphics device descriptor and can be overridden by derived classes to provide custom blend state configurations.
     */
    readonly defaultBlendState: IBlendState;

    /**
     * Initializes the graphics device, setting up necessary resources and configurations for rendering operations.
     */
    initialize(): void;

    /**
     * Creates a swap chain based on the provided descriptor, which contains configuration details for the swap chain.
     * @param canvas The HTML canvas element to associate with the swap chain.
     * @param swapChainDescriptor The descriptor containing configuration details for the swap chain.
     */
    createSwapChain(canvas: HTMLCanvasElement, swapChainDescriptor: SwapChainDescriptor): ISwapChain;

    /**
     * Creates a render pass based on the provided descriptor, which contains configuration details for the render pass.
     * @param descriptor The descriptor containing configuration details for the render pass.
     * @returns An instance of IRenderPass that represents the created render pass.
     */
    createRenderPass(descriptor: RenderPassDescriptor): IRenderPass;

    /**
     * Creates a sampler, which is used to sample textures in the shader. 
     * The sampler defines how the texture is sampled, including filtering methods and address modes.
     * @param descriptor The descriptor containing configuration details for the sampler. This parameter is optional, and if not provided, default values will be used for the sampler configuration.
     * @returns An instance of ISampler that represents the created sampler.
     */
    createSampler(descriptor?: SamplerDescriptor): ISampler;

    /**
     * Creates a blend state, which defines how the output of a fragment shader is blended with the existing color in the render target.
     * @param descriptor The descriptor containing configuration details for the blend state, including blend factors, blend operations, and color write masks.
     * @return An instance of IBlendState that represents the created blend state.
     */
    createBlendState(descriptor: BlendStateDescriptor): IBlendState;
}