import type { IDisposable } from "../../common/disposable";
import { VertexStepMode } from "../../common/vertex-step-mode";
import type { AVertexAttribute } from "./a-vertex-attribute";

/**
 * The abstract base class for vertex buffer layouts.
 * A vertex buffer layout defines the layout of a vertex buffer, including the stride, step mode, and attributes.
 * It is used to define how the vertex shader will read the vertex data from the vertex buffer.
 */
export abstract class AVertexBufferLayout implements IDisposable {

    /**
     * The stride, in bytes, between elements of the vertex buffer.
     */
    arrayStride: number = 0;

    /**
     * The step mode of the vertex buffer.
     */
    stepMode: VertexStepMode = VertexStepMode.Vertex;

    /**
     * The attributes of the vertex buffer. 
     * It defines the layout of the vertex buffer, and how the vertex shader will read the vertex data.
     */
    attributes: AVertexAttribute[] = [];

    /**
     * Initializes the vertex buffer layout.
     */
    abstract initialize(): void;

    /** @inheritdoc */
    dispose(): void {
        // Base implementation does nothing, but derived classes can override this to clean up resources if needed.
    }
}