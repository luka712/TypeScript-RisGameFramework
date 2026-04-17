import { WebGLBlendingUtilities } from "./webgl-blending-utilities";
import { WebGLBufferUtilities } from "./webgl-buffer-utilities";
import { WebGLCullingUtilities } from "./webgl-culling-utilities";
import { WebGLFilterAnisotropicUtilities } from "./webgl-filter-anisotropic-utilities";
import { WebGLFrameBufferUtilities } from "./webgl-framebuffer-utilities";
import { WebGLProgramUtilities } from "./webgl-program-utilities";
import { WebGLRenderbufferUtilities } from "./webgl-renderbuffer-utilities";
import { WebGLSamplerUtilities } from "./webgl-sampler-utilities";
import { WebGLShaderUtilities } from "./webgl-shader-utilities";
import { WebGLTextureUtilities } from "./webgl-texture-utilities";

/**
 * The utility class for WebGL operations.
 */
export class WebGLUtilities {

    /**
     * The WebGL blending utilities.
     */
    public static readonly blending = new WebGLBlendingUtilities();

    /**
     * The WebGL anisotropic filtering utilities.
     */
    public static readonly anisotropy = new WebGLFilterAnisotropicUtilities();

    /**
     * The WebGL culling utilities.
     */
    public static readonly culling = new WebGLCullingUtilities();

    /**
     * The WebGL texture utilities.
     */
    public static readonly texture = new WebGLTextureUtilities();

    /**
     * The WebGL framebuffer utilities.
     */
    public static readonly framebuffer = new WebGLFrameBufferUtilities();

    /**
     * The WebGL render buffer utilities.
     */
    public static readonly renderbuffer = new WebGLRenderbufferUtilities();

    /**
     * The WebGL buffer utilities.
     */
    public static readonly buffer = new WebGLBufferUtilities();

    /**
     * The WebGL render buffer utilities.
     */
    public static readonly renderBuffer = new WebGLRenderbufferUtilities();

    /**
     * The WebGL sampler utilities.
     */
    public static readonly sampler = new WebGLSamplerUtilities();

    /**
     * The WebGL shader utilities.
     */
    public static readonly shader = new WebGLShaderUtilities();

    /**
     * The WebGL program utilities.
     */
    public static readonly program = new WebGLProgramUtilities();
}
