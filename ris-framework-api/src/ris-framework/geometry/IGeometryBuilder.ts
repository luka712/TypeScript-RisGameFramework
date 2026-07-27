import {IGeometry} from "./IGeometry";

/**
 * The geometry builder.
 */
export interface IGeometryBuilder {

/**
 * Creates the geometry of a quad.
 * @param scale - The scale of the quad. If null it is set to (1,1).
 * @param counterClockWise - The winding order of the quad.
 * @returns The geometry.
 */
  quadGeometry(scale?: number, counterClockWise?: boolean): IGeometry;

}
