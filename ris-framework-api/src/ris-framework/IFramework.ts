import {IRenderer} from "./rendering/IRenderer";
import {IGeometryBuilder} from "./geometry/IGeometryBuilder";
import {ISpriteBatch} from "./sprites/ISpriteBatch";
import {IRenderPipelineFactory} from "./rendering/render-pipelines/IRenderPipelineFactory";

/**
 * The framework interface.
 */
export interface IFramework {

    /**
     * The renderer used by the framework.
     */
    readonly renderer: IRenderer;

    /**
     * The spritebatch.
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
