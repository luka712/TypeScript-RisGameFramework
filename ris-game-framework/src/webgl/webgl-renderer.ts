import type { IFramework } from "../core/framework-interface";
import { RenderConfigurationSymbol, type RenderConfiguration } from "../core/renderer/renderer-interface";
import { inject, injectable } from "tsyringe";
import { IFrameworkSymbol } from "../core/dependency-injection/register-services-interface";
import { ARendererer } from "../core/renderer/a-rendererer";
import type { IGraphicsDevice } from "../core/rendering/graphics-device-interface";
import { WebGLGraphicsDevice } from "./webgl-graphics-device";

/**
 * The WebGL implementation of the IRenderer interface.
 */
@injectable()
export class WebGLRenderer extends ARendererer {


  /**
   * The constructor.
   * @param framework The framework.
   * @param renderConfiguration The render configuration. This is used to initialize the renderer.
   */
  constructor(
    @inject(IFrameworkSymbol) framework: IFramework,
    @inject(RenderConfigurationSymbol) renderConfiguration: RenderConfiguration) {
    super(framework);
  }

  /** @inheritdoc */
  protected createGraphicsDevice(): IGraphicsDevice {
    return new WebGLGraphicsDevice(this._framework.windowManager);
  }
}
