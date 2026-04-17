import { container, type DependencyContainer } from "tsyringe";
import type { IFramework } from "../core/framework-interface";
import { WindowManager } from "../core/window/window-manager";
import type { IWindowManager } from "../core/window/window-manager-interface";
import { WebGLRegisterServices } from "../webgl/webgl-register-services";
import { FrameworkOptions } from "./framework-options";

import { IBuffersFactorySymbol, IFrameworkSymbol, IRendererSymbol, ITextureFactorySymbol } from "../core/dependency-injection/register-services-interface";
import { RenderConfiguration, RenderConfigurationSymbol, type IRenderer } from "../core/renderer/renderer-interface";
import { IGeometryBuilderSymbol, type IGeometryBuilder } from "../core/geometry/geometry-builder-interface";
import { GeometryBuilder } from "../core/geometry/geometry-builder";
import type { IBuffersFactory } from "../core/buffers/buffers-factory-interface";
import { IRenderPipelineFactorySymbol, type IRenderPipelineFactory } from "../core/render-pipelines/render-pipeline-factory-interface";
import type { ITextureFactory } from "../core/rendering/texture/texture-factory";
import { ShaderLoader, ShaderLoaderSymbol } from "../core/shader/shader-loader";
import { ContentManager } from "../core/content/content-manager";
import { IContentManagerSymbol, type IContentManager } from "../core/content/content-manager-interface";
import { IContentModuleSymbol, type IContentModule } from "../core/content/content-module-interface";

export class Framework implements IFramework {

  private readonly _container: DependencyContainer;
  private readonly _windowManager: IWindowManager;
  private readonly _renderer: IRenderer;
  private readonly _textureFactory: ITextureFactory;
  private readonly _buffersFactory: IBuffersFactory;
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
    this._container.registerInstance(IGeometryBuilderSymbol, new GeometryBuilder());
    this._container.registerInstance(ShaderLoaderSymbol, new ShaderLoader());
    this._container.registerInstance(IContentManagerSymbol, new ContentManager());
    (new WebGLRegisterServices).register(this._container);
    this._renderer = this._container.resolve(IRendererSymbol);
    this._textureFactory = this._container.resolve(ITextureFactorySymbol);
    this._buffersFactory = this._container.resolve(IBuffersFactorySymbol);
    this._geometryBuilder = this._container.resolve(IGeometryBuilderSymbol);
    this._renderPipelineFactory = this._container.resolve(IRenderPipelineFactorySymbol);
    this._shaderLoader = this._container.resolve(ShaderLoaderSymbol);
    this._contentManager = this._container.resolve(IContentManagerSymbol);
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
  public get renderer(): IRenderer {
    return this._renderer;
  }

  /** @inheritdoc */
  public get textureFactory(): ITextureFactory {
    return this._textureFactory;
  }

  /** @inheritdoc */
  public get buffersFactory(): IBuffersFactory {
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
  public initalize(): void {

    this._initializeSelf();

    this._renderer.initialize();
    this._renderer.afterInitialize();

    this.windowManager.updateEvent(() => {
      // Update logic here
    });
    this.windowManager.renderEvent(() => {
      this._renderer.beginRenderPass();
      this._renderer.endRenderPass();
    });
    this.windowManager.runEventLoop();
  }
}
