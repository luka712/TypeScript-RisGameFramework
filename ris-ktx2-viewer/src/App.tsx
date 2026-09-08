import {Box, createTheme, Grid, Paper, Stack, Tab, Tabs, ThemeProvider} from "@mui/material";
import './App.css'
import {useEffect, useMemo, useRef, useState} from "react";
import DropArea from "./components/DropArea.tsx";
import TextureList from "./components/TextureList.tsx";
import GenericPropertiesView from "./views/GenericPropertiesView.tsx";
import AddFileButton from "./components/AddFileButton.tsx";
import {
    Color,
    CullMode,
    type IFramework,
    type IMesh,
    InspectTextureMipsMaterial,
    OrbitCamera,
    PrimitiveStateDescriptor,
    Rect,
    UnlitMaterial, UnlitMaterialDescriptor
} from "ris-framework-api";
import {Framework} from "ris-framework";
import {useAppStore} from "./store/AppStore.ts";
import {mat4, vec2, vec3} from "gl-matrix";
import {PropertiesView} from "./views/PropertiesView.tsx";
import {useSamplerStore} from "./store/SamplerStore.ts";
import {useTextureStore} from "./store/TextureStore.ts";
import {FooterView} from "./views/FooterView.tsx";
import {TextureSamplerFilteringPreset} from "../../ris-framework/src/core/rendering/enums.ts";
import {View2D, View3D} from "./model/View.ts";
import {UnlitMaterialConfig} from "../../ris-framework-api/dist/ris-framework/material/UnlitMaterialConfig";


const imageRect = new Rect(0, 0, 0, 0);
const whiteColor = Color.white();

function App() {
    const theme = useMemo(
        () => createTheme({cssVariables: true, palette: {mode: "dark"}}),
        [],
    );

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const frameworkRef = useRef<IFramework | null>(null);
    const mipMaterialRef = useRef<InspectTextureMipsMaterial | null>(null);
    const unlitMaterialRef = useRef<UnlitMaterial | null>(null);
    const quadMeshRef = useRef<IMesh | null>(null);
    const camera3DRef = useRef<OrbitCamera | null>(null);

    const setFrameworkAppStore = useAppStore((state) => state.setFramework);
    const setFrameworkSamplerStore = useSamplerStore((state) => state.setFramework);
    const setFrameworkTextureStore = useTextureStore((state) => state.setFramework);
    const subscribeTextureSelected = useTextureStore((state) => state.subscribeTextureSelected);
    const getSelectedTexture = useTextureStore((state) => state.getSelectedTexture);
    const getSampler = useSamplerStore((state) => state.getSampler);
    const getMipLevel = useTextureStore((state) => state.getMipLevel);
    const getView = useAppStore((state) => state.getView);

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

            camera3DRef.current = fw.cameraFactory.createOrbitCamera()
            camera3DRef.current.eye = vec3.fromValues(0, 0, -2);
            camera3DRef.current.sensitivity = 0.5;
            camera3DRef.current.scrollSpeed = 5;

            const geometry = fw.geometryBuilder.quadGeometry(vec2.fromValues(2, 2));
            const mipMaterial = fw.materialFactory.createInspectTextureMipsMaterial();

            const primitiveStateDesc = new PrimitiveStateDescriptor();
            primitiveStateDesc.cullFace = CullMode.NONE;
            const unlitMaterialDesc = new UnlitMaterialDescriptor();
            unlitMaterialDesc.primitiveState = fw.graphicsDevice.createPrimitiveState(primitiveStateDesc);
            unlitMaterialDesc.projectionViewBuffer = camera3DRef.current.projectionViewBuffer;
            const unlitMaterial = fw.materialFactory.createUnlitMaterial(unlitMaterialDesc);
            const mesh = fw.meshFactory.create(geometry, mipMaterial.geometryFormat);

            mipMaterialRef.current = mipMaterial;
            unlitMaterialRef.current = unlitMaterial;
            quadMeshRef.current = mesh;
        });

        fw.addOnUpdateListener(gt => {
            camera3DRef.current?.update(gt);
        });

        fw.addOnRenderListener(() => {


            const selectedTexture = getSelectedTexture();
            const sampler = getSampler();
            const mipLevel = getMipLevel();

            if (selectedTexture?.texture) {

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
                    const mipMaterial = mipMaterialRef.current;
                    if (mipMaterial) {
                        mipMaterial.modelMatrix = modelMatrix;
                    }
                    const unlitMaterial = unlitMaterialRef.current;
                    if (unlitMaterial) {
                        unlitMaterial.modelMatrix = modelMatrix;
                    }
                }


                if (getView() == View2D) {
                    const mipMaterial = mipMaterialRef.current;

                    if (mipMaterial) {
                        mipMaterial.texture = tex;
                        mipMaterial.textureSampler = sampler;
                        mipMaterial.mipLevel = mipLevel;

                        const mesh = quadMeshRef.current!;
                        mipMaterial.beforeRender();
                        mipMaterial.renderMesh(mesh);
                    }
                } else if (getView() == View3D) {

                    const unlitMaterial = unlitMaterialRef.current;

                    if (unlitMaterial) {
                        unlitMaterial.diffuseTexture = tex;
                        unlitMaterial.diffuseTextureSampler = sampler;

                        const mesh = quadMeshRef.current!;
                        unlitMaterial.beforeRender();
                        unlitMaterial.renderMesh(mesh);
                    }
                }


            }
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
                                        <Stack direction="column" spacing={2} sx={{marginLeft: 2 }}>
                                            {framework ? (
                                                <>
                                                    <GenericPropertiesView properties={gpuProperties} />
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
                                <Box sx={{paddingTop: 2, paddingBottom: 2, marginRight: 2, marginTop: 2}}>
                                    <PropertiesView/>
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid size={12} sx={{paddingTop: 2, paddingBottom: 2, paddingLeft: 1, paddingRight: 1}}>
                            <FooterView/>
                        </Grid>
                    </Paper>
                </Stack>
            </div>
        </ThemeProvider>
    );
}

export default App;
