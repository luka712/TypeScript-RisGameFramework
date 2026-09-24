import {create} from "zustand";
import {type IKtx2Texture, type IKtxTextureCreateInfo, KtxCreateStorage, VkFormat} from "ris-ktx2-api";
import type {ITexture2DContainer} from "../model/ITexture2DContainer.ts";
import {createKtx2TextureAsync, downloadKtx2} from "../service/TextureUtilities.ts";
import {
    KTX_ENCODING_BASIS_UNIVERSAL_ETC1S,
    KTX_ENCODING_BASIS_UNIVERSAL_UASTC, KTX_ENCODING_RGBA
} from "../model/Ktx2EncodingConstants.ts";
import type {IKtxBasisParams} from "../../../ris-ktx2-api/src";
import {changeFileExtension} from "../service/formatter.ts";
import {KTX2_FILE_EXTENSION} from "../model/FileExtensionConstants.ts";
import {ConvertParameters} from "../model/ConvertParameters.ts";
import type {IFramework} from "ris-framework-api";
import {KTX_COMPRESSION_ZLIB, KTX_COMPRESSION_ZSTANDARD} from "../model/Ktx2CompressionConstants.ts";
import {
    etECT1SQualityLevel,
    getUastcEncodingFlags
} from "../model/CompressionQualityConstants.ts";
import {getUastcRDOQualityScalar} from "../model/RDOCompressionConstants.ts";

interface ConvertResult {
    success: boolean,
    ktx: IKtx2Texture | null,
    name: string | null
}

interface ConvertStore {
    framework?: IFramework,
    setFramework: (framework: IFramework) => void,
    convertToKtx2: (convertParameters: ConvertParameters) => Promise<ConvertResult>
    selectedTexture?: ITexture2DContainer,
    setSelectedTexture: (texture: ITexture2DContainer) => void
}


export const useConvertStore = create<ConvertStore>((set, get) => ({

    framework: undefined,
    setFramework: (framework: IFramework) => set({framework}),

    selectedTexture: undefined,
    setSelectedTexture: texture => set({selectedTexture: texture}),

    convertToKtx2: async (convertParameters: ConvertParameters) => {

        const fw = get().framework;
        if (!fw) {
            // This should never happen.
            throw new Error("Framework not set");
        }

        const selectedTexture = get().selectedTexture;
        if (!selectedTexture || !selectedTexture.image) {
            // This should never happen.
            throw new Error("No texture selected");
        }

        // Work on a local image reference; never mutate the live selection.
        const sourceImage = selectedTexture.image;
        let image = sourceImage;
        let mipmapsImage: typeof sourceImage | null = null;

        try {
            if (convertParameters.generateMipmaps) {
                mipmapsImage = await fw.imageProcessor.generateMipmapsAsync(sourceImage);
                image = mipmapsImage;
            }

            const fileName = changeFileExtension(convertParameters.fileName, KTX2_FILE_EXTENSION);

            const desc: IKtxTextureCreateInfo = {
                baseWidth: image.baseWidth,
                baseHeight: image.baseHeight,
                vkFormat: VkFormat.R8G8B8A8_UNORM,
                numLevels: image.numLevels,
            };
            const tex = await createKtx2TextureAsync(desc, KtxCreateStorage.ALLOC_STORAGE);

            for (let i = 0; i < desc.numLevels!; i++) {
                let data = image.getData(i);
                if (data instanceof HTMLImageElement) {
                    data = fw.imageProcessor.getBytesFromHtmlImage(data);
                } else {
                    throw new Error("Unsupported image type");
                }
                tex.setImageFromMemory(i, 0, 0, data as unknown as ArrayBufferView);

            }

            // If universal basis
            const encoding = convertParameters.encoding;
            const uastc = encoding == KTX_ENCODING_BASIS_UNIVERSAL_UASTC;
            if (uastc || encoding === KTX_ENCODING_BASIS_UNIVERSAL_ETC1S) {
                const basisParams: IKtxBasisParams = {
                    verbose: true
                };

                if(uastc){
                    basisParams.uastc = true;
                    basisParams.uastcFlags = getUastcEncodingFlags(convertParameters.uastcQuality);
                    basisParams.uastcRDO = true;
                    basisParams.uastcRDOQualityScalar = getUastcRDOQualityScalar(convertParameters.rdoQuality);
                }
                else {
                    basisParams.qualityLevel = etECT1SQualityLevel(convertParameters.uastcQuality);
                }
                tex.compressBasis(basisParams);
            }

            // We need to create a copy of texture because the original might not be in the correct storage state.
            // Copy must be created before deflate operation.
            const ktxCopy = tex.createCopy();

            const noEncoding = encoding == KTX_ENCODING_RGBA;
            if (convertParameters.compression == KTX_COMPRESSION_ZSTANDARD && (uastc || noEncoding)) {
                tex.deflateZstd(convertParameters.compressionLevelZstd);
            } else if (convertParameters.compression == KTX_COMPRESSION_ZLIB && (uastc || noEncoding)) {
                tex.deflateZlib(convertParameters.compressionLevelZLib);
            }

            // Get memory from the ktx file.
            const memory = tex.writeToMemory();

            // Download ktx to user PC.
            downloadKtx2(memory, fileName);

            return {
                success: true,
                ktx: ktxCopy,
                name: fileName,
            }
        } finally {
            // Dispose only the temporary mipmap image, never the selection's image.
            mipmapsImage?.dispose();
        }
    }
}));
