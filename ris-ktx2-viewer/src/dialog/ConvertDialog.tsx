import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {Alert, LinearProgress, Stack, useMediaQuery, useTheme} from "@mui/material";
import {HorizontalLabelTextField} from "../components/HorizontalLabelTextField.tsx";
import {useTextureStore} from "../store/TextureStore.ts";
import {KTX2_FILE_EXTENSION} from "../model/FileExtensionConstants.ts";
import {changeFileExtension} from "../service/formatter.ts";
import {useConvertStore} from "../store/ConvertStore.ts";
import SelectField from "../components/SelectField.tsx";
import {
    KTX_ENCODING_BASIS_UNIVERSAL_ETC1S,
    KTX_ENCODING_BASIS_UNIVERSAL_UASTC,
    KTX_ENCODING_RGBA
} from "../model/Ktx2EncodingConstants.ts";
import {
    KTX_HIGH_QUALITY,
    KTX_HIGHEST_QUALITY,
    KTX_MEDIUM_QUALITY,
    KTX_LOW_QUALITY,
    KTX_LOWEST_QUALITY
} from "../model/CompressionQualityConstants.ts";
import type {ITexture2DContainer} from "../model/ITexture2DContainer.ts";
import {CheckboxField} from "../components/CheckboxField.tsx";
import {SliderField} from "../components/SliderField.tsx";
import {ConvertParameters} from "../model/ConvertParameters.ts";
import {
    KTX_COMPRESSION_NONE,
    KTX_COMPRESSION_ZLIB,
    KTX_COMPRESSION_ZSTANDARD
} from "../model/Ktx2CompressionConstants.ts";
import {RDO_BALANCED, RDO_QUALITY_OPTIONS} from "../model/RDOCompressionConstants.ts";


export default function ConvertDialog() {

    const selectedTexture = useTextureStore(store => store.selectedTexture);

    let initialFileName = selectedTexture?.name ?? "";
    if (initialFileName) {
        initialFileName = changeFileExtension(initialFileName, KTX2_FILE_EXTENSION) ?? "ktx.ktx2";
    }

    // For UASTC
    const qualityOptions = [
        KTX_LOWEST_QUALITY,
        KTX_LOW_QUALITY,
        KTX_MEDIUM_QUALITY,
        KTX_HIGH_QUALITY,
        KTX_HIGHEST_QUALITY
    ];

    const compressionOptions = [
        KTX_COMPRESSION_NONE,
        KTX_COMPRESSION_ZSTANDARD,
        KTX_COMPRESSION_ZLIB
    ];

    const [open, setOpen] = React.useState(false);
    const [filename, setFilename] = React.useState(initialFileName);
    const [converting, setConverting] = React.useState(false);
    const [convertError, setConvertError] = React.useState<string | null>(null);
    const [encoding, setEncoding] = React.useState(KTX_ENCODING_BASIS_UNIVERSAL_UASTC);
    const [compression, setCompression] = React.useState(compressionOptions[1]);
    const [compressionLevelZstd, setCompressionLevelZstd] = React.useState(19);
    const [compressionLevelZLib, setCompressionLevelZLib] = React.useState(6);
    const [uastcQuality, setUastcQuality] = React.useState(KTX_MEDIUM_QUALITY);
    const [generateMipmaps, setGenerateMipmaps] = React.useState(false);
    const [rdoQuality, setRdoQuality] = React.useState(RDO_BALANCED);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const framework = useTextureStore(store => store.framework);
    const convertToKtx2Async = useConvertStore(store => store.convertToKtx2);
    const addTexture = useTextureStore(store => store.addTexture);
    const setConvertSelectedTexture = useConvertStore(store => store.setSelectedTexture);

    // Sync selection into ConvertStore outside of render (do not re-set TextureStore).
    React.useEffect(() => {
        if (selectedTexture) {
            setConvertSelectedTexture(selectedTexture);
        }
    }, [selectedTexture, setConvertSelectedTexture]);

    const encodingOptions = [
        KTX_ENCODING_RGBA,
        KTX_ENCODING_BASIS_UNIVERSAL_UASTC,
        KTX_ENCODING_BASIS_UNIVERSAL_ETC1S
    ];

    const handleClickOpen = () => {
        setConvertError(null);
        setOpen(true);
        setFilename(initialFileName);
    };

    const handleClose = () => {
        if (converting) {
            return;
        }
        setOpen(false);
        setConvertError(null);
    };


    const handleConvert = async () => {
        setConverting(true);
        setConvertError(null);

        const convertParams = new ConvertParameters();
        convertParams.fileName = filename;
        convertParams.encoding = encoding;
        convertParams.uastcQuality = uastcQuality;
        convertParams.rdoQuality = rdoQuality;
        convertParams.generateMipmaps = generateMipmaps;
        convertParams.compression = compression;
        convertParams.compressionLevelZstd = compressionLevelZstd;
        convertParams.compressionLevelZLib = compressionLevelZLib;

        try {
            const result = await convertToKtx2Async(convertParams);
            if (result.success) {
                const texture = framework!.textureFactory.createFromKtx2(result.ktx!);
                const texContainer: ITexture2DContainer = {
                    name: result.name!,
                    ktxContainer: result.ktx!,
                    texture: texture,
                    image: null
                };
                await addTexture(texContainer);
                setOpen(false);
                setConvertError(null);
            }
        } catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            console.error("Convert failed:", err);
            setConvertError(message);
        } finally {
            setConverting(false);
        }
    }

    const isImage = !!selectedTexture?.image;

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}
                    disabled={!isImage}>
                Convert
            </Button>
            <Dialog open={open}
                    onClose={handleClose}
                    fullWidth={true}
                    maxWidth="md"
                    fullScreen={fullScreen}
                    aria-busy={converting}
            >
                <DialogTitle>Convert To Ktx2</DialogTitle>
                <DialogContent>
                    <Stack spacing={1.2}>
                        <HorizontalLabelTextField label="File Name" text={filename} onValueChange={setFilename}/>

                        <SelectField label="Encode"
                                     value={encoding}
                                     options={encodingOptions} onValueChange={setEncoding}/>

                        <CheckboxField label="Generate Mipmaps"
                                       value={generateMipmaps}
                                       onValueChange={setGenerateMipmaps}
                                       rowDirection={true}
                        />

                        {/* UASTC Quality */}
                        {encoding == KTX_ENCODING_BASIS_UNIVERSAL_UASTC &&
                            <SelectField label={"UASTC Quality"}
                                         value={uastcQuality}
                                         options={qualityOptions}
                                         onValueChange={setUastcQuality} />
                        }

                        <SelectField label={"Compression"}
                                     value={compression}
                                     options={compressionOptions}
                                     onValueChange={setCompression}/>

                        {/* ZStandard */}
                        {compression === compressionOptions[1] &&
                            <SliderField label={"Compression Level"}
                                         value={compressionLevelZstd}
                                         min={1}
                                         max={22}
                                         rowDirection={true}
                                         onValueChange={setCompressionLevelZstd}/>
                        }
                        {/* ZLIB */}
                        {compression === compressionOptions[2] &&
                            <SliderField label={"Compression Level"}
                                         value={compressionLevelZLib}
                                         min={1}
                                         max={9}
                                         rowDirection={true}
                                         onValueChange={setCompressionLevelZLib}/>
                        }

                        {/* Compression RDO is available for UASTC with ZLIB or ZSTD */}
                        {encoding == KTX_ENCODING_BASIS_UNIVERSAL_UASTC && compression != KTX_COMPRESSION_NONE &&
                            <SelectField label={"RDO Quality"}
                                         options={RDO_QUALITY_OPTIONS}
                                         value={rdoQuality}
                                         onValueChange={setRdoQuality}/>
                        }

                        {convertError && (
                            <Alert severity="error" onClose={() => setConvertError(null)}>
                                {convertError}
                            </Alert>
                        )}
                    </Stack>
                    <LinearProgress aria-label="Converting…" sx={{display: converting ? 'block' : 'none', mt: 1}}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} disabled={converting}>Cancel</Button>
                    <Button onClick={handleConvert} variant="contained" disabled={converting}>
                        Convert
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
