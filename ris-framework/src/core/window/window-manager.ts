import type { vec2 } from "gl-matrix";
import type {IWindowManager, WindowBounds} from "ris-framework-api";

/**
 * The implementation of the IWindowManager interface.
 */
export class WindowManager implements IWindowManager {
  private readonly _canvas: HTMLCanvasElement;
  private readonly _updateCallbacks: Array<() => void> = [];
  private readonly _renderCallbacks: Array<() => void> = [];

  /**
   * The constructor for the WindowManager class.
   * @param canvas An optional HTMLCanvasElement to associate with the window manager. If <c>null</c>, window manager will create its own canvas.
   */
  public constructor(canvas: HTMLCanvasElement | null = null) {
    this._canvas = canvas ?? document.createElement("canvas");
    if (!canvas) {
      document.body.appendChild(this._canvas);
    }
  }

  handleSwapChain: boolean;
    windowBounds: WindowBounds;
    title: string;
    addUpdateListener(event: () => void): void {
        throw new Error("Method not implemented.");
    }
    removeUpdateListener(event: () => void): void {
        throw new Error("Method not implemented.");
    }
    addRenderListener(event: () => void): void {
        throw new Error("Method not implemented.");
    }
    removeRenderListener(event: () => void): void {
        throw new Error("Method not implemented.");
    }
    addOnResizeListener(event: (arg1: IWindowManager, arg2: vec2) => void): void {
        throw new Error("Method not implemented.");
    }
    removeOnResizeListener(event: (arg1: IWindowManager, arg2: vec2) => void): void {
        throw new Error("Method not implemented.");
    }
    initializeForWebGPU(): void {
        throw new Error("Method not implemented.");
    }
    initializeForWebGl(): void {
        throw new Error("Method not implemented.");
    }
    dispose(): void {
        throw new Error("Method not implemented.");
    }

  /** @inheritdoc */
  updateEvent(callback: () => void): void {
    this._updateCallbacks.push(callback);
  }

  /** @inheritdoc */
  renderEvent(callback: () => void): void {
    this._renderCallbacks.push(callback);
  }

  /** @inheritdoc */
  runEventLoop(): void {
    for (const callback of this._updateCallbacks) {
      callback();
    }
    for (const callback of this._renderCallbacks) {
      callback();
    }

    requestAnimationFrame(() => this.runEventLoop());
  }

  /** @inheritdoc */
  public get canvas(): HTMLCanvasElement {
    return this._canvas;
  }
}
