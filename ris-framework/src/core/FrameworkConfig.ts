import { TextureSamplerFilteringPreset } from "./rendering/enums.ts";
import {vec2} from "gl-matrix";

/**
 * The options for configuring the Framework.
 */
export class FrameworkConfig {

    constructor() {}

    /** 
     * The HTMLCanvasElement to use for rendering. 
     * If null, a new canvas will be created and added to the document body.
     */
    canvas: HTMLCanvasElement|null = null;

    /**
     * The size of a back buffer.
     */
    backBufferSize: vec2 = vec2.fromValues(800,600);

    /**
     * The texture filtering preset to use for textures created by the framework. 
     * By default, it is set to BILINEAR, which provides a good balance between performance and quality.
     */
    textureFiltering? = TextureSamplerFilteringPreset.BILINEAR;
}