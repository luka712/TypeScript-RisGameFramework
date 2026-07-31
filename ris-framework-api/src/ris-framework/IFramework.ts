import {IRenderer} from "./rendering/IRenderer";
import {IGeometryBuilder} from "./geometry/IGeometryBuilder";
import {ISpriteBatch} from "./sprites/ISpriteBatch";
import {IRenderPipelineFactory} from "./rendering/render-pipelines/IRenderPipelineFactory";
import {IBufferFactory} from "./rendering/buffers/IBufferFactory";
import {ICameraFactory} from "./camera/ICameraFactory";
import {ITextureFactory} from "./rendering/texture/ITextureFactory";
import {IContentManager} from "./content/IContentManager";

/**
 * The framework interface.
 */
export interface IFramework {

    /**
     * The renderer used by the framework.
     */
    readonly renderer: IRenderer;

    /**
     * The SpriteBatch.
     */
    readonly spriteBatch: ISpriteBatch;

    /**
     * The geometry builder.
     */
    readonly geometryBuilder: IGeometryBuilder;

    /**
     * The render pipeline factory.
     */
    readonly renderPipelineFactory: IRenderPipelineFactory;

    /**
     * The buffer factory.
     */
    readonly bufferFactory: IBufferFactory;

    /**
     * The camera factory.
     */
    readonly cameraFactory: ICameraFactory;

    /**
     * The texture factory.
     */
    readonly textureFactory: ITextureFactory;

    /**
     * The content manager.
     */
    readonly content: IContentManager;

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
