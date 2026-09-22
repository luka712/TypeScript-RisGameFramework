import {create} from "zustand";
import {type IKtx2Texture, type IKtxCreateInfo, KtxCreateStorage, VkFormat} from "ris-ktx2-api";
import type {ITexture2DContainer} from "../model/ITexture2DContainer.ts";
import {createKtx2TextureAsync, downloadKtx2} from "../service/TextureUtilities.ts";
import {
    KTX_ENCODING_BASIS_UNIVERSAL_ETC1S,
    KTX_ENCODING_BASIS_UNIVERSAL_UASTC
} from "../model/Ktx2EncodingConstants.ts";
import type {IKtxBasisParams} from "../../../ris-ktx2-api/src";
import {getCompressionLevel} from "../model/CompressionQualityConstants.ts";
import {changeFileExtension} from "../service/formatter.ts";
import {KTX2_FILE_EXTENSION} from "../model/FileExtensionConstants.ts";
import {ConvertParameters} from "../model/ConvertParameters.ts";
import {getPixels} from "../service/image.ts";

interface ConvertResult {
    success: boolean,
    ktx: IKtx2Texture | null,
    name: string | null
}

interface ConvertStore {

    convertToKtx2: (convertParameters: ConvertParameters) => Promise<ConvertResult>
    selectedTexture?: ITexture2DContainer,
    setSelectedTexture: (texture: ITexture2DContainer) => void
}


export const useConvertStore = create<ConvertStore>((set, get) => ({

    selectedTexture: undefined,
    setSelectedTexture: texture => set({selectedTexture: texture}),

    convertToKtx2: async (convertParameters: ConvertParameters) => {
        const selectedTexture = get().selectedTexture;
        if (!selectedTexture) {

            // TODO: alert somehow
            throw new Error("No texture selected");
        }

        const image = selectedTexture.image;
        if (!image) {
            // TODO: alert somehow
            throw new Error("No image selected");
        }

        const fileName = changeFileExtension(convertParameters.fileName, KTX2_FILE_EXTENSION);

        const desc: IKtxCreateInfo = {
            baseWidth: image.baseWidth,
            baseHeight: image.baseHeight,
            vkFormat: VkFormat.R8G8B8A8_UNORM
        };
        const tex = await createKtx2TextureAsync(desc, KtxCreateStorage.ALLOC_STORAGE);
        const data = image.getData(0);
        const pixelsPerMipLevel = getPixels(data, convertParameters.generateMipmaps)
        if(data instanceof HTMLImageElement){
            tex.setImageFromMemory(0, 0, 0, pixelsPerMipLevel[0]);
        }
        else {
            throw new Error("Unsupported image type");
        }

        // If universal basis
        const encoding = convertParameters.encoding;
        const uastc = encoding == KTX_ENCODING_BASIS_UNIVERSAL_UASTC;
        if (uastc || encoding === KTX_ENCODING_BASIS_UNIVERSAL_ETC1S) {
            const basisParams : IKtxBasisParams = {
                uastc,
                compressionLevel: getCompressionLevel(convertParameters.compressionLevel)
            };
            tex.compressBasis(basisParams);
        }

        // Get memory from the ktx file.
        const memory = tex.writeToMemory();

        // Download ktx to user PC.
        downloadKtx2(memory, fileName);

        // We need to create a copy of texture because original might not be in correct storage state.
        const ktxCopy = tex.createCopy();

        return {
            success: true,
            ktx: ktxCopy,
            name: fileName,
        }
    }
}));
