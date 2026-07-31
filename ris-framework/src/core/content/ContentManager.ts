import type {IShaderModule, IContentManager, IShaderModuleLoader} from "ris-framework-api";

/**
 * The content manager.
 * The content manager is responsible for managing the content modules and loading the content with the given asset file path or identifier.
 */
export class ContentManager implements IContentManager {


    /**
     * The constructor.
     * @param shaderModuleLoader The shader module loader.
     */
    public constructor(public readonly shaderModuleLoader: IShaderModuleLoader) {

    }

    /** @inheritDoc */
    public loadKtx2Async(path: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    /** @inheritDoc */
    public loadShaderModule(shaderModuleId: string): IShaderModule {
        return this.shaderModuleLoader.load(shaderModuleId);
    }

}