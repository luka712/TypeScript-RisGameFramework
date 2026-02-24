import { container, type DependencyContainer } from "tsyringe";
import type { IFramework } from "../core/framework-interface";
import { WindowManager } from "../core/window/window-manager";
import type { IWindowManager } from "../core/window/window-manager-interface";
import { WebGLRegisterServices } from "../webgl/webgl-register-services";
import { FrameworkOptions } from "./framework-options";

import { IFrameworkSymbol, IRendererSymbol, IRenderTargetFactorySymbol, ITextureFactorySymbol } from "../core/dependency-injection/register-services-interface";
import { RenderConfiguration, RenderConfigurationSymbol, type IRenderer } from "../core/renderer/renderer-interface";
import type { ITextureFactory } from "../core/texture/texture-factory";
import type { IRenderTargetFactory } from "../render-target/render-target-factory";

export class Framework implements IFramework {

  private readonly _container: DependencyContainer;
  private readonly _windowManager: IWindowManager;
  private readonly _renderer: IRenderer;
  private readonly _textureFactory: ITextureFactory;
  private readonly _renderTargetFactory: IRenderTargetFactory;

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
    (new WebGLRegisterServices).register(this._container);
    this._renderer = this._container.resolve(IRendererSymbol);
    this._textureFactory = this._container.resolve(ITextureFactorySymbol);
    this._renderTargetFactory = this._container.resolve(IRenderTargetFactorySymbol);
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
