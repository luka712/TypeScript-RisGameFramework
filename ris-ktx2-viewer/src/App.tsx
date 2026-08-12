import {Box, createTheme, Grid, Paper, Stack, Tab, Tabs, ThemeProvider} from "@mui/material";
import './App.css'
import { useEffect, useRef, useState} from "react";
import DropArea from "./components/DropArea.tsx";
import TextureList from "./components/TextureList.tsx";
import PropertiesView from "./views/PropertiesView.tsx";
import AddFileButton from "./components/AddFileButton.tsx";
import {Color, type IFramework, Rect} from "ris-framework-api";
import {Framework} from "../../ris-framework/src/core/Framework.ts";
import {useAppStore} from "./store/AppStore.ts";
import {vec2} from "gl-matrix";
import SelectedTexturePropertiesView from "./views/SelectedTexturePropertiesView.tsx";

const imageRect = new Rect(0,0,0,0);

const whiteColor = Color.white();

function App() {
    const theme = createTheme({cssVariables: true, palette: {mode: 'dark'}});

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const frameworkRef = useRef<IFramework | null>(null);

    const setFrameworkAppStore = useAppStore(state => state.setFramework);

    const getSelectedTexture = useAppStore(state => state.getSelectedTexture);

    const [framework, setFramework] = useState<IFramework | null>(null);

    const [tab, setTab] = useState(0);

    const onTextureSelected = useAppStore(state => state.onTextureSelected);
    onTextureSelected(tex => {

        const texture = tex.texture;
        if(texture) {

            const canvas = canvasRef.current;
            if(canvas) {
                canvas.width = texture.width;
                canvas.height = texture.height;
            }

            const fw = frameworkRef.current;
            if(fw){
                fw.renderer.backBufferSize = vec2.fromValues(texture.width, texture.height);
            }
        }

    });

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }

        const canvas = canvasRef.current;
        const fw = frameworkRef.current;

        if (canvas) {

            const observer = new ResizeObserver(entries => {
                const rect = entries[0].contentRect;
               // frameworkSize[0] = rect.width * 2;
                //frameworkSize[1] = rect.height * 2;

                if(fw) {
                    // fw.renderer.backBufferSize = frameworkSize;
                }
            });

            observer.observe(canvas);
        }

        if (!fw) {
            const fw: IFramework = new Framework({
                canvas: canvasRef.current,
                backBufferSize: vec2.fromValues(1920,1080),
            });
            fw.renderer.clearColor = Color.gray();
            fw.addOnRenderListener(() => {
                const spriteBatch = fw!.spriteBatch;
                const selectedTexture = getSelectedTexture();

                spriteBatch.begin();

                if (selectedTexture && selectedTexture.texture) {

                    imageRect.width = selectedTexture.texture.width;
                    imageRect.height = selectedTexture.texture.height;

                    spriteBatch.draw(selectedTexture.texture, imageRect, whiteColor);
                }
                // spriteBatch.drawRect(imageRect, whiteColor);
                spriteBatch.end();
            });
            fw.initialize();

            frameworkRef.current = fw;
            setFramework(fw);
            setFrameworkAppStore(fw);
        }

        // optional cleanup if Framework has a dispose method
        // return () => fw.dispose?.();
    }, []);

    const properties = [
        {name: "Width", value: "1024"},
        {name: "Height", value: "1024"},
        {name: "Mipmaps", value: "1"},
        {name: "Format", value: "RGBA8"},
    ];

    // Guard against null framework
    const gpuProperties = framework
        ? [
            {name: "GPU Vendor", value: framework.renderer.graphicsDevice.gpuInfo.vendor},
            {name: "GPU", value: framework.renderer.graphicsDevice.gpuInfo.name},
        ]
        : [];

    const gpuFeatures = framework
        ? [
            {
                name: "S3TC Texture Compression (BC1-BC3)",
                value: framework.renderer.graphicsDevice.features.supportsTextureCompressionS3TC
                    ? "Supported"
                    : "Not Supported",
            },
            {
                name: "BPTC Texture Compression (BC6-BC7)",
                value: framework.renderer.graphicsDevice.features.supportsTextureCompressionBC
                    ? "Supported"
                    : "Not Supported",
            },
            {
                name: "ETC2 Texture Compression",
                value: framework.renderer.graphicsDevice.features.supportsTextureCompressionETC2
                    ? "Supported"
                    : "Not Supported",
            },
            {
                name: "ASTC Texture Compression",
                value: framework.renderer.graphicsDevice.features.supportsTextureCompressionASTC
                    ? "Supported"
                    : "Not Supported",
            },
            {
                name: "PVRTC Texture Compression",
                value: framework.renderer.graphicsDevice.features.supportsTextureCompressionPVRTC
                    ? "Supported"
                    : "Not Supported",
            },
        ]
        : [];

    return (
        <ThemeProvider theme={theme}>
            <div className="app">
                <Stack direction="column" spacing={2}>
                    <DropArea/>
                    <Paper>
                        <Grid container spacing={2}>

                            <Grid size={3}>
                                <Box>
                                    <Tabs
                                        value={tab}
                                        sx={{paddingTop: 2, paddingBottom: 2}}
                                        onChange={(_event, newValue) => setTab(newValue)}
                                    >
                                        <Tab label="Files"/>
                                        <Tab label="Properties"/>
                                        <Tab label="GPU Info"/>
                                    </Tabs>

                                    {tab === 0 && (
                                        <Stack direction="column" spacing={2} sx={{marginLeft: 2}}>
                                            <AddFileButton/>
                                            <TextureList/>
                                        </Stack>
                                    )}
                                    {tab === 1 && <PropertiesView properties={properties}/>}
                                    {tab === 2 && (
                                        <Stack direction="column" spacing={2}>
                                            {framework ? (
                                                <>
                                                    <PropertiesView properties={gpuProperties}/>
                                                    <PropertiesView properties={gpuFeatures}/>
                                                </>
                                            ) : (
                                                <Box sx={{p: 2}}>Initializing GPU…</Box>
                                            )}
                                        </Stack>
                                    )}
                                </Box>
                            </Grid>

                            <Grid size={6}>
                                <Box>
                                    <canvas ref={canvasRef} width={1920} height={1080} />
                                </Box>
                            </Grid>

                            <Grid size={3}>
                                <Box sx={{paddingTop: 2, paddingBottom: 2}}>
                                    <SelectedTexturePropertiesView />
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </Stack>
            </div>
        </ThemeProvider>
    );
}

export default App;
