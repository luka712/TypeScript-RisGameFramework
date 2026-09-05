import {Box, createTheme, Grid, Paper, Stack, Tab, Tabs, ThemeProvider} from "@mui/material";
import './App.css'
import {useEffect, useMemo, useRef, useState} from "react";
import DropArea from "./components/DropArea.tsx";
import TextureList from "./components/TextureList.tsx";
import GenericPropertiesView from "./views/GenericPropertiesView.tsx";
import AddFileButton from "./components/AddFileButton.tsx";
import {
    BufferUsage,
    Color,
    type IFramework,
    type IInspectTextureMipsRenderPipeline,
    type IUniformBuffer,
    type IMesh,
    Rect, InspectTextureMipsMaterial
} from "ris-framework-api";
import {Framework} from "ris-framework";
import {useAppStore} from "./store/AppStore.ts";
import {vec2} from "gl-matrix";
import {PropertiesView} from "./views/PropertiesView.tsx";
import {useSamplerStore} from "./store/SamplerStore.ts";
import {useTextureStore} from "./store/TextureStore.ts";
import {FooterView} from "./views/FooterView.tsx";
import {TextureSamplerFilteringPreset} from "../../ris-framework/src/core/rendering/enums.ts";
import {mat4, vec3} from "gl-matrix";


const imageRect = new Rect(0, 0, 0, 0);
const whiteColor = Color.white();

function App() {
    const theme = useMemo(
        () => createTheme({cssVariables: true, palette: {mode: "dark"}}),
        [],
    );

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const frameworkRef = useRef<IFramework | null>(null);
    const materialBufferRef = useRef<InspectTextureMipsMaterial | null>(null);
    const quadMeshRef = useRef<IMesh | null>(null);

    const setFrameworkAppStore = useAppStore((state) => state.setFramework);
    const setFrameworkSamplerStore = useSamplerStore((state) => state.setFramework);
    const setFrameworkTextureStore = useTextureStore((state) => state.setFramework);
    const subscribeTextureSelected = useTextureStore((state) => state.subscribeTextureSelected);
    const getSelectedTexture = useTextureStore((state) => state.getSelectedTexture);
    const getSampler = useSamplerStore((state) => state.getSampler);
    const getMipLevel = useTextureStore((state) => state.getMipLevel);

    const [framework, setFramework] = useState<IFramework | null>(null);
    const [tab, setTab] = useState(0);

    useEffect(() => {
        return subscribeTextureSelected((tex) => {
            const texture = tex?.texture;
            if (!texture) {
                return;
            }

            const canvas = canvasRef.current;
            if (canvas) {
                canvas.width = texture.width;
                canvas.height = texture.height;
            }

            const fw = frameworkRef.current;
            if (fw) {
                fw.renderer.backBufferSize = vec2.fromValues(texture.width, texture.height);
            }
        });
    }, [subscribeTextureSelected]);

    const modelMatrix = mat4.create();
    let previousTexWidth = 0;
    let previousTexHeight = 0;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || frameworkRef.current) {
            return;
        }

        const fw: IFramework = new Framework({
            canvas,
            backBufferSize: vec2.fromValues(1920, 1080),
            textureFiltering: TextureSamplerFilteringPreset.TRILINEAR
        });
        fw.renderer.clearColor = Color.gray();

        fw.addOnInitializedListener(() => {

            const geometry = fw.geometryBuilder.quadGeometry(vec2.fromValues(2, 2));
            const material = fw.materialFactory.createInspectTextureMipsMaterial();
            const mesh = fw.meshFactory.create(geometry, material.geometryFormat);


            materialBufferRef.current = material;
            quadMeshRef.current = mesh;
        });

        fw.addOnRenderListener(() => {
            const spriteBatch = fw.spriteBatch;
            const selectedTexture = getSelectedTexture();
            const sampler = getSampler();
            const mipLevel = getMipLevel();

            spriteBatch.begin(undefined, sampler);

            if (selectedTexture?.texture) {
                // imageRect.width = selectedTexture.texture.width;
                // imageRect.height = selectedTexture.texture.height;
                // spriteBatch.draw(selectedTexture.texture, imageRect, whiteColor);

                const tex = selectedTexture.texture;

                // Clamp to edge
                const width = tex.width;
                const height = tex.height;

                if (previousTexWidth != width || previousTexHeight != height) {
                    const aspectRatio = width / height;
                    let widthScale = 1.0;
                    let heightScale = 1.0;

                    if (aspectRatio > 1) {
                        heightScale /= aspectRatio;
                    } else {
                        widthScale *= aspectRatio;
                    }

                    previousTexWidth = width;
                    previousTexHeight = height;

                    mat4.scale(modelMatrix, modelMatrix, vec3.fromValues(widthScale, heightScale, 1));
                    const mat = materialBufferRef.current;
                    if (mat) {
                        mat.modelMatrix = modelMatrix;
                    }
                }

                const mat = materialBufferRef.current;

                if(!mat){
                    return;
                }

                mat.texture = tex;
                mat.textureSampler = sampler;
                mat.mipLevel = mipLevel;

                const mesh = quadMeshRef.current!;
                mat.beforeRender();
                mat.renderMesh(mesh);
            }

            spriteBatch.end();
        });
        fw.initialize();

        frameworkRef.current = fw;
        setFramework(fw);
        setFrameworkAppStore(fw);
        setFrameworkSamplerStore(fw);
        setFrameworkTextureStore(fw);
    }, [
        getSampler,
        getSelectedTexture,
        setFrameworkAppStore,
        setFrameworkSamplerStore,
        setFrameworkTextureStore,
    ]);

    const gpuProperties = useMemo(
        () =>
            framework
                ? [
                    {name: "GPU Vendor", value: framework.renderer.graphicsDevice.gpuInfo.vendor},
                    {name: "GPU", value: framework.renderer.graphicsDevice.gpuInfo.name},
                ]
                : [],
        [framework],
    );

    const gpuFeatures = useMemo(() => {
        if (!framework) {
            return [];
        }

        const features = framework.renderer.graphicsDevice.features;
        const supported = (value: boolean) => (value ? "Supported" : "Not Supported");

        return [
            {name: "S3TC Texture Compression (BC1-BC3)", value: supported(features.supportsTextureCompressionS3TC)},
            {name: "BPTC Texture Compression (BC6-BC7)", value: supported(features.supportsTextureCompressionBC)},
            {name: "ETC2 Texture Compression", value: supported(features.supportsTextureCompressionETC2)},
            {name: "ASTC Texture Compression", value: supported(features.supportsTextureCompressionASTC)},
            {name: "PVRTC Texture Compression", value: supported(features.supportsTextureCompressionPVRTC)},
        ];
    }, [framework]);

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
                                        onChange={(_event, newValue: number) => setTab(newValue)}
                                    >
                                        <Tab label="Files"/>
                                        <Tab label="GPU Info"/>
                                    </Tabs>

                                    {tab === 0 && (
                                        <Stack direction="column" spacing={2} sx={{marginLeft: 2}}>
                                            <AddFileButton/>
                                            <TextureList/>
                                        </Stack>
                                    )}
                                    {tab === 1 && (
                                        <Stack direction="column" spacing={2}>
                                            {framework ? (
                                                <>
                                                    <GenericPropertiesView properties={gpuProperties}/>
                                                    <GenericPropertiesView properties={gpuFeatures}/>
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
                                    <canvas ref={canvasRef} width={1920} height={1080}/>
                                </Box>
                            </Grid>
                            <Grid size={3}>
                                <Box sx={{paddingTop: 2, paddingBottom: 2}}>
                                    <PropertiesView/>
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid size={12}>
                            <FooterView/>
                        </Grid>
                    </Paper>
                </Stack>
            </div>
        </ThemeProvider>
    );
}

export default App;
