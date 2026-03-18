import { vec2 } from "gl-matrix"
import { BaseGeometry } from "./base-geometry";
import type { IGeometryBuilder } from "./geometry-builder-interface";

/**
 * The GeometryBuilder class provides methods for creating various types of geometries, such as quads, with specified parameters like scale and winding order.
 */
export class GeometryBuilder implements IGeometryBuilder {

    /** @inheritdoc */
    public quadGeometry(scale?: vec2, counterClockwise: boolean = true): BaseGeometry {

        scale = scale ?? vec2.fromValues(1, 1);

        var geometry = new BaseGeometry();
        geometry.vertexCount = 4;
        geometry.positions = new Float32Array([
            -0.5 * scale[0], -0.5 * scale[1], 0.0, // bottom left
            -0.5 * scale[0], 0.5 * scale[1], 0.0, // top left
            0.5 * scale[0], -0.5 * scale[1], 0.0, // bottom right
            0.5 * scale[0], 0.5 * scale[1], 0.0, // top right
        ]);
        if (counterClockwise) {
            geometry.indices = new Uint16Array(
                [
                    2, 3, 1, // t1
                    1, 0, 2 // t2 
                ]);
        }
        else {
            geometry.indices = new Uint16Array(
                [
                    1, 3, 2, // t1
                    2, 0, 1 // t2 
                ]);
        }
        geometry.colors = new Float32Array(
            [
                1, 1, 1, 1,
                1, 1, 1, 1,
                1, 1, 1, 1,
                1, 1, 1, 1
            ]);
        geometry.textureCoords = new Float32Array(
            [
                0, 1, // bottom left
                0, 0, // top left
                1, 1, // bottom right
                1, 0 // top right
            ]);
        geometry.normals = new Float32Array(
            [
                0, 0, 1,
                0, 0, 1,
                0, 0, 1,
                0, 0, 1,
            ]);

        return geometry;
    }
}