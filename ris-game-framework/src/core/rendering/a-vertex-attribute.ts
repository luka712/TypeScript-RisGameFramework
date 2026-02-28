import type { IDisposable } from '../../common/disposable';
import { VertexFormat } from '../../common/vertex-format';
export abstract class AVertexAttribute implements IDisposable {
   
    /**
     * The format of the vertex attribute.
     */
    vertexFormat: VertexFormat = VertexFormat.Float32;

    /**
     * The offset, in bytes, of the vertex attribute from the start of the vertex.
     */
    offset: number = 0;

    /**
     * The shader location of the vertex attribute.
     *  This is used to bind the vertex attribute to the correct location in the shader.
     */
    shaderLocation: number = 0;
    
    /**
     * Initializes the vertex attribute.
     */
    abstract initialize(): void;

    /** @inheritdoc */
     dispose(): void {
            // Do nothing by default. Subclasses can override this if they need to dispose of any resources.
    }
}