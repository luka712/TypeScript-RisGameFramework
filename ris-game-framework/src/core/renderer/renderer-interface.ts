import { vec2 } from "gl-matrix";
import type { TextureFormat } from "../../common/texture-enums";
import type { Color } from "../math/color";
import type { RenderingLimits } from "./RenderingLimits";
import type { IGraphicsDevice } from '../rendering/graphics-device-interface';
import { TextureSamplerFilteringPreset } from "../rendering/enums";

export const RenderConfigurationSymbol = Symbol("RenderConfiguration");

/**
 * The configuration for the renderer. This is used to initialize the renderer.
 */
export class RenderConfiguration {

    /**
     * The size of the main frame buffer. This is used to initialize the main render target.
     */
    frameBufferSize: vec2 = vec2.fromValues(800, 600);

    /**
     * The preset for texture sampler filtering.
     *  This is used to configure the default texture sampler in the graphics device. 
     * The default texture sampler is used when a texture is sampled without a specific sampler being bound.
     */
    textureFiltering = TextureSamplerFilteringPreset.BILINEAR;
}

/**
 * The interface for renderers.
 */
export interface IRenderer {

    /**
     * The clear color used by the renderer.
     */
    clearColor: Color

    /**
     * The rendering limits of the renderer.
     */
    limits: RenderingLimits | null;

    /**
     * The graphics device used by the renderer. 
     * This is used to create resources and manage the rendering context.
     */
    readonly graphicsDevice: IGraphicsDevice;

    /**
     * The preferred texture format for the renderer.
     * @returns The preferred texture format for the renderer.
     */
    get preferredTextureFormat(): TextureFormat;

    /**
     * The preferred depth stencil format for the renderer.
     * @returns The preferred depth stencil format for the renderer.
     */
    get preferredDepthStencilFormat(): TextureFormat;

    /**
     * Initializes the renderer.
     */
    initialize(): void;

    /**
     * Performs any additional initialization steps after the main initialization is complete.
     * This can be used to set up resources that depend on the graphics device or swap chain being initialized.
     */
    afterInitialize(): void;

    /**
     * Begins a new render pass.
     */
    beginRenderPass(): void;

    /**
     * Ends the current render pass.
     */
    endRenderPass(): void;
}