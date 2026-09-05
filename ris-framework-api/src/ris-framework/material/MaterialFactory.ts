import {InspectTextureMipsMaterial} from "./InspectTextureMipsMaterial";
import {IFramework} from "../IFramework";

/**
 * The material factory.
 */
export class MaterialFactory {

    /**
     * The constructor.
     * @param _framework The framework.
     */
    public constructor(private readonly _framework: IFramework) {
    }

    /**
     * Creates the Inspect Texture Mips Material.
     * @returns The InspectTextureMipsMaterial
     */
    public createInspectTextureMipsMaterial(): InspectTextureMipsMaterial {
        return new InspectTextureMipsMaterial(this._framework);
    }
}
