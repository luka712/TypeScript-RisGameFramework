import {Container, Divider, Stack} from "@mui/material";
import SamplerFilterSelect from "../components/SamplerFilterSelect.tsx";
import {useSamplerStore} from "../store/SamplerStore.ts";

/**
 * The properties of a texture.
 * @constructor
 */
export function PropertiesView() {


    const setMagFilter = useSamplerStore(store => store.setMagFilter);
    const setMinFilter = useSamplerStore(store => store.setMinFilter);

    const magFilter = useSamplerStore(store => store.magFilter);
    const minFilter = useSamplerStore(store => store.minFilter);

    return (
        <Container>
            <Stack direction="column">
                <SamplerFilterSelect label={"Mag Filter"} value={magFilter} onValueChange={setMagFilter} topMost={true}/>
                <Divider />
                <SamplerFilterSelect label={"Min Filter"} value={minFilter} onValueChange={setMinFilter} bottomMost={true}/>
            </Stack>
        </Container>
    );
}