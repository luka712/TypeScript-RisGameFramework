import {useDropzone} from "react-dropzone";
import {useAppStore} from "../store/AppStore.ts";
import {Ktx2Loader} from "../../../ris-ktx2/dist";
import {Button} from "@mui/material";

interface AddFileButtonProps {
    ktxLoader: Ktx2Loader;
}


/**
 * The drop area component.
 * @constructor
 */
export default function AddFileButton({ktxLoader}: AddFileButtonProps) {

    const addKtxTexture = useAppStore(state => state.addKtxTexture);


    const {getRootProps, getInputProps} = useDropzone({
        accept: {
            "image/ktx2": [".ktx2"],
        },
        onDrop: async (files) => {

            for (const file of files) {
                const ktxTex = await ktxLoader.loadAsync(file);
                addKtxTexture(ktxTex);
            }
        },
    });


    return (
        <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
        >
            Add File
            <div {...getRootProps()}>
                <input {...getInputProps()} />
            </div>
        </Button>
    );
}