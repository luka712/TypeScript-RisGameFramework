import type {IRenderer} from "./rendering/IRenderer.ts";
import type {IGeometryBuilder} from "./geometry/IGeometryBuilder.ts";

/**
 * The framework interface.
 */
export interface IFramework {

  /**
   * The renderer used by the framework.
   */
  readonly renderer: IRenderer;

  /**
   * The geometry builder.
   */
  readonly geometryBuilder: IGeometryBuilder;

  /**
   * Called when the framework is rendered.
   */
  addOnRenderListener(event: () => void): void;

  /**
   * Called when the framework is rendered.
   */

  removeOnRenderListener(event: () => void): void;

  /**
   * Initializes the framework.
   */
  initialize(): void;
}
