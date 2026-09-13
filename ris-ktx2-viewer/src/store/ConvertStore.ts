import {create} from "zustand";
import {Ktx2Factory} from "ris-ktx2";
import {type IKtxCreateInfo, KtxCreateStorage} from "ris-ktx2-api";
import type {ITexture2DContainer} from "../model/ITexture2DContainer.ts";
import {createKtx2TextureAsync, createKtx2TextureFromBufferAsync, downloadKtx2} from "../service/TextureUtilities.ts";
import {TextureUtilities} from "ris-framework-api";


interface ConvertStore {

   convertToKtx2: (fileName: string) => void
    selectedTexture?: ITexture2DContainer,
    setSelectedTexture: (texture: ITexture2DContainer) => void
}

export const useConvertStore = create<ConvertStore>((set, get) => ({

    selectedTexture: undefined,
    setSelectedTexture: texture => set({selectedTexture: texture}),

    convertToKtx2: async (fileName) => {

        const selectedTexture = get().selectedTexture;
        if(!selectedTexture) {

            // TODO: alert somehow
            return;
        }

        const image = selectedTexture.image;
        if(!image){
            // TODO: alert somehow
            return;
        }

        const desc: IKtxCreateInfo = {
            baseWidth: image.width,
            baseHeight: image.height
        };
        const tex = await createKtx2TextureAsync(desc, KtxCreateStorage.ALLOC_STORAGE);
        tex.setImageFromMemory(0,0,0, image.pixels);

        const memory = tex.writeToMemory();
        const texCopy = createKtx2TextureFromBufferAsync(memory);

        downloadKtx2(memory, fileName);

    }
}));
