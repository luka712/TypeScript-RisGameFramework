import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Stack} from "@mui/material";
import {HorizontalLabelTextField} from "../components/HorizontalLabelTextField.tsx";
import {useTextureStore} from "../store/TextureStore.ts";
import {KTX2_FILE_EXTENSION} from "../model/FileExtensionConstants.ts";
import {changeFileExtension} from "../service/formatter.ts";
import {useConvertStore} from "../store/ConvertStore.ts";


export default function ConvertDialog() {
    const [open, setOpen] = React.useState(false);

    const convertToKtx2 = useConvertStore(store => store.convertToKtx2);
    const selectedTexture = useTextureStore(store => store.selectedTexture);
    const setSelectedTexture = useConvertStore(store => store.setSelectedTexture);

    if(selectedTexture) {
        setSelectedTexture(selectedTexture);
    }
    let fileName = selectedTexture?.name;
    if(fileName) {
        fileName = changeFileExtension(fileName, KTX2_FILE_EXTENSION);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConvert = () => {
        // TODO Busy
        convertToKtx2(fileName!);
        // END Busyy
    }



    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open form dialog
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Convert To Ktx2</DialogTitle>
                <DialogContent>

                    <DialogContentText>
                        <Stack>
                            <HorizontalLabelTextField label="File Name" text={fileName}/>
                        </Stack>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleConvert}>Convert</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}