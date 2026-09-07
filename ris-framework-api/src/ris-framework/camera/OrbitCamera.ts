import {vec3, mat4} from "gl-matrix";
import {IUniformBuffer} from "../rendering/buffers/IUniformBuffer";
import {PerspectiveCamera} from "./PerspectiveCamera";
import {IMaterialFactory} from "../material/IMaterialFactory";
import {IInputManager} from "../input/IInputManager";
import {IFramework} from "../IFramework";
import {MathHelper} from "../utilities/MathHelper";
import {ICamera} from "./ICamera";
import {MouseState} from "../input/MouseState";
import {GameTime} from "../time/GameTime";
import {MouseButton} from "../input/MouseButton";

/**
 * Camerae that support orbit movement.
 */
export class OrbitCamera implements ICamera {

    private readonly POSITIVE_89_DEG = 1.55334;
    private readonly POSITIVE_179_DEG = 3.124139;

    private readonly _tempVec3 = vec3.create();
    private readonly _eye: vec3 = null!;

    private readonly _coreCamera: PerspectiveCamera;
    private readonly _inputManager: IInputManager

    /** The rotation around the vertical axis. */
    private _yaw = 0;

    /** The tilt of the camera.*/
    private _pitch = 0;

    constructor(coreCamera: PerspectiveCamera, inputManager: IInputManager) {
        this._coreCamera = coreCamera;
        this._inputManager = inputManager;
        this.eye = vec3.fromValues(0, 0, -3);
        this.target = vec3.fromValues(0, 0, 0);
    }

    /**
     * The mouse sensitivity.
     */
    public sensitivity = 0.05;

    /** The speed of scrolling related options. */
    public scrollSpeed = 1;

    /** The maximum scrolling speed. */
    public maxScrollSpeed: number = 50;

    /** The up vector. */
    public up = vec3.fromValues(0, 1, 0);

    /** @inheritDoc */
    public get projectionViewBuffer(): IUniformBuffer {
        return this._coreCamera.projectionViewBuffer;
    }

    /** @inheritDoc */
    public get projectionBuffer(): IUniformBuffer {
        return this._coreCamera.projectionBuffer;
    }

    /** @inheritDoc */
    public get viewBuffer(): IUniformBuffer {
        return this._coreCamera.viewBuffer;
    }

    /** @inheritDoc */
    public get positionBuffer(): IUniformBuffer {
        return this._coreCamera.positionBuffer;
    }

    /** @inheritDoc */
    public get projectionMatrix(): mat4 {
        return this._coreCamera.projectionMatrix;
    }

    /** @inheritDoc */
    public get viewMatrix(): mat4 {
        return this._coreCamera.viewMatrix;
    }

    /** @inheritDoc */
    public set viewMatrix(value: mat4) {
        this._coreCamera.viewMatrix = value;
    }

    /** @inheritDoc */
    public get projectionViewMatrix(): mat4 {
        return this._coreCamera.projectionViewMatrix;
    }

    /** @inheritDoc */
    public get direction(): vec3 {
        return this._coreCamera.direction;
    }

    /** Orbit controls can be used if this button is pressed. */
    public orbitButton = MouseButton.LEFT;

    /**
     * The eye position of the camera.
     */
    public get eye(): vec3 {
        return this._coreCamera.eye;
    }

    /**
     * The eye position of the camera.
     */
    public set eye(value: vec3) {
        this._coreCamera.eye = value;
        vec3.sub(this._tempVec3, this.target, value);
        this._setPitchAndYawFromDirection(this._tempVec3);
    }

    /**
     * The eye position of the camera.
     */
    public get target(): vec3 {
        return this._coreCamera.target;
    }

    /**
     * The eye position of the camera.
     */
    public set target(value: vec3) {
        this._coreCamera.target = value;
        vec3.sub(this._tempVec3, value, this.eye);
        this._setPitchAndYawFromDirection(this._tempVec3);
    }

    /** Gets the core camera.*/
    public get coreCamera(): ICamera | undefined {
        return this._coreCamera;
    }

    /**
     * Find a target from yaw and pitch.
     */
    private findTarget(): void {
        throw new Error('Not implemented');
    }

    /**
     * Handles the mouse movement for orbit camera.
     * @param mouseState - The .
     * @param deltaTime - The delta time.
     */
    private handleOrbitMouseMovement(mouseState: MouseState, deltaTime: number): void {
        throw new Error('Not implemented');
    }

    /** @inheritDoc */
    public initialize(): void {
        throw new Error('Not implemented');
    }

    public updateBuffers(): void {
        throw new Error('Not implemented');
    }

    /**
     * Sets the pitch and yaw from look direction.
     * @param lookDirection The direction.
     * @private
     */
    private _setPitchAndYawFromDirection(lookDirection: vec3) {
        vec3.normalize(lookDirection, lookDirection);
        const y = MathHelper.clamp(lookDirection[1], -1, 1);
        this._pitch = MathHelper.clamp(Math.asin(y), -1, 1);
        this._yaw = Math.atan2(lookDirection[0], lookDirection[2]);
    }

    /**
     * Handles the mouse movement for orbit camera.
     * @param mouseState The mouse state.
     * @param deltaTime The delta time.
     */
    private _handleOrbitMouseMovement(mouseState: MouseState, deltaTime: number): void {
        const dt = deltaTime * this.sensitivity;
        this._yaw += mouseState.dX * dt;
        this._pitch += -mouseState.dY * dt;

        // Clamp between [1.0, 179.0] degrees.
        this._pitch = MathHelper.clamp(this._pitch, -this.POSITIVE_179_DEG, this.POSITIVE_179_DEG);

        // Convert spherical coordinates to Cartesian
        vec3.sub(this._tempVec3, this.target, this.eye);
        const radius = this._tempVec3.length;

        const sinPitch = Math.sin(this._pitch);
        const cosPitch = Math.cos(this._pitch);

        const x = radius * cosPitch * Math.sin(this._yaw);
        const y = radius * sinPitch;
        const z = radius * cosPitch * Math.cos(this._yaw);

        this._tempVec3[0] = x;
        this._tempVec3[1] = y;
        this._tempVec3[2] = z;
        vec3.sub(this._coreCamera.eye, this.target, this._tempVec3);
    }

    /** @inheritDoc */
    public update(time: GameTime): void {

       //  vec3.sub(this._tempVec3, this.target, this.eye);
       // this._setPitchAndYawFromDirection(this._tempVec3);

        const deltaTime = time.deltaTimeSec;

        // Control pitch and yaw with mouse.
        const mouseState = this._inputManager.getMouseState();
        if (mouseState.isButtonDown(this.orbitButton)) {
            this._handleOrbitMouseMovement(mouseState, deltaTime);
        } else {
            // Usually done with scroll wheel.
            // HandleForwardBackwardMovement(mouseState, deltaTime);
        }

        this._coreCamera.update(time);
    }

    /** @inheritDoc */
    public dispose(): void {
        this._coreCamera.dispose();
    }
}
