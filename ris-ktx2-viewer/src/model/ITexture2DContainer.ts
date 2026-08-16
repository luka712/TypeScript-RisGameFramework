import type {ITexture2D} from "ris-framework-api"
import type {IKtx2Texture} from "../../../ris-ktx2/dist/ktx-texture-interface";
import type {IImage} from "./IImage.ts";

export interface ITexture2DContainer {
    name: string;
    texture: ITexture2D | null | undefined;
    ktxContainer: IKtx2Texture | null | undefined;
    image: IImage;
}