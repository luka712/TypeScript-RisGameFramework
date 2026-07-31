import type {ICameraFactory, IFramework, IOrthographicCamera} from "ris-framework-api";
import  {vec2} from "gl-matrix";
import {OrthographicCamera} from "./OrthographicCamera.ts";

/** The Camera Factory */
export class CameraFactory implements ICameraFactory {

    static DEFAULT_ORIGIN = vec2.fromValues(0,0);

    /**
     * The constructor.
     * @param _framework
     */
    public constructor(private readonly _framework: IFramework) {}

    /** @inheritDoc */
    public createDefaultOrthographicCamera(origin?: vec2): IOrthographicCamera {

        origin = origin ?? CameraFactory.DEFAULT_ORIGIN;

        const framework = this._framework;
        const left = -framework.renderer.backBufferSize[0] * origin[0];
        const top = -framework.renderer.backBufferSize[1] * origin[1];
        const right = left + framework.renderer.backBufferSize[0];
        const bottom = top + framework.renderer.backBufferSize[1];

        return this.createOrthographicCamera(left, right, top, bottom, 0, 1);
    }

    /** @inheritDoc */
    public createOrthographicCamera(left: number, right: number, top: number, bottom: number, near: number, far: number): IOrthographicCamera {
        const camera = new OrthographicCamera(this._framework, left, right, top, bottom, near, far);
        camera.initialize();
        return camera;
    }

}