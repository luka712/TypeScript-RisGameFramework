import { container, type DependencyContainer } from "tsyringe";
import type { IFramework } from "../core/framework-interface";
import { WindowManager } from "../core/window/window-manager";
import type { IWindowManager } from "../core/window/window-manager-interface";
import { WebGLRegisterServices } from "../webgl/webgl-register-services";
import { FrameworkOptions } from "./framework-options";

import { IBuffersFactorySymbol, IFrameworkSymbol, IRendererSymbol, IRenderTargetFactorySymbol, ITextureFactorySymbol } from "../core/dependency-injection/register-services-interface";
import { RenderConfiguration, RenderConfigurationSymbol, type IRenderer } from "../core/renderer/renderer-interface";
import type { ITextureFactory } from "../core/texture/texture-factory";
import type { IRenderTargetFactory } from "../core/render-target/render-target-factory";
import { IGeometryBuilderSymbol, type IGeometryBuilder } from "../core/geometry/geometry-builder-interface";
import { GeometryBuilder } from "../core/geometry/geometry-builder";
import type { IBuffersFactory } from "../core/buffers/buffers-factory-interface";

export class Framework implements IFramework {

  private readonly _container: DependencyContainer;
  private readonly _windowManager: IWindowManager;
  private readonly _renderer: IRenderer;
  private readonly _textureFactory: ITextureFactory;
  private readonly _renderTargetFactory: IRenderTargetFactory;
  private readonly _buffersFactory: IBuffersFactory;
  private readonly _geometryBuilder: IGeometryBuilder;

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
    this._container.registerInstance(RenderConfigurationSymbol, new RenderConfiguration());
    this._container.registerInstance(IGeometryBuilderSymbol, new GeometryBuilder());
    (new WebGLRegisterServices).register(this._container);
    this._renderer = this._container.resolve(IRendererSymbol);
    this._textureFactory = this._container.resolve(ITextureFactorySymbol);
    this._renderTargetFactory = this._container.resolve(IRenderTargetFactorySymbol);
    this._buffersFactory = this._container.resolve(IBuffersFactorySymbol);
    this._geometryBuilder = this._container.resolve(IGeometryBuilderSymbol);
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
  public get renderTargetFactory(): IRenderTargetFactory {
    return this._renderTargetFactory;
  }

  /** @inheritdoc */
  initalize(): void {

    this._renderer.initialize();

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
