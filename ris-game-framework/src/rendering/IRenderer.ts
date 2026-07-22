import type {IGraphicsDevice} from "../interfaces/rendering/IGraphicsDevice.ts";
import type {Color} from "../core/math/color.ts";

/**
 * The interface for a renderer.
 */
export interface IRenderer {
  /**
   * The graphics device used by the renderer.
   */
  readonly graphicsDevice: IGraphicsDevice;

  /**
   * The clear color of the renderer.
   * Framebuffer will be cleared with this color at the beginning of the frame.
   */
  clearColor: Color;
}
