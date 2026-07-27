import {Box, createTheme, Grid, Paper, Stack, Tab, Tabs, ThemeProvider} from "@mui/material";
import './App.css'
import {useEffect, useRef, useState} from "react";
import {Framework} from "ris-game-framework/src/gameframework/framework.ts";
import DropArea from "./components/DropArea.tsx";
import {Ktx2Loader} from "../../ris-ktx2/src";
import Ktx2TextureList from "./components/Ktx2TextureList.tsx";
import PropertiesView from "./views/PropertiesView.tsx";
import AddFileButton from "./components/AddFileButton.tsx";


function App() {

    const theme = createTheme({cssVariables: true, palette: {mode: 'dark'}});

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const state = useState(() => {
        const framework = new Framework();
        framework.initialize();

        const quadGeometry = framework.geometryBuilder.quadGeometry();
        console.dir(quadGeometry);

        // TODO: create mesh

        const ktxLoader = new Ktx2Loader();
        ktxLoader.initializeAsync();

        return {framework, ktxLoader}
    });

    const {framework, ktxLoader} = state[0];


    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext("webgl2");

        if (!gl) {
            console.error("WebGL2 not supported");
            return;
        }

        gl.clearColor(0.1, 0.1, 0.1, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

    }, []);

    const [tab, setTab] = useState(0);

    const properties = [
        {
            name: "Width",
            value: "1024"
        },
        {
            name: "Height",
            value: "1024"
        },
        {
            name: "Mipmaps",
            value: "1"
        },
        {
            name: "Format",
            value: "RGBA8"
        }
    ];

    const gpuProperties = [
        {
            name: "GPU Vendor",
            value: framework.graphicsDevice.vendor,
        },
        {
            name: "GPU",
            value: framework.graphicsDevice.name
        }
    ]

    const gpuFeatures = [
        {
            name: "S3TC Texture Compression (BC1-BC3)",
            value: framework.graphicsDevice.features.supportsTextureCompressionS3TC ? "Supported" : "Not Supported"
        },
        {
            name: "BPTC Texture Compression (BC6-BC7)",
            value: framework.graphicsDevice.features.supportsTextureCompressionBC ? "Supported" : "Not Supported"
        },
        {
            name: "ETC2 Texture Compression",
            value: framework.graphicsDevice.features.supportsTextureCompressionETC2 ? "Supported" : "Not Supported"
        },
        {
            name: "ASTC Texture Compression",
            value: framework.graphicsDevice.features.supportsTextureCompressionASTC ? "Supported" : "Not Supported"
        },
        {
            name: "PVRTC Texture Compression",
            value: framework.graphicsDevice.features.supportsTextureCompressionPVRTC ? "Supported" : "Not Supported"
        }
    ]

    return (
        <ThemeProvider theme={theme}>
            <div className="app">

                <Stack direction="column" spacing={2}>

                    <DropArea ktxLoader={ktxLoader}/>

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
                                        <Stack direction={"column"} spacing={2} sx={{marginLeft: 2}}>
                                            <AddFileButton ktxLoader={ktxLoader} />
                                             <Ktx2TextureList/>
                                        </Stack>
                                    )}

                                    {tab === 1 && (
                                        <PropertiesView properties={properties}/>

                                    )}

                                    {tab === 2 && (
                                        <Stack direction={"column"} spacing={2}>
                                            <PropertiesView properties={gpuProperties}/>
                                            <PropertiesView properties={gpuFeatures}/>
                                        </Stack>

                                    )}
                                </Box>


                            </Grid>
                            <Grid size={6}>
                                <canvas
                                    ref={canvasRef}
                                    width={800}
                                    height={600}
                                />
                            </Grid>
                            <Grid size={3}>

                            </Grid>
                        </Grid>
                    </Paper>
                </Stack>
            </div>
        </ThemeProvider>
    )
}

export default App