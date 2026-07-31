import {IOrthographicCamera} from "./IOrthographicCamera";
import {vec2} from "gl-matrix";

/**
 * The camera factory.
 */
export interface ICameraFactory {

    /**
     * Creates a new orthographic camera which is suitable for 2D games,
     *     or for UI rendering.
     *
     *     Also, suitable when orthographic projection is required, such as shadow mapping.
     * @param left - The left edge of the camera volume.
     * @param right - The right edge of the camera volume.
     * @param top - The top edge of the camera volume.
     * @param bottom - The bottom edge of the camera volume.
     * @param far - The far plane.
     * @param near - The near plane.
     * @returns The .
     */
    createOrthographicCamera(left: number, right: number, top: number, bottom: number, near: number, far: number): IOrthographicCamera;

    /**
     * The default orthographic camera.
     * @param origin - The origin point of the camera.
     * @returns The .
     */
    createDefaultOrthographicCamera(origin?: vec2): IOrthographicCamera;

}
