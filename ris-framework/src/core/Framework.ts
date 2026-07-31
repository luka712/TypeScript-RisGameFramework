import {container, type DependencyContainer} from "tsyringe";
import {WindowManager} from "./window/window-manager.ts";
import type {IWindowManager} from "./window/window-manager-interface.ts";
import {WebGLRegisterServices} from "../webgl/webgl-register-services.ts";
import {FrameworkOptions} from "./framework-options.ts";

import {IFrameworkSymbol} from "./dependency-injection/register-services-interface.ts";
import {type ITempRenderer, RenderConfiguration, RenderConfigurationSymbol} from "./renderer/renderer-interface.ts";
import {GeometryBuilder} from "../geometry/GeometryBuilder.ts";
import {
    type IRenderPipelineFactory,
    IRenderPipelineFactorySymbol
} from "./render-pipelines/render-pipeline-factory-interface.ts";
import type {ITextureFactory} from "./rendering/texture/texture-factory.ts";
import {ContentManager} from "./content/ContentManager.ts";
import {WebGlRenderer} from "../webgl/WebGlRenderer.ts";
import {WebGlBuffersFactory} from "../webgl/buffers/WebGlBuffersFactory.ts";
import type {IBufferFactory, IGeometryBuilder, IGraphicsDevice, ISpriteBatch} from "../../../ris-framework-api/src";
import {WebGlShaderModuleLoader} from "../webgl/shader/WebGlShaderModuleLoader.ts";
import {TextureSamplerFilteringPreset} from "./rendering/enums.ts";
import {SpriteBatch} from "./sprite-batch/SpriteBatch.ts";
import type {ICameraFactory, IContentManager, IFramework} from "ris-framework-api";
import {CameraFactory} from "./camera/CameraFactory.ts";
import {WebGlTextureFactory} from "../webgl/texture/WebGlTextureFactory.ts";

export class Framework implements IFramework {

    private readonly _onRenderListeners: (() => void)[] = [];

    private readonly _container: DependencyContainer;
    private readonly _windowManager: IWindowManager;
    private readonly _renderer: ITempRenderer;
    private readonly _textureFactory: ITextureFactory;
    private readonly _buffersFactory: IBufferFactory;
    private readonly _renderPipelineFactory: IRenderPipelineFactory;
    private readonly _contentManager: IContentManager;
    private readonly _geometryBuilder: IGeometryBuilder;
    private readonly _spriteBatch: ISpriteBatch;
    private readonly _cameraFactory: CameraFactory;

    /**
     * The constructor for the Framework class.
     * @param options The optional options for them framework.
     */
    constructor(options: FrameworkOptions | null = null) {
        options = options ?? new FrameworkOptions();

        this._container = container.createChildContainer();
        this._windowManager = new WindowManager(options.canvas);

        // Setup container.
        this._container.registerInstance(IFrameworkSymbol, this);
        const rendererConfig = new RenderConfiguration();
        rendererConfig.textureFiltering = options.textureFiltering ?? TextureSamplerFilteringPreset.BILINEAR;
        this._container.registerInstance(RenderConfigurationSymbol, rendererConfig);
        (new WebGLRegisterServices).register(this._container);
        this._renderer = new WebGlRenderer(this, rendererConfig);
        this._textureFactory = new WebGlTextureFactory(this);
        this._geometryBuilder = new GeometryBuilder();
        this._renderPipelineFactory = this._container.resolve(IRenderPipelineFactorySymbol);
        this._contentManager = new ContentManager(new WebGlShaderModuleLoader(this));

        this._buffersFactory = new WebGlBuffersFactory(this);
        this._spriteBatch = new SpriteBatch(this);
        this._cameraFactory = new CameraFactory(this);
    }

    /** @inheritDoc */
    public get spriteBatch(): ISpriteBatch {
        return this._spriteBatch;
    }

    /** @inheritDoc */
    public get cameraFactory(): ICameraFactory {
        return this._cameraFactory;
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
        return this._renderer.graphicsDevice;
    }

    /** @inheritdoc */
    public get renderPipelineFactory(): IRenderPipelineFactory {
        return this._renderPipelineFactory;
    }

    /** @inheritdoc */
    get geometryBuilder(): IGeometryBuilder {
        return this._geometryBuilder;
    }

    /** @inheritdoc */
    public get windowManager(): IWindowManager {
        return this._windowManager;
    }

    /** @inheritdoc */
    public get renderer(): ITempRenderer {
        return this._renderer;
    }

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

        this._renderer.initialize();
        this._spriteBatch.initialize();


        this._renderer.afterInitialize();

        this.windowManager.updateEvent(() => {
            // Update logic here
        });
        this.windowManager.renderEvent(() => {
            this._renderer.beginRenderPass();

            // Invoke render listeners.
            for (const listener of this._onRenderListeners) {
                listener();
            }

            this._spriteBatch.frameEnd();
            this._renderer.endRenderPass();
        });
        this.windowManager.runEventLoop();
    }
}
