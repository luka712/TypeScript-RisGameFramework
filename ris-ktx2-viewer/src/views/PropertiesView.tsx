import {Container, Divider, Stack} from "@mui/material";
import SamplerFilterSelect from "../components/SamplerFilterSelect.tsx";
import {useSamplerStore} from "../store/SamplerStore.ts";
import TextureFormatSelect from "../components/TextureFormatSelect.tsx";
import {useTextureStore} from "../store/TextureStore.ts";
import {GenerateMipmapsSelect} from "../components/GenerateMipmapsSelect.tsx";
import MipLevelSelect from "../components/MipLevelSelect.tsx";
import {View2D, View3D} from "../model/View.ts";
import {useAppStore} from "../store/AppStore.ts";
import StringSelect from "../components/StringSelect.tsx";

/**
 * Editable sampler / texture properties for the selected texture.
 */
export function PropertiesView() {
    const selectedTexture = useTextureStore((store) => store.selectedTexture);

    const setFilter = useSamplerStore((store) => store.setFilter);
    const setTextureFormat = useTextureStore((store) => store.setTextureFormat);
    const setGenerateMipmaps = useTextureStore((store) => store.setGenerateMipmaps);
    const setMipmapLevel = useTextureStore(store => store.setMipmapLevel);

    const filter = useSamplerStore((store) => store.filter);
    const textureFormat = useTextureStore((store) => store.textureFormat);
    const generateMipmaps = useTextureStore((store) => store.generateMipmaps);
    const canGenerateMips = useTextureStore((store) => store.canGenerateMipmaps);
    const mipmapLevel = useTextureStore(store => store.mipLevel);
    const mipmapLevels = useTextureStore(store => store.mipLevels);

    const viewOptions = [View2D, View3D];
    const view = useAppStore(store => store.view);
    const setView = useAppStore((store) => store.setView);

    return (
        <Container>
            <Stack direction="column">

                <StringSelect label="View" value={view} options={viewOptions} onValueChange={setView} topMost />
                <Divider />
                <SamplerFilterSelect
                    label="Filter"
                    value={filter}
                    onValueChange={setFilter}
                />
                <Divider/>
                <TextureFormatSelect
                    label="Texture Format"
                    value={textureFormat}
                    onValueChange={setTextureFormat}
                    bottomMost={!canGenerateMips}
                />
                {canGenerateMips() && (
                    <>
                        <Divider/>
                        <GenerateMipmapsSelect
                            label="Generate Mipmaps"
                            value={generateMipmaps}
                            onValueChange={setGenerateMipmaps}
                        />
                    </>
                )}
                <MipLevelSelect label="Mipmap Level" value={mipmapLevel} valueMax={mipmapLevels} onValueChange={setMipmapLevel} bottomMost />
            </Stack>
        </Container>
    );
}
