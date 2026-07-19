import type { TempIFramework } from "../core/framework-interface";
import { RenderConfigurationSymbol, type RenderConfiguration } from "../core/renderer/renderer-interface";
import { inject, injectable } from "tsyringe";
import { IFrameworkSymbol } from "../core/dependency-injection/register-services-interface";
import { ARendererer } from "../core/renderer/a-rendererer";
import type { TempIGraphicsDevice } from "../core/rendering/graphics-device-interface";
import { WebGlGraphicsDevice } from "./webgl-graphics-device";

/**
 * The WebGL implementation of the IRenderer interface.
 */
@injectable()
export class WebGLRenderer extends ARendererer {

  private _renderConfiguration: RenderConfiguration;

  /**
   * The constructor.
   * @param framework The framework.
   * @param renderConfiguration The render configuration. This is used to initialize the renderer.
   */
  constructor(
    @inject(IFrameworkSymbol) framework: TempIFramework,
    @inject(RenderConfigurationSymbol) renderConfiguration: RenderConfiguration) {
    super(framework);
    this._renderConfiguration = renderConfiguration;
  }

  /** @inheritdoc */
  protected createGraphicsDevice(): TempIGraphicsDevice {
    return new WebGlGraphicsDevice(this._framework.windowManager, {
      samplerFilteringPreset: this._renderConfiguration.textureFiltering
    });
  }
}
