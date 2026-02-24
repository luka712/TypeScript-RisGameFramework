import type { IFramework } from "../core/framework-interface";
import { Color } from "../core/math/color";
import { Culling } from "../core/renderer/enums";
import { RenderConfigurationSymbol, type IRenderer, type RenderConfiguration } from "../core/renderer/renderer-interface";
import { RenderingLimits } from "../core/renderer/RenderingLimits";
import { BlendState } from "../common/blend-state";
import { WebGLUtilities } from "./utilities/webgl-utilities";
import { inject, injectable } from "tsyringe";
import { IFrameworkSymbol } from "../core/dependency-injection/register-services-interface";
import { TextureFormat } from "../common/texture-enums";
import type { WebGLRenderTarget2D } from "./render-target/webgl-render-target-2d";
import { vec2 } from "gl-matrix";
import { asWebGLRenderTarget2D } from "./cast/cast";

/**
 * The WebGL implementation of the IRenderer interface.
 */
@injectable()
export class WebGLRenderer implements IRenderer {
  private _canvas: HTMLCanvasElement | undefined;
  private _gl: WebGL2RenderingContext | undefined;
  private _blendState: BlendState = new BlendState();
  private _culling = Culling.Back;
  private _limits: RenderingLimits | null = null;
  private _mainFramebuffer: WebGLRenderTarget2D = null!;
  private _frameBufferSize: vec2 = vec2.create();

  /**
   * The constructor.
   * @param _framework The framework.
   * @param renderConfiguration The render configuration. This is used to initialize the renderer.
   */
  constructor(
    @inject(IFrameworkSymbol) private readonly _framework: IFramework, 
    @inject(RenderConfigurationSymbol) renderConfiguration: RenderConfiguration) {
    this.clearColor = Color.lightPink();
    this._frameBufferSize = renderConfiguration.frameBufferSize;

  }



  /**
   * The WebGL rendering context. This is undefined until the renderer is initialized.
   */
  public get gl(): WebGL2RenderingContext | undefined {
    return this._gl;
  }

  /** @inheritdoc */
  clearColor: Color;

  /** @inheritdoc */
  public get preferredTextureFormat(): TextureFormat {
    return TextureFormat.RGBA_8_Unorm;
  }

  /** @inheritdoc */
  public get preferredDepthStencilFormat(): TextureFormat {
    return TextureFormat.Depth_24_Stencil_8;
  }

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

    this._mainFramebuffer =  asWebGLRenderTarget2D(this._framework.renderTargetFactory.createRenderTarget2D(
      this._frameBufferSize, this._frameBufferSize));
    };
  
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
