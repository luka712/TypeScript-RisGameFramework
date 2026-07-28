import {container, type DependencyContainer} from "tsyringe";
import type {TempIFramework} from "../core/framework-interface";
import {WindowManager} from "../core/window/window-manager";
import type {IWindowManager} from "../core/window/window-manager-interface";
import {WebGLRegisterServices} from "../webgl/webgl-register-services";
import {FrameworkOptions} from "./framework-options";

import {
    IFrameworkSymbol,
    ITextureFactorySymbol
} from "../core/dependency-injection/register-services-interface";
import {RenderConfiguration, RenderConfigurationSymbol, type ITempRenderer} from "../core/renderer/renderer-interface";
import {GeometryBuilder} from "../geometry/GeometryBuilder.ts";
import type {ITempBuffersFactory} from "../core/buffers/buffers-factory-interface";
import {
    IRenderPipelineFactorySymbol,
    type IRenderPipelineFactory
} from "../core/render-pipelines/render-pipeline-factory-interface";
import type {ITextureFactory} from "../core/rendering/texture/texture-factory";
import {ShaderLoader, ShaderLoaderSymbol} from "../core/shader/shader-loader";
import {ContentManager} from "../core/content/content-manager";
import {IContentManagerSymbol, type IContentManager} from "../core/content/content-manager-interface";
import {IContentModuleSymbol, type IContentModule} from "../core/content/content-module-interface";
import {WebGlRenderer} from "../webgl/WebGlRenderer.ts";
import type {IGeometryBuilder} from "../geometry/IGeometryBuilder.ts";
import {WebGlBuffersFactory} from "../webgl/buffers/WebGlBuffersFactory.ts";
import type {IGraphicsDevice} from "../../../ris-framework-api";

export class Framework implements TempIFramework {

    private readonly _onRenderListeners: (() => void)[] = [];

    private readonly _container: DependencyContainer;
    private readonly _windowManager: IWindowManager;
    private readonly _renderer: ITempRenderer;
    private readonly _textureFactory: ITextureFactory;
    private readonly _buffersFactory: ITempBuffersFactory;
    private readonly _geometryBuilder: IGeometryBuilder;
    private readonly _renderPipelineFactory: IRenderPipelineFactory;
    private readonly _shaderLoader: ShaderLoader;
    private readonly _contentManager: IContentManager;

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
        rendererConfig.textureFiltering = options.textureFiltering;
        this._container.registerInstance(RenderConfigurationSymbol, rendererConfig);
        this._container.registerInstance(ShaderLoaderSymbol, new ShaderLoader());
        this._container.registerInstance(IContentManagerSymbol, new ContentManager());
        (new WebGLRegisterServices).register(this._container);
        this._renderer = new WebGlRenderer(this, rendererConfig);
        this._textureFactory = this._container.resolve(ITextureFactorySymbol);
        this._buffersFactory = new WebGlBuffersFactory(this);
        this._geometryBuilder = new GeometryBuilder();
        this._renderPipelineFactory = this._container.resolve(IRenderPipelineFactorySymbol);
        this._shaderLoader = this._container.resolve(ShaderLoaderSymbol);
        this._contentManager = this._container.resolve(IContentManagerSymbol);
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
    public get shaderLoader(): ShaderLoader {
        return this._shaderLoader;
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
    public get buffersFactory(): ITempBuffersFactory {
        return this._buffersFactory;
    }

    /** @inheritdoc */
    public get content(): IContentManager {
        return this._contentManager;
    }

    private _initializeSelf() {
        const contentModules = this._container.resolveAll<IContentModule>(IContentModuleSymbol);
        for (const contentModule of contentModules) {
            this._contentManager.addContentModule(contentModule);
        }
    }

    /** @inheritdoc */
    public initialize(): void {

        this._initializeSelf();

        this._renderer.initialize();
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

            this._renderer.endRenderPass();
        });
        this.windowManager.runEventLoop();
    }
}
