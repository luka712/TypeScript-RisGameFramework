import {Container, Divider, Stack} from "@mui/material";
import SamplerFilterSelect from "../components/SamplerFilterSelect.tsx";
import {useSamplerStore} from "../store/SamplerStore.ts";
import TextureFormatSelect from "../components/TextureFormatSelect.tsx";
import {useTextureStore} from "../store/TextureStore.ts";
import {GenerateMipmapsSelect} from "../components/GenerateMipmapsSelect.tsx";

/**
 * The properties of a texture.
 * @constructor
 */
export function PropertiesView() {


    const setMagFilter = useSamplerStore(store => store.setMagFilter);
    const setMinFilter = useSamplerStore(store => store.setMinFilter);
    const setTextureFormat = useTextureStore(store => store.setTextureFormat);
    const setGenerateMipmaps = useTextureStore(store => store.setGenerateMipmaps);

    const magFilter = useSamplerStore(store => store.magFilter);
    const minFilter = useSamplerStore(store => store.minFilter);
    const textureFormat = useTextureStore(store => store.textureFormat);
    const generateMipmaps = useTextureStore(store => store.generateMipmaps);

    return (
        <Container>
            <Stack direction="column">
                <SamplerFilterSelect label={"Mag Filter"} value={magFilter} onValueChange={setMagFilter} topMost={true}/>
                <Divider />
                <SamplerFilterSelect label={"Min Filter"} value={minFilter} onValueChange={setMinFilter}/>
                <Divider />
                <TextureFormatSelect label={"Texture Format"} value={textureFormat} onValueChange={setTextureFormat} />
                <Divider />
                <GenerateMipmapsSelect label={"Generate Mipmaps"} value={generateMipmaps} onValueChange={setGenerateMipmaps} bottomMost={true} />
            </Stack>
        </Container>
    );
}