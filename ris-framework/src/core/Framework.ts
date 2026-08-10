import {container, type DependencyContainer} from "tsyringe";
import {WindowManager} from "./window/window-manager.ts";
import {FrameworkOptions} from "./framework-options.ts";
import {IFrameworkSymbol} from "./dependency-injection/register-services-interface.ts";
import { RenderConfiguration, RenderConfigurationSymbol} from "./renderer/renderer-interface.ts";
import {GeometryBuilder} from "../geometry/GeometryBuilder.ts";
import type {ITextureFactory} from "./rendering/texture/texture-factory.ts";
import {ContentManager} from "./content/ContentManager.ts";
import {WebGlRenderer} from "../webgl/WebGlRenderer.ts";
import {WebGlBuffersFactory} from "../webgl/buffers/WebGlBuffersFactory.ts";
import type {IBufferFactory, IGeometryBuilder, IGraphicsDevice, ISpriteBatch} from "ris-framework-api";
import {WebGlShaderModuleLoader} from "../webgl/shader/WebGlShaderModuleLoader.ts";
import {TextureSamplerFilteringPreset} from "./rendering/enums.ts";
import {SpriteBatch} from "./sprite-batch/SpriteBatch.ts";
import type {ICameraFactory, IContentManager, IFramework, IRenderer, IWindowManager} from "ris-framework-api";
import {CameraFactory} from "./camera/CameraFactory.ts";
import {WebGlTextureFactory} from "../webgl/texture/WebGlTextureFactory.ts";
import {WebGlRenderPipelineFactory} from "../webgl/render-pipelines/WebGlRenderPipelineFactory.ts";
import type {IRenderPipelineFactory} from "ris-framework-api";

export class Framework implements IFramework {

    private readonly _onRenderListeners: (() => void)[] = [];
private readonly _onLoadContentListeners: (() => void)[] = [];

    private readonly _container: DependencyContainer;
    private readonly _textureFactory: ITextureFactory;
    private readonly _buffersFactory: IBufferFactory;
    private readonly _contentManager: IContentManager;
    private readonly _geometryBuilder: IGeometryBuilder;
    private readonly _cameraFactory: CameraFactory;

    /**
     * The constructor for the Framework class.
     * @param options The optional options for them framework.
     */
    constructor(options: FrameworkOptions | null = null) {
        options = options ?? new FrameworkOptions();

        this._container = container.createChildContainer();
        this.windowManager = new WindowManager(options.canvas);

        // Setup container.
        this._container.registerInstance(IFrameworkSymbol, this);
        const rendererConfig = new RenderConfiguration();
        rendererConfig.textureFiltering = options.textureFiltering ?? TextureSamplerFilteringPreset.BILINEAR;
        this._container.registerInstance(RenderConfigurationSymbol, rendererConfig);
        this.renderer = new WebGlRenderer(this, rendererConfig);
        this._textureFactory = new WebGlTextureFactory(this);
        this._geometryBuilder = new GeometryBuilder();
        this.renderPipelineFactory = new WebGlRenderPipelineFactory(this);
        this._contentManager = new ContentManager(this, new WebGlShaderModuleLoader(this));

        this._buffersFactory = new WebGlBuffersFactory(this);
        this.spriteBatch = new SpriteBatch(this);
        this._cameraFactory = new CameraFactory(this);
    }

    /** @inheritDoc */
    public readonly renderer : IRenderer;

    /** @inheritDoc */
    public readonly spriteBatch: ISpriteBatch;

    /** @inheritDoc */
    public get cameraFactory(): ICameraFactory {
        return this._cameraFactory;
    }

    /** @inheritdoc */
    public addOnLoadContentListener(event: () => void): void {
        this._onLoadContentListeners.push(event);
    }

    /** @inheritdoc */
    public removeOnLoadContentListener(event: () => void): void {
        this._onLoadContentListeners.splice(this._onRenderListeners.indexOf(event), 1);
    }

    /** @inheritdoc */
    public addOnRenderListener(event: () => void): void {
        this._onRenderListeners.push(event);
    }

    /** @inheritdoc */
    public removeOnRenderListener(event: () => void): void {
        this._onRenderListeners.splice(this._onRenderListeners.indexOf(event), 1);
    }

    /** @inheritdoc */
    public get graphicsDevice(): IGraphicsDevice {
        return this.renderer.graphicsDevice;
    }

    /** @inheritdoc */
    public readonly renderPipelineFactory(): IRenderPipelineFactory;

    /** @inheritdoc */
    get geometryBuilder(): IGeometryBuilder {
        return this._geometryBuilder;
    }

    /** @inheritdoc */
    public readonly windowManager: IWindowManager;

    /** @inheritdoc */
    public get textureFactory(): ITextureFactory {
        return this._textureFactory;
    }

    /** @inheritdoc */
    public get bufferFactory(): IBufferFactory {
        return this._buffersFactory;
    }

    /** @inheritdoc */
    public get content(): IContentManager {
        return this._contentManager;
    }

    /** @inheritdoc */
    public initialize(): void {

        this.renderer.initialize();
        this.spriteBatch.initialize();

        // Load content events.
        for(const listener of this._onLoadContentListeners){
            listener();
        }

        this.renderer.afterInitialize();

        this.windowManager.updateEvent(() => {
            // Update logic here
        });
        this.windowManager.renderEvent(() => {
            this.renderer.beginRenderPass();

            // Invoke render listeners.
            for (const listener of this._onRenderListeners) {
                listener();
            }

            this.spriteBatch.frameEnd();
            this.renderer.endRenderPass();
        });
        this.windowManager.runEventLoop();
    }
}
