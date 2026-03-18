import type { vec2 } from "gl-matrix";
import type { BaseGeometry } from "./base-geometry";

export const IGeometryBuilderSymbol = Symbol("IGeometryBuilder");

/**
 * The IGeometryBuilder interface defines methods for creating various types of geometries, such as quads, with specified parameters like scale and winding order.
 */
export interface IGeometryBuilder {

    /**
     * Creates a quad geometry with the specified scale and winding order.
     * @param scale The scale of the quad in the x and y directions. If not provided, the quad will have a scale of (1, 1).
     * @param counterClockwise The winding order of the quad. By default, it will be <code>true</code>.
     */
    quadGeometry(scale?: vec2, counterClockwise?: boolean): BaseGeometry;
}