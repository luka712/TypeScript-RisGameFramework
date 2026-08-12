import type {ITexture2D} from "../../../ris-framework-api/src";
import type {IKtx2Texture} from "../../../ris-ktx2/dist/ktx-texture-interface";

export interface ITexture2DContainer {
    name: string;
    texture: ITexture2D | null;
    ktxContainer: IKtx2Texture | null;
}