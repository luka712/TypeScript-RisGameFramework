import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {CircularProgress, LinearProgress, Stack} from "@mui/material";
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


export default function ConvertDialog() {

    const selectedTexture = useTextureStore(store => store.selectedTexture);

    let initialFileName = selectedTexture?.name ?? "";
    if (initialFileName) {
        initialFileName = changeFileExtension(initialFileName, KTX2_FILE_EXTENSION) ?? "ktx.ktx2";
    }

    const compressionOptions = [
        KTX_COMPRESSION_NONE,
        KTX_COMPRESSION_ZSTANDARD,
        KTX_COMPRESSION_ZLIB
    ];

    const [open, setOpen] = React.useState(false);
    const [filename, setFilename] = React.useState(initialFileName);
    const [converting, setConverting] = React.useState(false);
    const [encoding, setEncoding] = React.useState(KTX_ENCODING_BASIS_UNIVERSAL_UASTC);
    const [compression, setCompression] = React.useState(compressionOptions[1]);
    const [compressionLevelZstd, setCompressionLevelZstd] = React.useState(19);
    const [compressionLevelZLib, setCompressionLevelZLib] = React.useState(6);
    const [compressionQuality, setCompressionQuality] = React.useState(KTX_MEDIUM_QUALITY);
    const [generateMipmaps, setGenerateMipmaps] = React.useState(false);

    const framework = useTextureStore(store => store.framework);
    const convertToKtx2Async = useConvertStore(store => store.convertToKtx2);
    const addTexture = useTextureStore(store => store.addTexture);
    const setSelectedTextureConvertStore = useConvertStore(store => store.setSelectedTexture);
    const setSelectedTextureTextureStore = useTextureStore(store => store.setSelectedTexture);

    const encodingOptions = [
        KTX_ENCODING_RGBA,
        KTX_ENCODING_BASIS_UNIVERSAL_UASTC,
        KTX_ENCODING_BASIS_UNIVERSAL_ETC1S
    ];

    const compressionQualityOptions = [
        KTX_LOWEST_QUALITY,
        KTX_LOW_QUALITY,
        KTX_MEDIUM_QUALITY,
        KTX_HIGH_QUALITY,
        KTX_HIGHEST_QUALITY
    ];

    if (selectedTexture) {
        setSelectedTextureConvertStore(selectedTexture);
    }


    const handleClickOpen = () => {
        setOpen(true)
        setFilename(initialFileName);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleConvert = async () => {
        setConverting(true);

        const convertParams = new ConvertParameters();
        convertParams.fileName = filename;
        convertParams.encoding = encoding;
        convertParams.generateMipmaps = generateMipmaps;
        convertParams.compression = compression;
        convertParams.compressionLevelZstd = compressionLevelZstd;
        convertParams.compressionLevelZLib = compressionLevelZLib;

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
        }
        setConverting(false);
        handleClose();
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
            >
                <DialogTitle>Convert To Ktx2</DialogTitle>
                <DialogContent>
                    <DialogContentText>
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
                        </Stack>
                        <LinearProgress aria-label="Converting…" sx={{display: converting ? 'block' : 'none'}}/>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleConvert} variant="contained">Convert</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}