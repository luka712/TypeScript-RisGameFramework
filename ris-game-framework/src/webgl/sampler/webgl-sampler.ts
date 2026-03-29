import { SamplerCompareFunction } from "../../common/sampler-enums";
import { MipmapSamplerFilter, SamplerAddressMode, SamplerFilter } from "../../core/rendering/sampler/enums";
import { SamplerDescriptor } from "../../core/rendering/sampler/sampler-descriptor";
import type { ISampler } from "../../core/rendering/sampler/sampler-interface";
import { WebGLUtilities } from "../utilities/webgl-utilities";
import type { WebGLGraphicsDevice } from "../webgl-graphics-device";

export class WebGLSampler implements ISampler {

    private readonly _graphicsDevice: WebGLGraphicsDevice;
    private readonly _gl: WebGL2RenderingContext;
    private _isDirty = true;
    private _minFilter = SamplerFilter.NEAREST;
    private _magFilter = SamplerFilter.NEAREST;
    private _mipMapFilter = MipmapSamplerFilter.NONE;
    private _addressModueU = SamplerAddressMode.CLAMP_TO_EDGE
    private _addressModueV = SamplerAddressMode.CLAMP_TO_EDGE;
    private _addressModueW = SamplerAddressMode.CLAMP_TO_EDGE;

    /**
     * Creates an instance of WebGLSampler.
     * @param graphicsDevice The WebGL graphics device that will be used to create the sampler. The graphics device provides access to the WebGL rendering context and other resources needed for creating and managing the sampler.
     * @param descriptor The descriptor containing configuration details for the sampler. This parameter is optional, and if not provided, default values will be used for the sampler configuration. The descriptor allows you to specify various properties of the sampler, such as filtering methods and address modes, which determine how textures are sampled in the shader.
     */
    constructor(graphicsDevice: WebGLGraphicsDevice, descriptor?: SamplerDescriptor) {

        this._graphicsDevice = graphicsDevice;
        this._gl = graphicsDevice.gl;

        descriptor = descriptor ?? new SamplerDescriptor();

        this._minFilter = descriptor.minFilter;
        this._magFilter = descriptor.magFilter;
        this._mipMapFilter = descriptor.mipMapFilter;
        this._addressModueU = descriptor.addressModeU;
        this._addressModueV = descriptor.addressModeV;
        this._addressModueW = descriptor.addressModeW;

        this.applyChanges();
    }

    /** @inheritdoc */
    public get minFilter() {
        return this._minFilter;
    }

    public set minFilter(value: SamplerFilter) {
        if (this._minFilter !== value) {
            this._minFilter = value;
            this._isDirty = true;
        }
    }

    /** @inheritdoc */
    public get magFilter() {
        return this._magFilter;
    }

    /** @inheritdoc */
    public set magFilter(value: SamplerFilter) {
        if (this._magFilter !== value) {
            this._magFilter = value;
            this._isDirty = true;
        }
    }

    /** @inheritdoc */
    public get mipMapFilter() {
        return this._mipMapFilter;
    }

    /** @inheritdoc */
    public set mipMapFilter(value: MipmapSamplerFilter) {
        if (this._mipMapFilter !== value) {
            this._mipMapFilter = value;
            this._isDirty = true;
        }
    }

    /** @inheritdoc */
    public get addressModueU() {
        return this._addressModueU;
    }

    /** @inheritdoc */
    public set addressModueU(value: SamplerAddressMode) {
        if (this._addressModueU !== value) {
            this._addressModueU = value;
            this._isDirty = true;
        }
    }

    /** @inheritdoc */
    public get addressModueV() {
        return this._addressModueV;
    }

    /** @inheritdoc */
    public set addressModueV(value: SamplerAddressMode) {
        if (this._addressModueV !== value) {
            this._addressModueV = value;
            this._isDirty = true;
        }
    }

    /** @inheritdoc */
    public get addressModueW() {
        return this._addressModueW;
    }

    /** @inheritdoc */
    public set addressModueW(value: SamplerAddressMode) {
        if (this._addressModueW !== value) {
            this._addressModueW = value;
            this._isDirty = true;
        }
    }

    /** @inheritdoc */
    public handle: any;

    /**
     * The handle of the sampler. 
     * This is used to bind the sampler to the graphics pipeline.
     */
    public glSampler: globalThis.WebGLSampler = null!;

    /** @inheritdoc */
    public applyChanges(): void {
        if (!this._isDirty) {
            return;
        }

        this._isDirty = false;

        if (this.glSampler != 0) {
            this._gl.deleteSampler(this.glSampler);
        }

        this.glSampler = WebGLUtilities.sampler.create(this._gl,
            this._minFilter,
            this._magFilter,
            this._mipMapFilter,
            this._addressModueU,
            this._addressModueV,
            this._addressModueW,
            SamplerCompareFunction.Never,
            1,
        );

        this.handle = this.glSampler;
    }

    /** @inheritdoc */
    public dispose(): void {
        if (this.glSampler) {
            this._gl.deleteSampler(this.glSampler);
            this.glSampler = null;
        }
    }


}