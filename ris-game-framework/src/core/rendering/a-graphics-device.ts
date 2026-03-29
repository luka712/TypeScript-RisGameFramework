import { TextureSamplerFilteringPreset } from "./enums";
import type { IGraphicsDevice } from "./graphics-device-interface";
import type { RenderPassDescriptor } from "./render-pass/render-pass-descriptor";
import type { IRenderPass } from "./render-pass/render-pass-interface";
import { MipmapSamplerFilter, SamplerFilter } from "./sampler/enums";
import { SamplerDescriptor } from "./sampler/sampler-descriptor";
import type { ISampler } from "./sampler/sampler-interface";
import type { SwapChainDescriptor } from "./swap-chain/swap-chain-descriptor";
import type { ISwapChain } from "./swap-chain/swap-chain-interface";

/**
 * The descriptor for the graphics device. This is used to configure the graphics device during initialization.
 */
export class GraphicsDeviceDescriptor {

    /**
     * Defines the preset for texture sampler filtering. 
     * This is used to configure the default texture sampler in the graphics device.
     *  The default texture sampler is used when a texture is sampled without a specific sampler being bound.
     */
    public samplerFilteringPreset = TextureSamplerFilteringPreset.BILINEAR;
}

/**
 * The abstract base class for graphics devices.
 */
export abstract class AGraphicsDevice implements IGraphicsDevice {

    protected readonly _descriptor: GraphicsDeviceDescriptor;
    protected _defaultTextureSampler: ISampler = null!;

    /**
     * The constructor.
     * @param descriptor The descriptor for the graphics device. This is used to configure the graphics device during initialization.
     */
    constructor(descriptor: GraphicsDeviceDescriptor) {
        this._descriptor = descriptor;
    }

    /** @inheritdoc */
    public get defaultTextureSampler(): ISampler {
        return this._defaultTextureSampler;
    }

    /**
     * Configures and creates the default texture sampler based on the sampler filtering preset specified in the graphics device descriptor. The method creates a new sampler descriptor, sets its properties according to the selected filtering preset, and then creates and returns a new sampler using the configured descriptor.
     * @returns The default texture sampler configured according to the sampler filtering preset specified in the graphics device descriptor.
     */
    protected configureAndCreateDefaultSampler() :ISampler {
        var samplerDescriptor = new SamplerDescriptor();
        samplerDescriptor.minFilter = this._descriptor.samplerFilteringPreset == TextureSamplerFilteringPreset.POINT ? SamplerFilter.NEAREST : SamplerFilter.LINEAR;
        samplerDescriptor.magFilter = this._descriptor.samplerFilteringPreset == TextureSamplerFilteringPreset.POINT ? SamplerFilter.NEAREST : SamplerFilter.LINEAR;
        samplerDescriptor.mipMapFilter = this._descriptor.samplerFilteringPreset == TextureSamplerFilteringPreset.TRILINEAR ? MipmapSamplerFilter.LINEAR : MipmapSamplerFilter.NONE;
        return this.createSampler(samplerDescriptor);
    }

    /** @inheritdoc */
    public initialize(): void {
        this._defaultTextureSampler = this.configureAndCreateDefaultSampler();
    }

    /** @inheritdoc */
    public abstract createSwapChain(canvas: HTMLCanvasElement, swapChainDescriptor: SwapChainDescriptor): ISwapChain;

    /** @inheritdoc */
    public abstract createSampler(descriptor?: SamplerDescriptor): ISampler;

    /** @inheritdoc */
    public abstract createRenderPass(descriptor: RenderPassDescriptor): IRenderPass;
}