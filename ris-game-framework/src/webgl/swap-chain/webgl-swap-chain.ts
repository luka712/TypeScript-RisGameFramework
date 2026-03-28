import { vec2 } from "gl-matrix";
import { TextureFormat } from "../../common/texture-enums";
import type { ISwapChain } from "../../core/rendering/swap-chain/swap-chain-interface";

/**
 * The WebGL implementation of the ISwapChain interface, which manages the swap chain for rendering operations in a WebGL context.
 */
export class WebGLSwapChain implements ISwapChain {

    private _canvas: HTMLCanvasElement
    private _backBufferSize: vec2;

    /**
     * The WebGLSwapChain constructor.
     * @param canvas The HTML canvas element that the swap chain will use for rendering
     */
    public constructor(canvas: HTMLCanvasElement) {
        this._canvas = canvas;
        this._backBufferSize = vec2.fromValues(this._canvas.width, this._canvas.height);
        this._canvas.addEventListener('resize', () => {
            this._backBufferSize[0] = this._canvas.width;
            this._backBufferSize[1] = this._canvas.height;
        });
    }

    /** @inheritdoc */
    public get textureFormat(): TextureFormat {
        return TextureFormat.RGBA_8_UNORM;
    }

    /** @inheritdoc */
    public get backBufferSize(): vec2 {
        return this._backBufferSize;
    }

    /** @inheritdoc */
    public setSize(width: number, height: number): void {
        // Nothing to do here since the canvas size is managed by the application and WebGL will automatically adjust the viewport accordingly.
    }

    /** @inheritdoc */
    public present(): void {
        // Nothing to do here since WebGL automatically presents the rendered content to the canvas.
    }


}