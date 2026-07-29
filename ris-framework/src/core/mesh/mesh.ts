import type {BaseGeometry} from "../../geometry/BaseGeometry.ts";
import {type GeometryFormat} from "../../geometry/GeometryFormat.ts";
import type {IMesh} from "./mesh-interface";
import type {MeshParameters} from "./mesh-paramaters";
import {BufferUsage, type IFramework, type IIndexBuffer, State, type IVertexBuffer} from "ris-framework-api";

export class Mesh implements IMesh {

    protected readonly _framework: IFramework;
    protected _vertexData: number[] = null!;
    protected _bufferUsage = BufferUsage.VERTEX;
    protected _state: State = State.CREATED;
    protected _positions: Float32Array | null = null;
    protected _indices: number[] | null = null;
    protected _colors: Float32Array | null = null;
    protected _textureCoords: Float32Array | null = null;
    protected _normals: Float32Array | null = null;
    protected _vertexBuffer: IVertexBuffer | null = null;
    protected _indexBuffer: IIndexBuffer | null = null;

    /**
     * The constructor for the Mesh class.
     * @param framework The framework instance.
     */
    public constructor(framework: IFramework) {
        this._framework = framework;
    }

    /** @inheritdoc */
    public get vertexBuffer(): IVertexBuffer {
        return this._vertexBuffer!;
    }

    /** @inheritdoc */
    public get indexBuffer(): IIndexBuffer | null {
        return this._indexBuffer;
    }

    /**
     * The state of the mesh. This can be used to determine if the mesh is ready to be rendered or if it is still being initialized.
     */
    public get state(): State {
        return this._state;
    }

    /**
     * The positions of the mesh.
     */
    public get positions(): Float32Array | null {
        return this._positions;
    }

    /**
     * The indices of the mesh. This can be null if the mesh is not indexed and should be rendered using non-indexed drawing calls.
     */
    public get indices(): number[] | null {
        return this._indices;
    }

    /**
     * The colors of the mesh. This can be null if the mesh does not have vertex colors.
     */
    public get colors(): Float32Array | null {
        return this._colors;
    }

    /**
     * The UV texture coordinates of the mesh. This can be null if the mesh does not have texture coordinates.
     */
    public get textureCoords(): Float32Array | null {
        return this._textureCoords;
    }

    /**
     * The normals of the mesh. This can be null if the mesh does not have normals.
     */
    public get normals(): Float32Array | null {
        return this._normals;
    }


    /**
     * Initializes the mesh.
     */
    public initialize(): void {
        this.applyChanges();
        this._state = State.INITIALIZED;
    }

    /**
     * Sets the geometry of the mesh from a BaseGeometry object. This method will create the vertex and index buffers for the mesh based on the provided geometry and format.
     * @param geometry The BaseGeometry object that contains the vertex data for the mesh. This should have the positions, indices, colors, texture coordinates, and normals (if applicable) set up according to the provided format.
     * @param format The format of the geometry data in the BaseGeometry object. This will determine how the vertex data is interleaved and how the vertex buffer is created.
     */
    public setGeometry(geometry: BaseGeometry, format: GeometryFormat) {
        if (geometry.vertexCount == 0) {
            const message = "Cannot create buffers for a Mesh as Mesh has no positions." +
                ` Check that geometry.vertexCount is set.`;
            // this._framework.logger.logError(message);
            throw new Error(message);
        }

        const interleavedData = geometry.toInterleaved(format);
        // const stride = formatStride(format);

        // Vertices
        this._vertexBuffer?.dispose();
        this._vertexBuffer = this._framework.bufferFactory.createVertexBuffer(
            interleavedData,
            geometry.vertexCount,
            this._bufferUsage,
            "");

        // Indices
        this._indexBuffer?.dispose();
        if (geometry.indices != null) {
            this._indexBuffer = this._framework.bufferFactory.createIndexBuffer(geometry.indices, "");
        }
    }

    /// <summary>
    /// Sets the mesh from parameters.
    /// </summary>
    /// <param name="meshParameters">The <see cref="RisGameFramework.MeshParameters"/>.</param>
    public setMesh(meshParameters: MeshParameters) {

        let positions = meshParameters.positions;
        if (positions instanceof Array) {
            positions = new Float32Array(positions);
        }

        let indices = meshParameters.indices;

        let textureCoords = meshParameters.textureCoords;
        if (textureCoords instanceof Array) {
            textureCoords = new Float32Array(textureCoords);
        }

        let colors = meshParameters.colors;
        if (colors instanceof Array) {
            colors = new Float32Array(colors);
        }

        this._positions = positions;
        this._indices = indices;
        this._textureCoords = textureCoords;
        this._colors = colors;
        this.applyChanges();
    }

    private _fillColors(index: { vertexDataIndex: number, colorIndex: number }, colors: Float32Array) {
        let {vertexDataIndex, colorIndex} = index;

        // If there is still colour to fill.
        if (colors.length > colorIndex) {
            this._vertexData[vertexDataIndex++] = colors[colorIndex++];
            this._vertexData[vertexDataIndex++] = colors[colorIndex++];
            this._vertexData[vertexDataIndex++] = colors[colorIndex++];
            this._vertexData[vertexDataIndex++] = colors[colorIndex++];
        } else {
            // Just prefill with white colour.
            this._vertexData[vertexDataIndex++] = 1;
            this._vertexData[vertexDataIndex++] = 1;
            this._vertexData[vertexDataIndex++] = 1;
            this._vertexData[vertexDataIndex++] = 1;
        }

        index.vertexDataIndex = vertexDataIndex;
        index.colorIndex = colorIndex;
    }

    /**
     * Applies the changes to the mesh. This will create the vertex and index buffers for the mesh based on the current positions, indices, colors, texture coordinates, and normals of the mesh.
     */
    public applyChanges() {
        if (!this._positions || this._positions.length == 0) {
            // this._framework.logger.logWarning("Cannot create buffers for a Mesh as Mesh has no positions.");
            return;
        }

        // - POSITIONS
        const vertexCount = this._positions.length / 3;

        // 3 for vertex, 4 for color and 2 for uvs.
        const vertexData = new Array((3 + 4 + 2) * vertexCount);

        let vertexIndex = 0;
        let positionsIndex = 0;
        let normalIndex = 0;
        let uvsIndex = 0;

        let index = {vertexDataIndex: 0, colorIndex: 0};
        let byteStride = 3 * Float32Array.BYTES_PER_ELEMENT;

        for (let i = 0; i < vertexCount; i++) {
            // Positions.
            vertexData[vertexIndex++] = this._positions[positionsIndex++];
            vertexData[vertexIndex++] = this._positions[positionsIndex++];
            vertexData[vertexIndex++] = this._positions[positionsIndex++];

            // Colors.
            if (this._colors != null) {
                this._fillColors(index, this._colors);
                vertexIndex = index.vertexDataIndex;
                byteStride += 4 * Float32Array.BYTES_PER_ELEMENT;
            }

            if (this._textureCoords != null) {
                // Uvs.
                vertexData[vertexIndex++] = this._textureCoords[uvsIndex++];
                vertexData[vertexIndex++] = this._textureCoords[uvsIndex++];
                byteStride += 2 * Float32Array.BYTES_PER_ELEMENT;
            }

            if (this._normals != null) {
                vertexData[vertexIndex++] = this._normals[normalIndex++];
                vertexData[vertexIndex++] = this._normals[normalIndex++];
                vertexData[vertexIndex++] = this._normals[normalIndex++];
                byteStride += 3 * Float32Array.BYTES_PER_ELEMENT;
            }
        }

        // Vertices
        this._vertexBuffer?.dispose();
        this._vertexBuffer = this._framework.bufferFactory.createVertexBuffer(
            vertexData,
            vertexCount,
            this._bufferUsage,
            "");

        // Indices
        this._indexBuffer?.dispose();
        if (this._indices != null && this._indices.length > 0) {
            this._indexBuffer = this._framework.bufferFactory.createIndexBuffer(this._indices, "");
        }
    }

    /** @inheritdoc */
    public dispose() {
        this._vertexBuffer?.dispose();
        this._indexBuffer?.dispose();
        this._state = State.DISPOSED;
    }
}