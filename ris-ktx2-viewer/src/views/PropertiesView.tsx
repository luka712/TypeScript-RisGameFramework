import {Divider, Paper, Stack} from "@mui/material";
import SamplerFilterField from "../components/SamplerFilterField.tsx";
import {useSamplerStore} from "../store/SamplerStore.ts";
import TextureFormatField from "../components/TextureFormatField.tsx";
import {useTextureStore} from "../store/TextureStore.ts";
import {CheckboxField} from "../components/CheckboxField.tsx";
import MipLevelSelect from "../components/MipLevelSelect.tsx";
import {View2D, View3D} from "../model/View.ts";
import {useAppStore} from "../store/AppStore.ts";
import * as React from "react";
import SelectField from "../components/SelectField.tsx";

/**
 * Editable sampler / texture properties for the selected texture.
 */
export function PropertiesView() {
    const [mipLevelState, setMipLevelState] = React.useState<number>(useTextureStore(store => store.mipLevel));

    const setFilter = useSamplerStore((store) => store.setFilter);
    const setTextureFormat = useTextureStore((store) => store.setTextureFormat);
    const setGenerateMipmaps = useTextureStore((store) => store.setGenerateMipmaps);
    const setMipmapLevel = useTextureStore(store => store.setMipmapLevel);

    const filter = useSamplerStore((store) => store.filter);
    const textureFormat = useTextureStore((store) => store.textureFormat);
    const generateMipmaps = useTextureStore((store) => store.generateMipmaps);
    const canGenerateMips = useTextureStore((store) => store.canGenerateMipmaps);
    const mipmapLevels = useTextureStore(store => store.mipLevels);

    const viewOptions = [View2D, View3D];
    const view = useAppStore(store => store.view);
    const setView = useAppStore((store) => store.setView);

    const handleMipmapLevelChange = (value: number) => {
        setMipmapLevel(value);
        setMipLevelState(value);
    }


    return (
        <Paper elevation={3}
               sx={{
                   borderTopLeftRadius: 20,
                   borderTopRightRadius: 20,
                   borderBottomLeftRadius: 20,
                   borderBottomRightRadius: 20,
               }}>
            <Stack direction="column">

                <SelectField labelTooltip="Switches between flat 2D inspection and an orbit-camera 3D preview."
                                   label="View" value={view} options={viewOptions} onValueChange={setView}/>
                <Divider/>
                <SamplerFilterField
                    label="Filter"
                    value={filter}
                    onValueChange={setFilter}
                />
                <Divider/>
                <TextureFormatField
                    label="Texture Format"
                    value={textureFormat}
                    onValueChange={setTextureFormat}
                />
                {canGenerateMips() && (
                    <>
                        <Divider/>
                        <CheckboxField
                            label="Generate Mipmaps"
                            value={generateMipmaps}
                            onValueChange={setGenerateMipmaps}
                            tooltip="Generates smaller versions of the texture for use when the texture is displayed at reduced sizes. Mipmaps can improve visual quality and reduce texture sampling artifacts."
                        />
                    </>
                )}
                {view == viewOptions[0] && mipmapLevels > 1 && (
                    <>
                        <Divider/>
                        <MipLevelSelect label="Mipmap Level" value={mipLevelState} valueMax={mipmapLevels}
                                        onValueChange={handleMipmapLevelChange}/>
                    </>
                )}
            </Stack>
        </Paper>
    );
}
