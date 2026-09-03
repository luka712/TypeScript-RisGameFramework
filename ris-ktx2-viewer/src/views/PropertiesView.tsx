import {Container, Divider, Stack} from "@mui/material";
import SamplerFilterSelect from "../components/SamplerFilterSelect.tsx";
import {useSamplerStore} from "../store/SamplerStore.ts";
import TextureFormatSelect from "../components/TextureFormatSelect.tsx";
import {useTextureStore} from "../store/TextureStore.ts";
import {GenerateMipmapsSelect} from "../components/GenerateMipmapsSelect.tsx";
import MipLevelSelect from "../components/MipLevelSelect.tsx";

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

    return (
        <Container>
            <Stack direction="column">
                <SamplerFilterSelect
                    label="Filter"
                    value={filter}
                    onValueChange={setFilter}
                    topMost
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
                            bottomMost
                        />
                    </>
                )}
                <MipLevelSelect label="Mipmap Level" value={mipmapLevel} valueMax={mipmapLevels} onValueChange={setMipmapLevel} />
            </Stack>
        </Container>
    );
}
