import {InspectTextureMipsMaterial} from "./InspectTextureMipsMaterial";
import {UnlitMaterial} from "./UnlitMaterial";

/**
 * The material factory.
 */
export interface IMaterialFactory {

    /**
     * Creates a material for inspecting texture mips.
     * @returns The Inspect Texture Mips Material.
     */
    createInspectTextureMipsMaterial(): InspectTextureMipsMaterial;

    /**
     * Creates an unlit material.
     * @returns The Unlit Material.
     */
    createUnlitMaterial(): UnlitMaterial;
}
