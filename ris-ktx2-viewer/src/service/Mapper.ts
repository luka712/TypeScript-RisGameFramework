import {TextureFormat} from "../../../ris-framework-api";

export class Mapper {

    public static readonly mapTextureFormatToString = {
        [TextureFormat.RGBA_8_UNORM] : "RGBA_8_UNORM",
        [TextureFormat.BC7_RGBA_UNORM] : "BC7_RGBA_UNORM",
    }

}