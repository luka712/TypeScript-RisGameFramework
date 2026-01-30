import type { IWindowManager } from "./window-manager-interface";

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
