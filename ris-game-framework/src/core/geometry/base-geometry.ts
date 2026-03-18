import { VertexFormat } from "../../common/vertex-format";
import { GeometryFormat } from "./geometry-format";

export class BaseGeometry {

    /** The vertex count of the geometry. */
    public vertexCount: number = 0;

    /** The positions of geometry. */
    public positions?: Float32Array;

    /** The format of the positions. */
    public positionsFormat: VertexFormat = VertexFormat.Float32x3;

    /** The colors of geometry. */
    public colors?: Float32Array;

    /** The color format of geometry. */
    public colorFormat: VertexFormat = VertexFormat.Float32x4;

    /** The texture coordinates of geometry. */
    public textureCoords?: Float32Array;

    /** The texture coordinates vertex format of geometry. */
    public textureFormat: VertexFormat = VertexFormat.Float32x2;

    /** The normals of a vertex. */
    public normals?: Float32Array;

    /** The vertex format of normals. */
    public normalsFormat: VertexFormat = VertexFormat.Float32x3;

    /** The indices of geometry. */
    public indices?: Uint16Array;

    /**
     * Pushes vertex data from source format to destination format.
     * @param index The index of the vertex to push.
     * @param source The source vertex data.
     * @param sourceFormat The vertex format of the source vertex data.
     * @param destination The destination array to push the vertex data to.
     * @param destinationFormat The vertex format of the destination vertex data.
     */
    private pushFormat(index: number,
        source: Float32Array,
        sourceFormat: VertexFormat,
        destination: number[],
        destinationFormat: VertexFormat) {
        // This simply takes source format and pushes new vertices to destination format.
        // If source format is less than destination, 0 is being push in its place.
        let _0 = 0;
        let _1 = 0;
        let _2 = 0;
        let _3 = 0;

        if (sourceFormat == VertexFormat.Float32) {
            _0 = source[index];
        }
        else if (sourceFormat == VertexFormat.Float32x2) {
            _0 = source[index * 2];
            _1 = source[index * 2 + 1];
        }
        else if (sourceFormat == VertexFormat.Float32x3) {
            _0 = source[index * 3];
            _1 = source[index * 3 + 1];
            _2 = source[index * 3 + 2];
        }
        else if (sourceFormat == VertexFormat.Float32x4) {
            _0 = source[index * 4];
            _1 = source[index * 4 + 1];
            _2 = source[index * 4 + 2];
            _3 = source[index * 4 + 3];
        }

        destination.push(_0);
        if (destinationFormat >= VertexFormat.Float32x2) {
            destination.push(_1);
        }

        if (destinationFormat >= VertexFormat.Float32x3) {
            destination.push(_2);
        }

        if (destinationFormat >= VertexFormat.Float32x4) {
            destination.push(_3);
        }
    }

    /**
     * Converts the geometry data to interleaved vertex data based on the specified geometry format.
     * @param format The geometry format to convert the geometry data to.
     * @returns The interleaved vertex data as an array of numbers.
     */
    public toInterleaved(format: GeometryFormat): Float32Array {
        let interleavedData: number[] = [];

        switch (format) {
            case GeometryFormat.Pos3_TextureCoords2:
                {
                    let count = this.positions!.length / 3;

                    for (let i = 0; i < count; i++) {
                        this.pushFormat(i, this.positions!, VertexFormat.Float32x3, interleavedData, VertexFormat.Float32x3);
                        this.pushFormat(i, this.textureCoords!, VertexFormat.Float32x2, interleavedData, VertexFormat.Float32x2);
                    }
                    break;
                }
            case GeometryFormat.Pos3_Color4_TextureCoords2:
                {
                    let count = this.positions!.length / 3;

                    for (let i = 0; i < count; i++) {
                        this.pushFormat(i, this.positions!, VertexFormat.Float32x3, interleavedData, VertexFormat.Float32x3);
                        this.pushFormat(i, this.colors!, VertexFormat.Float32x4, interleavedData, VertexFormat.Float32x4);
                        this.pushFormat(i, this.textureCoords!, VertexFormat.Float32x2, interleavedData, VertexFormat.Float32x2);
                    }
                    break;
                }
            case GeometryFormat.Pos3_Color4_TextureCoords2_Normal3:
                {
                    let count = this.positions!.length / 3;

                    for (let i = 0; i < count; i++) {
                        this.pushFormat(i, this.positions!, VertexFormat.Float32x3, interleavedData, VertexFormat.Float32x3);
                        this.pushFormat(i, this.colors!, VertexFormat.Float32x4, interleavedData, VertexFormat.Float32x4);
                        this.pushFormat(i, this.textureCoords!, VertexFormat.Float32x2, interleavedData, VertexFormat.Float32x2);
                        this.pushFormat(i, this.normals!, VertexFormat.Float32x3, interleavedData, VertexFormat.Float32x3);
                    }
                    break;
                }
            case GeometryFormat.Pos3_Color4_TextureCoords2_Aligned:
                {
                    let count = this.positions!.length / 3;

                    for (let i = 0; i < count; i++) {
                        this.pushFormat(i, this.positions!, VertexFormat.Float32x3, interleavedData, VertexFormat.Float32x4);
                        this.pushFormat(i, this.colors!, VertexFormat.Float32x4, interleavedData, VertexFormat.Float32x4);
                        this.pushFormat(i, this.textureCoords!, VertexFormat.Float32x2, interleavedData, VertexFormat.Float32x4);
                    }
                    break;
                }
        }


        return new Float32Array(interleavedData);
    }
}