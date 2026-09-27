import {Box, createTheme, Grid, Paper, Stack, Tab, Tabs, ThemeProvider} from "@mui/material";
import './App.css'
import {useEffect, useMemo, useRef, useState} from "react";
import {
    Color,
    CullMode,
    type IFramework,
    type IMesh,
    InspectTextureMipsMaterial,
    OrbitCamera,
    PrimitiveStateDescriptor,
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
import {useConvertStore} from "./store/ConvertStore.ts";
import {AboutView} from "./views/AboutView.tsx";
import {GpuPropertiesView} from "./views/GpuPropertiesView.tsx";
import {TexturesListView} from "./views/TexturesListView.tsx";


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
    const modelMatrixRef = useRef(mat4.create());
    const previousTexSizeRef = useRef({width: 0, height: 0});

    const setFrameworkAppStore = useAppStore((state) => state.setFramework);
    const setFrameworkSamplerStore = useSamplerStore((state) => state.setFramework);
    const setFrameworkTextureStore = useTextureStore((state) => state.setFramework);
    const setFrameworkConvertStore = useConvertStore((state) => state.setFramework);
    const subscribeTextureSelected = useTextureStore((state) => state.subscribeTextureSelected);
    const getSelectedTexture = useTextureStore((state) => state.getSelectedTexture);
    const getSampler = useSamplerStore((state) => state.getSampler);
    const getView = useAppStore((state) => state.getView);
    const getSelectedMipLevel = useTextureStore((state) => state.getMipLevel);

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

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || frameworkRef.current) {
            return;
        }

        const fw: IFramework = new Framework({
            canvas,
            useKtx2: true,
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

            if (selectedTexture?.texture) {

                const tex = selectedTexture.texture;

                // Clamp to edge
                const width = tex.width;
                const height = tex.height;
                const previous = previousTexSizeRef.current;

                if (previous.width != width || previous.height != height) {
                    const aspectRatio = width / height;
                    let widthScale = 1.0;
                    let heightScale = 1.0;

                    if (aspectRatio > 1) {
                        heightScale /= aspectRatio;
                    } else {
                        widthScale *= aspectRatio;
                    }

                    canvasRef.current!.style.aspectRatio = aspectRatio.toString();

                    previous.width = width;
                    previous.height = height;

                    // Reset scale each time (do not accumulate).
                    mat4.fromScaling(modelMatrixRef.current, vec3.fromValues(widthScale, heightScale, 1));
                    const mipMaterial = mipMaterialRef.current;
                    if (mipMaterial) {
                        mipMaterial.modelMatrix = modelMatrixRef.current;
                    }
                    const unlitMaterial = unlitMaterialRef.current;
                    if (unlitMaterial) {
                        unlitMaterial.modelMatrix = modelMatrixRef.current;
                    }
                }


                if (getView() == View2D) {
                    const mipMaterial = mipMaterialRef.current;

                    if (mipMaterial) {
                        mipMaterial.texture = tex;
                        mipMaterial.textureSampler = sampler;
                        mipMaterial.mipLevel = getSelectedMipLevel();

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
        setFrameworkConvertStore(fw);

        return () => {
            // Framework has no dispose API; dispose owned GPU objects we created.
            mipMaterialRef.current?.dispose();
            unlitMaterialRef.current?.dispose();
            quadMeshRef.current?.dispose();
            frameworkRef.current?.dispose();
            mipMaterialRef.current = null;
            unlitMaterialRef.current = null;
            quadMeshRef.current = null;
            camera3DRef.current = null;
            frameworkRef.current = null;
        };
    }, [
        getSampler,
        getSelectedTexture,
        setFrameworkAppStore,
        setFrameworkSamplerStore,
        setFrameworkTextureStore,
        setFrameworkConvertStore,
    ]);


    return (
        <ThemeProvider theme={theme}>
            <div className="app" style={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}>
                <Paper
                    sx={{
                        flex: 1,
                        minHeight: 0,
                        overflowY: {xs: 'auto', md: 'hidden'},
                        overflowX: 'hidden',
                    }}
                >
                    <Box sx={{
                        overflowY: 'auto',
                        height: '100%',
                    }}>
                        <Stack direction="column">
                            <Grid
                                container
                                spacing={2}
                                sx={{
                                    height: {xs: 'auto', md: '100%'},
                                    minHeight: {md: '100%'},
                                }}
                            >
                                <Grid size={{xs: 12, sm: 12, md: 3}}>
                                    <Box>
                                        <Tabs
                                            value={tab}
                                            sx={{paddingTop: 2, paddingBottom: 2}}
                                            onChange={(_event, newValue: number) => setTab(newValue)}
                                            variant="scrollable"
                                            allowScrollButtonsMobile
                                        >
                                            <Tab label="Files"/>
                                            <Tab label="GPU Info"/>
                                            <Tab label="About"/>
                                        </Tabs>

                                        {tab === 0 && (
                                            <TexturesListView/>
                                        )}
                                        {tab === 1 && (
                                            <GpuPropertiesView/>
                                        )}
                                        {tab === 2 && (
                                            <AboutView/>
                                        )}
                                    </Box>
                                </Grid>
                                <Grid size={{xs: 12, sm: 12, md: 6}}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <canvas
                                            ref={canvasRef}
                                            width={1920}
                                            height={1080}
                                            style={{
                                                maxWidth: '92%',
                                                maxHeight: '92%'
                                            }}
                                        />
                                    </Box>
                                </Grid>
                                <Grid size={{xs: 12, sm: 12, md: 3}}>
                                    <Box
                                        sx={{
                                            paddingTop: 2,
                                            paddingBottom: 2,
                                            marginRight: 2,
                                            marginLeft: 2,
                                            marginTop: 2
                                        }}>
                                        <PropertiesView/>
                                    </Box>
                                </Grid>

                            </Grid>

                            {/* FOOTER */}
                            <Grid size={12} sx={{mt: 'auto', paddingTop: 2, paddingBottom: 2, px: {xs: 1, sm: 1}}}>
                                <FooterView/>
                            </Grid>

                        </Stack>
                    </Box>
                </Paper>

            </div>
        </ThemeProvider>
    );
}

export default App;
