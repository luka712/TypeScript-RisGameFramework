import type { IDisposable } from "../../common/disposable";
import type { IIndexBuffer } from "../buffers/index-buffer-interface";
import type { IVertexBuffer } from "../buffers/vertex-buffer-interface";

/**
 * The IMesh interface represents a mesh in the rendering system.
 */
export interface IMesh extends IDisposable {


    /**
     * The vertex buffer of the mesh. 
     * This buffer contains the vertex data for the mesh, such as positions, normals, texture coordinates, etc.
     */
    readonly vertexBuffer: IVertexBuffer;

    /**
     * The index buffer of the mesh. 
     * This buffer contains the indices that define how the vertices are connected to form triangles or other primitives. 
     * This can be null if the mesh is not indexed and should be rendered using non-indexed drawing calls.
     */
    readonly indexBuffer: IIndexBuffer | null;
}