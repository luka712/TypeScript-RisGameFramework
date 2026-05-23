import { type PrimitiveTopology, CullMode, type FrontFace } from "../../core/rendering/primitive/enums";
import type { PrimitiveStateDescriptor } from "../../core/rendering/primitive/primitive-state-descriptor";
import type { IPrimitiveState } from "../../core/rendering/primitive/primitve-interface";
import { WebGLConverter } from "../utilities/webgl-converter";

/**
* The WebGL implementation of primitive state.
*/
export class WebGlPrimitiveState implements IPrimitiveState {
    private readonly _cullingEnabled: boolean;
    private _glPrimitiveType: number;
    private _glCullFace: number;
    private _glFrontFace: number;

    /**
    * The constructor.
    * @param gl The WebGL rendering context.
        * @param descriptor The descriptor of the primitive state.
    */
    public constructor(gl: WebGL2RenderingContext, descriptor: PrimitiveStateDescriptor) {
        this.topology = descriptor.topology;
        this.cullFace = descriptor.cullFace;
        this.frontFace = descriptor.frontFace;

        this._cullingEnabled = this.cullFace != CullMode.NONE;

        this._glPrimitiveType = WebGLConverter.convertPrimitiveType(this.topology);
        this._glCullFace = WebGLConverter.convertCullFace(this.cullFace);
        this._glFrontFace = WebGLConverter.convertFrontFace(this.frontFace);
    }

    /** @inheritdoc */
    public readonly topology: PrimitiveTopology;

    /** @inheritdoc */
    public readonly cullFace: CullMode;

    /** @inheritdoc */
    public readonly frontFace: FrontFace;

    /**
    * The primitive type to draw.
    */
    public get glPrimitiveType() {
        return this._glPrimitiveType;
    }

    /** @inheritdoc */
    public apply(gl: WebGL2RenderingContext) {
        if (this._cullingEnabled) {
            gl.enable(gl.CULL_FACE);
            gl.cullFace(this._glCullFace);
        }
        else {
            gl.disable(gl.CULL_FACE);
        }

        gl.frontFace(this._glFrontFace);
    }
}