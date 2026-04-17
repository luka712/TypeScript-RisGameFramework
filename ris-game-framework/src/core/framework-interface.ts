import type { IBuffersFactory } from "./buffers/buffers-factory-interface";
import type { IRenderer } from "./renderer/renderer-interface";
import type { IWindowManager } from "./window/window-manager-interface";
import type { IGeometryBuilder } from "./geometry/geometry-builder-interface";
import type { IRenderPipelineFactory } from "./render-pipelines/render-pipeline-factory-interface";
import type { ITextureFactory } from "./rendering/texture/texture-factory";
import type { ShaderLoader } from "./shader/shader-loader";
import type { IContentManager } from "./content/content-manager-interface";

export interface IFramework {

    /**
     * Gets the window manager associated with this framework.
     * @returns The IWindowManager instance.
     */
    get windowManager(): IWindowManager;

    /**
     * Gets the renderer associated with this framework.
     * @returns The IRenderer instance.
     */
    get renderer(): IRenderer;

    /**
     * The texture factory associated with this framework. This is used to create textures for the renderer.
     * @returns The ITextureFactory instance.
     */
    get textureFactory(): ITextureFactory;

    /**
     * The buffers factory associated with this framework. This is used to create buffers for the renderer.
     * @returns The IBuffersFactory instance.
     */
    get buffersFactory(): IBuffersFactory;

    /**
     * Gets the geometry builder associated with this framework. This is used to create geometries for the renderer.
     * @return The IGeometryBuilder instance.
     */
    get geometryBuilder(): IGeometryBuilder

    /**
     * The render pipeline factory associated with this framework. This is used to create render pipelines for the renderer.
     * @return The RenderPipelineFactoryInterface instance.
     */
    get renderPipelineFactory(): IRenderPipelineFactory;

    /**
     * Gets the shader loader associated with this framework. This is used to load shader source code for the renderer.
     * @return The ShaderLoader instance.
     */
    get shaderLoader(): ShaderLoader;

    /**
     * Gets the content manager associated with this framework. This is used to load content for the renderer.
     * @return The IContentManager instance.
     */
    get content(): IContentManager;

    /**
     * Initializes the framework.
     */
    initalize(): void;

}
