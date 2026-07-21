import type { TempIFramework } from "../core/framework-interface";
import { type RenderConfiguration } from "../core/renderer/renderer-interface";
import { ARendererer } from "../core/renderer/a-rendererer";
import type { TempIGraphicsDevice } from "../core/rendering/graphics-device-interface";
import { WebGlGraphicsDevice } from "./webgl-graphics-device";

/**
 * The WebGL implementation of the IRenderer interface.
 */
export class WebGLRenderer extends ARendererer {

  private _renderConfiguration: RenderConfiguration;

  /**
   * The constructor.
   * @param framework The framework.
   * @param renderConfiguration The render configuration. This is used to initialize the renderer.
   */
  constructor(
     framework: TempIFramework,
     renderConfiguration: RenderConfiguration) {
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
