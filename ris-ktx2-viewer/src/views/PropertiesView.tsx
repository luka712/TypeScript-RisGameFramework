import {Container, Divider, Stack} from "@mui/material";
import SamplerFilterSelect from "../components/SamplerFilterSelect.tsx";
import {useSamplerStore} from "../store/SamplerStore.ts";
import TextureFormatSelect from "../components/TextureFormatSelect.tsx";
import {useTextureStore} from "../store/TextureStore.ts";
import {GenerateMipmapsSelect} from "../components/GenerateMipmapsSelect.tsx";
import {VkFormat} from "../../../ris-ktx2-api";

/**
 * The properties of a texture.
 * @constructor
 */
export function PropertiesView() {

    const getSelectedTexture = useTextureStore(store => store.getSelectedTexture);

    const setMagFilter = useSamplerStore(store => store.setMagFilter);
    const setMinFilter = useSamplerStore(store => store.setMinFilter);
    const setTextureFormat = useTextureStore(store => store.setTextureFormat);
    const setGenerateMipmaps = useTextureStore(store => store.setGenerateMipmaps);

    const magFilter = useSamplerStore(store => store.magFilter);
    const minFilter = useSamplerStore(store => store.minFilter);
    const textureFormat = useTextureStore(store => store.textureFormat);
    const generateMipmaps = useTextureStore(store => store.generateMipmaps);

    // If it's ktx and compressed format, we cannot generate mip levels.
    const shouldGenMips = () => !getSelectedTexture()?.ktxContainer ||
        getSelectedTexture()!.ktxContainer?.vkFormat == VkFormat.R8G8B8A8_UNORM;

    return (
        <Container>
            <Stack direction="column">
                <SamplerFilterSelect label={"Mag Filter"} value={magFilter} onValueChange={setMagFilter} topMost={true}/>
                <Divider />
                <SamplerFilterSelect label={"Min Filter"} value={minFilter} onValueChange={setMinFilter}/>
                <Divider />
                <TextureFormatSelect label={"Texture Format"} value={textureFormat} onValueChange={setTextureFormat} />
                <Divider />
                {shouldGenMips() && <GenerateMipmapsSelect label={"Generate Mipmaps"} value={generateMipmaps} onValueChange={setGenerateMipmaps} bottomMost={true} />}
            </Stack>
        </Container>
    );
}