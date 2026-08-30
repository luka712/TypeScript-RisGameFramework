import {Container, Divider, Paper, Stack, Typography} from "@mui/material";
import SamplerFilterSelect from "../components/SamplerFilterSelect.tsx";
import {useSamplerStore} from "../store/SamplerStore.ts";
import TextureFormatSelect from "../components/TextureFormatSelect.tsx";
import {useTextureStore} from "../store/TextureStore.ts";
import {GenerateMipmapsSelect} from "../components/GenerateMipmapsSelect.tsx";

/**
 * The properties of a texture.
 * @constructor
 */
export function FooterView() {

    const resolution = useTextureStore(store => store.resolution);
    const mipLevels = useTextureStore(store => store.mipLevels);
    const memory = useTextureStore(store => store.size);

    return (
        <Paper
            elevation={3}
            sx={{
                borderRadius: 10,
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 2,
                paddingBottom: 2,
                justifyContent: "flex-start",
            }}>
                <Stack
                    direction="row"
                    spacing={2.5}
                    sx={{
                        justifyContent: "flex-end",
                    }}
                >
                    <Stack spacing={0.25} sx={{alignItems: "center"}}>
                        <Typography
                            variant="caption"
                            sx={{
                                opacity: 0.6,
                                fontSize: 11,
                                lineHeight: 1.2,
                            }}
                        >
                            Resolution
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: 13,
                                lineHeight: 1.2,
                            }}
                        >
                            {resolution}
                        </Typography>
                    </Stack>

                    <Stack spacing={0.25} alignItems="flex-end">
                        <Typography
                            variant="caption"
                            sx={{
                                opacity: 0.6,
                                fontSize: 11,
                                lineHeight: 1.2,
                            }}
                        >
                            Mip Levels
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: 13,
                                lineHeight: 1.2,
                            }}
                        >
                            {mipLevels}
                        </Typography>
                    </Stack>

                    <Stack spacing={0.25} alignItems="flex-end">
                        <Typography
                            variant="caption"
                            sx={{
                                opacity: 0.6,
                                fontSize: 11,
                                lineHeight: 1.2,
                            }}
                        >
                            Memory
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: 13,
                                lineHeight: 1.2,
                            }}
                        >
                            {memory}
                        </Typography>
                    </Stack>

                </Stack>
        </Paper>
    );
}