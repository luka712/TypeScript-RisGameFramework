import {useDropzone} from "react-dropzone";
import {useAppStore} from "../store/AppStore.ts";
import {Button} from "@mui/material";
import {useTextureStore} from "../store/TextureStore.ts";



/**
 * The drop area component.
 * @constructor
 */
export default function AddFileButton() {

    const addTexture = useTextureStore(state => state.addTexture);


    const {getRootProps, getInputProps} = useDropzone({
        accept: {
            "image/ktx2": [".ktx2", ".png", ".jpg", ".webp", ".jpeg"],
        },
        onDrop: async (files) => {

            for (const file of files) {
                addTexture(file);
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