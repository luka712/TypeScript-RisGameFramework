import { Box, createTheme, Grid, Paper, Stack, Tab, Tabs, ThemeProvider } from "@mui/material";
import './App.css'
import { useEffect, useRef, useState } from "react";
import DropArea from "./components/DropArea.tsx";
import { Ktx2Loader } from "../../ris-ktx2/src";
import Ktx2TextureList from "./components/Ktx2TextureList.tsx";
import PropertiesView from "./views/PropertiesView.tsx";
import AddFileButton from "./components/AddFileButton.tsx";
import { Framework } from "../../ris-framework/src/gameframework/framework.ts";
import type { IFramework } from "ris-framework-api";

function App() {
    const theme = createTheme({ cssVariables: true, palette: { mode: 'dark' } });

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const frameworkRef = useRef<IFramework | null>(null);

    const [framework, setFramework] = useState<IFramework | null>(null);
    const [ktxLoader] = useState(() => {
        const loader = new Ktx2Loader();
        // fire-and-forget is fine if the loader is ready by the time files are dropped
        loader.initializeAsync();
        return loader;
    });

    const [tab, setTab] = useState(0);

    useEffect(() => {
        if (!canvasRef.current) return;

        const fw = frameworkRef.current;

        if(!fw) {
            debugger;
            // @ts-ignore
            const fw: IFramework = new Framework({canvas: canvasRef.current});
            fw.initialize();

            frameworkRef.current = fw;
            setFramework(fw);

            const quadGeometry = fw.geometryBuilder.quadGeometry();
            console.dir(quadGeometry);
        }
        // optional cleanup if Framework has a dispose method
        // return () => fw.dispose?.();
    }, []);

    const properties = [
        { name: "Width", value: "1024" },
        { name: "Height", value: "1024" },
        { name: "Mipmaps", value: "1" },
        { name: "Format", value: "RGBA8" },
    ];

    // Guard against null framework
    const gpuProperties = framework
        ? [
            { name: "GPU Vendor", value: framework.renderer.graphicsDevice.vendor },
            { name: "GPU", value: framework.renderer.graphicsDevice.name },
        ]
        : [];

    const gpuFeatures = framework
        ? [
            {
                name: "S3TC Texture Compression (BC1-BC3)",
                value: framework.graphicsDevice.features.supportsTextureCompressionS3TC
                    ? "Supported"
                    : "Not Supported",
            },
            {
                name: "BPTC Texture Compression (BC6-BC7)",
                value: framework.graphicsDevice.features.supportsTextureCompressionBC
                    ? "Supported"
                    : "Not Supported",
            },
            {
                name: "ETC2 Texture Compression",
                value: framework.graphicsDevice.features.supportsTextureCompressionETC2
                    ? "Supported"
                    : "Not Supported",
            },
            {
                name: "ASTC Texture Compression",
                value: framework.graphicsDevice.features.supportsTextureCompressionASTC
                    ? "Supported"
                    : "Not Supported",
            },
            {
                name: "PVRTC Texture Compression",
                value: framework.graphicsDevice.features.supportsTextureCompressionPVRTC
                    ? "Supported"
                    : "Not Supported",
            },
        ]
        : [];

    return (
        <ThemeProvider theme={theme}>
            <div className="app">
                <Stack direction="column" spacing={2}>
                    <DropArea ktxLoader={ktxLoader} />
                    <Paper>
                        <Grid container spacing={2}>
                            <Grid size={3}>
                                <Box>
                                    <Tabs
                                        value={tab}
                                        sx={{ paddingTop: 2, paddingBottom: 2 }}
                                        onChange={(_event, newValue) => setTab(newValue)}
                                    >
                                        <Tab label="Files" />
                                        <Tab label="Properties" />
                                        <Tab label="GPU Info" />
                                    </Tabs>

                                    {tab === 0 && (
                                        <Stack direction="column" spacing={2} sx={{ marginLeft: 2 }}>
                                            <AddFileButton ktxLoader={ktxLoader} />
                                            <Ktx2TextureList />
                                        </Stack>
                                    )}
                                    {tab === 1 && <PropertiesView properties={properties} />}
                                    {tab === 2 && (
                                        <Stack direction="column" spacing={2}>
                                            {framework ? (
                                                <>
                                                    <PropertiesView properties={gpuProperties} />
                                                    <PropertiesView properties={gpuFeatures} />
                                                </>
                                            ) : (
                                                <Box sx={{ p: 2 }}>Initializing GPU…</Box>
                                            )}
                                        </Stack>
                                    )}
                                </Box>
                            </Grid>

                            <Grid size={6}>
                                <canvas ref={canvasRef} width={800} height={600} />
                            </Grid>

                            <Grid size={3} />
                        </Grid>
                    </Paper>
                </Stack>
            </div>
        </ThemeProvider>
    );
}

export default App;
