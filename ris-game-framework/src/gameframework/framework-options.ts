import { TextureSamplerFilteringPreset } from "../core/rendering/enums";

/**
 * The options for configuring the Framework.
 */
export class FrameworkOptions {

    constructor() {}

    /** 
     * The HTMLCanvasElement to use for rendering. 
     * If null, a new canvas will be created and added to the document body.
     */
    canvas: HTMLCanvasElement|null = null;

    /**
     * The texture filtering preset to use for textures created by the framework. 
     * By default, it is set to BILINEAR, which provides a good balance between performance and quality.
     */
    textureFiltering = TextureSamplerFilteringPreset.BILINEAR;
}