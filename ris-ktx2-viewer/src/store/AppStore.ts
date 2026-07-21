import {create, type StoreApi, type UseBoundStore} from "zustand";
import type {IKtx2Texture} from "../../../ris-ktx2/dist/ktx-texture-interface";

interface AppStore {
    ktxTextures: IKtx2Texture[];
    theme: string;
    setKtxTextures: (ktxTextures: IKtx2Texture[]) => void;
    addKtxTexture: (ktxTexture: IKtx2Texture) => void;
    setTheme: (theme: string) => void;
}

export const useAppStore: UseBoundStore<StoreApi<AppStore>> = create((set) => ({
    ktxTextures: [],
    theme: "light",
    setKtxTextures: (ktxTextures) => set({ ktxTextures }),
    setTheme: (theme) => set({ theme }),
    addKtxTexture: (ktxTexture) => set((state) => {

        if(state.ktxTextures.find(tex => tex.filePath === ktxTexture.filePath)) {
            return state;
        }

      return ({ ktxTextures: [...state.ktxTextures, ktxTexture] });
    })
}));