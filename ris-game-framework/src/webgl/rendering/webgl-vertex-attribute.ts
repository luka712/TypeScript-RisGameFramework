import { AVertexAttribute } from "../../core/rendering/a-vertex-attribute";

/**
 * The WebGL implementation of a vertex attribute.
 */
export class WebGLVertexAttribute extends AVertexAttribute {
    constructor(
        public gl: WebGL2RenderingContext,
    ) {
        super();
    }

    /** @inheritdoc */
    initialize(): void {
        // No initialization is needed for WebGL vertex attributes.
    }
}