import {RenderingBackend} from "./rendering/RenderingBackend";
import {ISpriteBatch} from "./sprites/ISpriteBatch";
import {IRenderer} from "./rendering/IRenderer";
import {IGraphicsDevice} from "./rendering/IGraphicsDevice";
import {IRenderPipelineFactory} from "./rendering/render-pipelines/IRenderPipelineFactory";
import {IBufferFactory} from "./rendering/buffers/IBufferFactory";
import {IGeometryBuilder} from "./geometry/IGeometryBuilder";
import {ICameraFactory} from "./camera/ICameraFactory";
import {ITextureFactory} from "./rendering/texture/ITextureFactory";
import {IContentManager} from "./content/IContentManager";
import {IImageLoader} from "./loaders/IImageLoader";
import {IMeshFactory} from "./meshes/IMeshFactory";
import {IMaterialFactory} from "./material/IMaterialFactory";

/**
 * The framework interface.
 */
export interface IFramework {

    /**
     * The image loader.
     */
    readonly imageLoader: IImageLoader;

    /**
     * The used rendering backend.
     */
    readonly renderingBackend: RenderingBackend;

    /**
     * The sprite batches.
     */
    readonly spriteBatch: ISpriteBatch;

    /**
     * The renderer used by the framework.
     */
    readonly renderer: IRenderer;

    /**
     * The graphics device used by the framework.
     */
    readonly graphicsDevice: IGraphicsDevice;

    /**
     * The pipeline factory.
     * Responsible for creating low-level rendering pipelines.
     * Pipeline includes everything necessary to render some geometry
     * and can be thought of as a material or renderer.
     */
    readonly renderPipelineFactory: IRenderPipelineFactory;

    /**
     * The buffer factory, responsible for creating GPU memory buffers.
     */
    readonly bufferFactory: IBufferFactory;

    /**
     * The geometry builder.
     */
    readonly geometryBuilder: IGeometryBuilder;

    /**
     * The texture factory.
     * Responsible for creating textures.
     */
    readonly textureFactory: ITextureFactory;

    /**
     * The camera factory.
     */
    readonly cameraFactory: ICameraFactory;

    /**
     * The content manager.
     */
    readonly content: IContentManager;

    /**
     * The mesh factory.
     */
    readonly meshFactory: IMeshFactory;

    /**
     * The material factory.
     */
    readonly materialFactory: IMaterialFactory;

    /**
     * Called right after the framework is initialized and before the render loop starts.
     * Content can be loaded here.
     */
    addOnLoadContentListener(event: () => void): void;
    /**
     * Called right after the framework is initialized and before the render loop starts.
     * Content can be loaded here.
     */
    removeOnLoadContentListener(event: () => void): void;
    /**
     * Called when the framework is initialized.
     */
    addOnInitializedListener(event: () => void): void;
    /**
     * Called when the framework is initialized.
     */
    removeOnInitializedListener(event: () => void): void;
    /**
     * Called when the framework is rendered.
     */
    addOnRenderListener(event: () => void): void;
    /**
     * Called when the framework is rendered.
     */
    removeOnRenderListener(event: () => void): void;
    /**
     * Initializes the framework.
     */
    initialize(): void;

}
