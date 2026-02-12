import type { IFramework } from "../core/framework-interface";
import { Color } from "../core/math/color";
import { Culling } from "../core/renderer/enums";
import type { IRenderer } from "../core/renderer/IRenderer";
import { RenderingLimits } from "../core/renderer/RenderingLimits";
import { BlendState } from "../utilities/common/blend-state";
import { WebGLUtilities } from "../utilities/webgl/webgl-utilities";

/**
 * The WebGL implementation of the IRenderer interface.
 */
export class WebGLRenderer implements IRenderer {
  private _canvas: HTMLCanvasElement | undefined;
  private _gl: WebGL2RenderingContext | undefined;
  private _blendState: BlendState = new BlendState();
  private _culling = Culling.Back;
  private _limits: RenderingLimits | null = null;

  /**
   * The constructor.
   * @param _framework The framework.
   */
  constructor(private readonly _framework: IFramework) {
    this.clearColor = Color.lightPink();
  }

  /** @inheritdoc */
  clearColor: Color;

  /** @inheritdoc */
  public get limits(): RenderingLimits | null {
    return this._limits;
  }

  /** @inheritdoc */
  initialize(): void {
    this._canvas = this._framework.windowManager.canvas;

    const contextOptions: WebGLContextAttributes = {
      antialias: false,
      powerPreference: "high-performance", // TODO: Make configurable.
    };

    this._gl = this._canvas.getContext(
      "webgl2",
      contextOptions,
    ) as WebGL2RenderingContext;

    // If not supported, throw an error.
    if (!this._gl) {
      throw new Error("WebGL not supported.");
    }

    const gl = this._gl;

    // Counter clockwise.
    gl.frontFace(gl.CCW);

    // Depth testing.
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    // Stencil testing.
    gl.enable(gl.STENCIL_TEST);

    // Enable blending.
    WebGLUtilities.blending.setBlend(gl, this._blendState);

    this._queryLimits();

    WebGLUtilities.culling.setCulling(gl, this._culling);
  }

  private _queryLimits(): void {
    const gl = this._gl!;

    const maxAnisotropy = WebGLUtilities.anisotropy.getMaxAnisotropy(gl);

    this._limits = new RenderingLimits(maxAnisotropy);
  }

  /** @inheritdoc */
  beginRenderPass(): void {
    var gl = this._gl!;
    gl.clearColor(
      this.clearColor.r,
      this.clearColor.g,
      this.clearColor.b,
      this.clearColor.a,
    );
    gl.clear(gl.COLOR_BUFFER_BIT);
  }

  /** @inheritdoc */
  endRenderPass(): void {
    console.log("WebGLRenderer ended render pass.");
  }
}
