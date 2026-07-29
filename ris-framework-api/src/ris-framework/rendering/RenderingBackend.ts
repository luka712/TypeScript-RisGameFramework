/**
 * The renderer type.
 */
export enum RenderingBackend {

    /**
     * If default is set, the renderer will be chosen automatically.
     */
    DEFAULT = 0,

    /**
     * The WebGPU rendering backend.
     */
    WEB_GPU = 1,

    /**
     * The WebGL rendering backend.
     */
    WEBGL = 2,
}
