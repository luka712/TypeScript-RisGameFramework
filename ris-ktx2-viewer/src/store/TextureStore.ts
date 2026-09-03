import {
    type IFramework,
    type ITexture2D, TextureDescriptor,
    TextureFormat,
    TextureUsage,
} from "ris-framework-api";
import {create} from "zustand";
import type {ITexture2DContainer} from "../model/ITexture2DContainer.ts";
import {decodeImage, getKtx2Texture, isDecodableImage, isKtx2File} from "../service/TextureUtilities.ts";
import {VkFormat} from "ris-ktx2-api";

type TextureSelectedListener = (tex: ITexture2DContainer | null) => void;

interface TextureStore {
    framework: IFramework | null;
    textureFormat: TextureFormat;
    generateMipmaps: boolean;
    resolution: string;
    size: string;
    mipLevel: number,
    mipLevels: number;
    textures: ITexture2DContainer[];
    selectedTexture: ITexture2DContainer | null;

    setFramework: (framework: IFramework) => void;
    getMipLevel: () => number;
    getSelectedTexture: () => ITexture2DContainer | null;
    setSelectedTexture: (texture: ITexture2DContainer | null) => void;
    subscribeTextureSelected: (listener: TextureSelectedListener) => () => void;
    addTexture: (file: File) => Promise<void>;
    removeTexture: (texContainer: ITexture2DContainer) => void;
    setTextureFormat: (value: TextureFormat) => void;
    setMipmapLevel: (value: number) => void;
    setGenerateMipmaps: (value: boolean) => void;
    canGenerateMipmaps: () => boolean;
}

const DEFAULT_USAGE = TextureUsage.TEXTURE_BINDING | TextureUsage.COPY_DST;

function formatSizeMiB(bytes: number): string {
    return `${(bytes / (1024 * 1024)).toPrecision(3)} MiB`;
}

function metricsFromTexture(texture: ITexture2D | null | undefined) {
    if (!texture) {
        return {resolution: "0x0", size: "0 MiB", mipLevels: 0};
    }

    return {
        resolution: `${texture.width}x${texture.height}`,
        size: formatSizeMiB(texture.size),
        mipLevels: texture.mipLevels,
    };
}


function recreateTexture(
    framework: IFramework,
    container: ITexture2DContainer,
    textureFormat: TextureFormat,
    generateMipmaps: boolean,
): ITexture2D | null {
    const image = container.image;
    const ktx2 = container.ktxContainer;
    let texture = null;

    if(ktx2) {
        container.texture?.dispose();
        const desc = new TextureDescriptor();
        desc.textureFormat = textureFormat;
        desc.generateMipmaps = generateMipmaps;
        // Always use copy, in order to be able to change texture format.
        texture = framework.textureFactory.createFromKtx2(ktx2.createCopy(), desc);
    }
    else if (image) {
        container.texture?.dispose();

        texture = framework.textureFactory.create(
            image.width,
            image.height,
            image.pixels,
            4,
            container.name,
            DEFAULT_USAGE,
            textureFormat,
            generateMipmaps,
        );
    }
    
    container.texture = texture;
    return texture;
}

export const useTextureStore = create<TextureStore>((set, get) => {
    const listeners = new Set<TextureSelectedListener>();

    const notifySelected = (tex: ITexture2DContainer | null) => {
        for (const listener of listeners) {
            listener(tex);
        }
    };

    const applySelection = (tex: ITexture2DContainer | null) => {
        set({
            selectedTexture: tex,
            ...metricsFromTexture(tex?.texture),
            textureFormat: tex?.texture?.textureFormat ?? get().textureFormat,
            generateMipmaps: (tex?.texture?.mipLevels ?? 1) > 1,
        });
        notifySelected(tex);
    };

    return {
        framework: null,
        textureFormat: TextureFormat.RGBA_8_UNORM,
        generateMipmaps: false,
        resolution: "0x0",
        size: "0 MiB",
        mipLevel: 0,
        mipLevels: 1,
        textures: [],
        selectedTexture: null,

        setFramework: (framework) => set({framework}),

        getMipLevel: () => get().mipLevel,

        getSelectedTexture: () => get().selectedTexture,

        setSelectedTexture: (tex) => applySelection(tex),

        subscribeTextureSelected: (listener) => {
            listeners.add(listener);
            return () => {
                listeners.delete(listener);
            };
        },

        removeTexture: (texture) => {
            const {textures, selectedTexture} = get();
            const nextTextures = textures.filter((t) => t !== texture);

            texture.texture?.dispose();

            set({textures: nextTextures});

            if (selectedTexture === texture) {
                applySelection(nextTextures[0] ?? null);
            }
        },

        addTexture: async (file) => {
            if (get().textures.some((t) => t.name === file.name)) {
                console.warn(`Texture already added: ${file.name}`);
                return;
            }

            const framework = get().framework;
            if (!framework) {
                throw new Error("Framework has not been initialized");
            }

            let container: ITexture2DContainer;

            if (isDecodableImage(file)) {
                const image = await decodeImage(file);
                const texture = framework.textureFactory.create(
                    image.width,
                    image.height,
                    image.pixels,
                    4,
                    file.name,
                );

                container = {
                    name: file.name,
                    texture,
                    image,
                    ktxContainer: null,
                };
            } else if (isKtx2File(file)) {
                const ktx = await getKtx2Texture(file);
                const texture = framework.textureFactory.createFromKtx2(ktx.createCopy());

                container = {
                    name: file.name,
                    texture,
                    ktxContainer: ktx,
                    image: null,
                };
            } else {
                throw new Error(`Unsupported file type: ${file.name}`);
            }

            set((state) => ({
                textures: [...state.textures, container],
            }));
            applySelection(container);
        },

        setTextureFormat: (value) => {
            const {framework, selectedTexture, generateMipmaps} = get();
            if (!framework || !selectedTexture) {
                return;
            }

            set({textureFormat: value});
            recreateTexture(framework, selectedTexture, value, generateMipmaps && get().canGenerateMipmaps());
            applySelection(selectedTexture);
        },

        setMipmapLevel: (value) => {
            get().mipLevel = value;

            // TODO: set uniform buffer
        },

        setGenerateMipmaps: (value) => {
            const {framework, selectedTexture, textureFormat} = get();
            if (!framework || !selectedTexture) {
                return;
            }

            set({generateMipmaps: value});
            recreateTexture(framework, selectedTexture, textureFormat, value && get().canGenerateMipmaps());
            applySelection(selectedTexture);
        },

        canGenerateMipmaps: () => {
            const ktx = get().selectedTexture?.ktxContainer;
            const textureFormat = get().textureFormat;
            return !ktx || ktx.vkFormat === VkFormat.R8G8B8A8_UNORM || textureFormat === TextureFormat.RGBA_8_UNORM;
        }
    };
});
