import type { IFramework } from '../../core/framework-interface';
import type { IRenderPipeline } from '../../core/render-pipelines/render-pipeline-interface';
import type { VertexBufferLayout } from '../../core/rendering/vertex-buffer-layout';
import { asWebGLGraphicsDevice, asWebGLRenderer } from '../cast/cast';
import { WebGLConverter } from '../utilities/webgl-converter';

/**
 * The base class for WebGL render pipelines. This class provides common functionality for all WebGL render pipelines.
 */
export abstract class AWebGLRenderPipeline implements IRenderPipeline {

    /** The framework instance. */
    protected readonly _framework: IFramework;
    private readonly _gl: WebGL2RenderingContext;

    protected _vertexArrayObject: WebGLVertexArrayObject | null = null;

    protected _vertexBufferLayouts: VertexBufferLayout[] = [];

    /**
     * The constructor.
     * @param framework The framework.
     */
    constructor(framework: IFramework) {
        this._framework = framework;
        this._gl = asWebGLGraphicsDevice(framework.renderer.graphicsDevice).gl;
    }

    /** @inheritDoc */
    public get vertexBufferLayouts(): VertexBufferLayout[] {
        return this._vertexBufferLayouts;
    }

    /**
     * Provide WebGL buffers for the render pipeline. 
     * This method should be implemented by subclasses to provide the necessary buffers
     * for creatine the vertex array object.
     * @returns An array of WebGLBuffer objects to be used in the vertex array object.
     */
    protected abstract _provideBuffers(): WebGLBuffer[];

    /**
     * Creates the vertex array object for the render pipeline.
     *  This method binds the provided buffers and sets up the vertex attribute pointers based on the vertex buffer layouts.
     */
    protected _createVertexArrayObject(): void {
        this._vertexArrayObject = this._gl.createVertexArray();
        const buffers = this._provideBuffers();

        for (let i = 0; i < this._vertexBufferLayouts.length; i++) {
            const layout = this._vertexBufferLayouts[i];
            const buffer = buffers[i];

            this._gl.bindVertexArray(this._vertexArrayObject);
            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, buffer);

            const stride = layout.arrayStride;
            for (const attribute of layout.attributes) {

                const size = WebGLConverter.convertVertexFormat(attribute.format);
                const index = attribute.shaderLocation;
                const offset = attribute.offset;

                this._gl.enableVertexAttribArray(index);
                this._gl.vertexAttribPointer(index, size, this._gl.FLOAT, false, stride, offset);
            }
        }
    }

    /**
     * Set up the pipeline state.
     *  This method should be called before rendering to set up the necessary pipeline state, such as blending, depth testing, etc.
     */
    protected _setupPipeline(): void {
        {
            _blendState.Apply(_gl);
        }

    /** @inheritDoc */
    public initialize(): void {

        if (!this.vertexBufferLayouts || this.vertexBufferLayouts.length === 0) {
            throw new Error('At least one vertex buffer layout must be provided for the render pipeline.');
        }

        this._createVertexArrayObject();
    }

    /** @inheritDoc */
    dispose(): void {
        if (this._vertexArrayObject) {
            this._gl.deleteVertexArray(this._vertexArrayObject);
            this._vertexArrayObject = null;
        }
    }

}