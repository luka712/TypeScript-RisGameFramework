import {
    type IFramework,
    type ITexture2D, TextureDescriptor,
    TextureFormat
} from "ris-framework-api";
import {create, type StoreApi, type UseBoundStore} from "zustand";
import type {ITexture2DContainer} from "../model/ITexture2DContainer.ts";
import {decodeImage, getKtx2Texture} from "../service/TextureUtilities.ts";
import {ContentConfig} from "../../../ris-framework-api/dist/ris-framework/content/ContentConfig";
import {TextureUsage} from "../../../ris-framework-api";

interface TextureStore {
    framework?: IFramework;
    texture?: ITexture2D;
    textureFormat: TextureFormat,
    generateMipmaps: boolean,

    resolution: string,
    getResolution: () => string,
    size: string,
    mipLevels: number,

    textures: ITexture2DContainer[];
    selectedTexture: ITexture2DContainer | null;
    getSelectedTexture: () => ITexture2DContainer | null;
    setSelectedTexture: (texture: ITexture2DContainer) => void;
    onTextureSelectedCallbacks: ((tex: ITexture2DContainer) => void)[],
    onTextureSelected: (callback: (tex: ITexture2DContainer) => void) => void;
    addTexture: (filePath: File) => void;
    removeTexture: (texContainer: ITexture2DContainer) => void;

    getTexture: () => ITexture2D | undefined,

    setFramework: (frame: IFramework) => void,
    setTexture: (value: ITexture2D) => void,
    setTextureFormat: (value: TextureFormat) => void,
    setGenerateMipmaps: (value: boolean) => void,
}

export const useTextureStore: UseBoundStore<StoreApi<TextureStore>> = create<TextureStore>(
    (set, get) => ({
        onTextureSelectedCallbacks: [],

        selectedTexture: null,
        getSelectedTexture: () => get().selectedTexture,
        ktxTextures: [],
        textures: [],

        resolution: "0x0",
        getResolution: () => get().resolution,
        size: "0MiB",
        mipLevels: 0,

        setFramework: (v) => set({
            framework: v
        }),

        setTexture: (v) => set({
            texture: v
        }),

        textureFormat: TextureFormat.RGBA_8_UNORM,
        generateMipmaps: false,

        setTextureFormat: (v) => {


            const fw = get().framework!;
            const selectedTex = get().selectedTexture;

            if (!selectedTex) {
                return;
            }

            const image = selectedTex.image;

            const texDesc = new TextureDescriptor();
            texDesc.format = v;
            texDesc.generateMipmaps = get().generateMipmaps;
            get().texture?.dispose();

            const contentConfig = new ContentConfig();
            contentConfig.keepImageDataCached = true;

            const newTex = fw.textureFactory.create(
                image.width, image.height, image.pixels, 4, undefined,
                TextureUsage.TEXTURE_BINDING | TextureUsage.COPY_DST,
                texDesc.format,
                texDesc.generateMipmaps
            );

            selectedTex.texture = newTex;
            set(() => ({
                textureFormat: v
            }));
            get().setSelectedTexture(selectedTex);
        },

        setGenerateMipmaps: (v) => {
            const fw = get().framework!;
            const selectedTex = get().selectedTexture;

            if (!selectedTex) {
                return;
            }

            const image = selectedTex.image;

            const texDesc = new TextureDescriptor();
            texDesc.generateMipmaps = v;
            texDesc.format = get().textureFormat;
            get().texture?.dispose();

            const contentConfig = new ContentConfig();
            contentConfig.keepImageDataCached = true;

            const newTex = fw.textureFactory.create(
                image.width, image.height, image.pixels, 4, undefined,
                TextureUsage.TEXTURE_BINDING | TextureUsage.COPY_DST,
                texDesc.format,
                texDesc.generateMipmaps
            );

            selectedTex.texture = newTex;
            get().setSelectedTexture(selectedTex);
            set(() => ({
                 generateMipmaps: v
            }));
        },

        removeTexture: (texture: ITexture2DContainer) => {

            set((state) => ({
                textures: [
                    ...state.textures.splice(state.textures.indexOf(texture))
                ],
            }));
            texture.texture?.dispose();
        },

        addTexture: async (file) => {

            if (get().textures.map(t => t.name).indexOf(file.name) > -1) {
                // TODO: message as texture is already added

                return;
            }

            const framework = get().framework;

            if (!framework) {
                throw new Error("Framework has not been initialized");
            }

            const canBeDecoded =
                file.type === "image/png" ||
                file.type === "image/jpeg" ||
                file.type === "image/jpg" ||
                file.type === "image/webp";

            if (canBeDecoded) {
                const image = await decodeImage(file);
                const texture = framework.textureFactory.create(
                    image.width,
                    image.height,
                    image.pixels
                );

                const container: ITexture2DContainer = {
                    name: file.name,
                    texture: texture,
                    image: image,
                    ktxContainer: null
                }

                // Set as selected texture
                get().setSelectedTexture(container);

                set((state) => ({
                    textures: [
                        ...state.textures,
                        container,
                    ],
                }));
            } else if (file.name.endsWith(".ktx2")) {

                const ktx = await getKtx2Texture(file);
                const texture = framework.textureFactory.createFromKtx2(ktx);

                const container: ITexture2DContainer = {
                    name: file.name,
                    texture: texture,
                    ktxContainer: ktx
                }

                for (const callback of get().onTextureSelectedCallbacks) {
                    callback(container);
                }

                get().setSelectedTexture(container);

                set((state) => ({
                    textures: [
                        ...state.textures,
                        container,
                    ],
                }));
            } else {
                throw new Error("Not implemented");
            }

        },

        onTextureSelected: (callback) => get().onTextureSelectedCallbacks.push(callback),
        setSelectedTexture: (tex: ITexture2DContainer) => {

            let resolution = "0x0";
            let size = "0MiB";
            let mips = 1;
            const texture = tex.texture;
            if(texture){
                resolution = `${texture.width}x${texture.height}`;
                size = `${(texture.size / (1024.0 * 1024.0)).toPrecision(3)} MiB`;
                mips = texture.mipLevels;
            }

            set({
                selectedTexture: tex,
                resolution: resolution,
                size: size,
                mipLevels: mips
            })

            for (const callback of get().onTextureSelectedCallbacks) {
                callback(tex);
            }

        },

        getTexture: () => get().texture
    })
);
