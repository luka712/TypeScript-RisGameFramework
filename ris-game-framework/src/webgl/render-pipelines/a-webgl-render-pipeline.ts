import type { IFramework } from '../../core/framework-interface';
import type { IRenderPipeline } from '../../core/render-pipelines/render-pipeline-interface';
import type { AVertexBufferLayout } from '../../core/rendering/a-vertex-buffer-layout';
import { asWebGLRenderer } from '../cast/cast';

/**
 * The base class for WebGL render pipelines. This class provides common functionality for all WebGL render pipelines.
 */
export abstract class AWebGLRenderPipeline implements IRenderPipeline {

    private readonly _framework: IFramework;
    private readonly _gl: WebGL2RenderingContext;

    protected _vertexArrayObject: WebGLVertexArrayObject | null = null;

    /**
     * The constructor.
     * @param framework The framework.
     */
    constructor(framework: IFramework) {
        this._framework = framework;
        this._gl = asWebGLRenderer(this._framework.renderer).gl!;
    }

    /** @inheritDoc */
    vertexBufferLayouts: AVertexBufferLayout[] = null!;

    /** @inheritDoc */
    initialize(): void {

        if (!this.vertexBufferLayouts || this.vertexBufferLayouts.length === 0) {
            throw new Error('At least one vertex buffer layout must be provided for the render pipeline.');
        }

        this._vertexArrayObject = this._gl.createVertexArray();
        this._gl.bindVertexArray(this._vertexArrayObject);

        for(const vertexBufferLayout of this.vertexBufferLayouts) {
            vertexBufferLayout.initialize();
        }

    }

    /** @inheritDoc */
    dispose(): void {
        if (this._vertexArrayObject) {
            this._gl.deleteVertexArray(this._vertexArrayObject);
            this._vertexArrayObject = null;
        }
    }

}