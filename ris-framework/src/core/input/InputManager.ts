import {
    GamePadState,
    type IFramework,
    type IInputManager,
    KeyboardState,
    MouseButton,
    MouseState
} from "ris-framework-api";
import type {WebGlRenderPass} from "../../webgl/render-pass/WebGlRenderPass.ts";
import {vec2} from "gl-matrix";

export class InputManager implements IInputManager {

    private readonly _mouseButtonMap: { [key: number]: MouseButton } = {
        0: MouseButton.LEFT,
        1: MouseButton.MIDDLE,
        2: MouseButton.RIGHT,
    }

    private readonly _mouseState: MouseState;
    private readonly _mousePosition = vec2.create();
    private readonly _previousMousePosition = vec2.create();
    private readonly _mouseDelta = vec2.create();
    private readonly _scrollWheelPosition: WebGlRenderPass;
    private readonly _mouseButtonDown: { [key: number]: boolean } = {};
    private readonly _mouseButtonReleased: { [key: number]: boolean } = {};

    /** TODO */
    public constructor(private readonly _framework: IFramework) {

        this._mouseState = new MouseState(
            this._mouseButtonDown, this._mouseButtonReleased,
            this._mousePosition, this._mouseDelta, this._scrollWheelPosition
        );
    }


    thumbstickDeadZone: number;

    afterUpdate(): void {
    }

    getGamePadState(gamePadIndex: number): GamePadState {
        return undefined;
    }

    getKeyboardState(): KeyboardState {
        return undefined;
    }

    /** @inheritDoc */
    public getMouseState(): MouseState {
        return this._mouseState;
    }

    /** @inheritDoc */
    public initialize(): void {

        const canvas = this._framework.windowManager.canvas;
        this._handleMouseEvents(canvas)
    }

    private _handleMouseEvents(canvas: HTMLCanvasElement) {

        canvas.addEventListener("mousemove", (e: MouseEvent) => {

            this._mousePosition[0] = e.clientX;
            this._mousePosition[1] = e.clientY;

            vec2.sub(this._mouseDelta, this._mousePosition, this._previousMousePosition);

            this._previousMousePosition[0] = e.clientX;
            this._previousMousePosition[1] = e.clientY;
        });

        canvas.addEventListener("mousedown", (e: MouseEvent) => {
            const idx = e.button;
            const btn = this._mouseButtonMap[idx] ?? MouseButton.NONE;
            this._mouseButtonDown[btn] = true;
        })

        canvas.addEventListener("mouseup", (e: MouseEvent) => {
            const idx = e.button;
            const btn = this._mouseButtonMap[idx] ?? MouseButton.NONE;
            this._mouseButtonDown[btn] = false;
            this._mouseButtonReleased[btn] = true;
        });
    }

    update(): void {
    }

}