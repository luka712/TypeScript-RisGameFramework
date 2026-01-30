import type { IFramework } from "../core/framework-interface";
import type { IRenderer } from "../core/renderer/IRenderer";
import { WindowManager } from "../core/window/window-manager";
import type { IWindowManager } from "../core/window/window-manager-interface";
import { WebGLRenderer } from "../webgl/webgl-renderer";
import { FrameworkOptions } from "./framework-options";

export class Framework implements IFramework {
  private readonly _windowManager: IWindowManager;
  private readonly _renderer: IRenderer;

  /**
   * The constructor for the Framework class.
   * @param options The optional options for them framework.
   */
  constructor(options: FrameworkOptions | null = null) {
    options = options ?? new FrameworkOptions();

    this._windowManager = new WindowManager(options.canvas);
    this._renderer = new WebGLRenderer(this);
  }

  /** @inheritdoc */
  get windowManager(): IWindowManager {
    return this._windowManager;
  }

  /** @inheritdoc */
  get renderer(): IRenderer {
    return this._renderer;
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
