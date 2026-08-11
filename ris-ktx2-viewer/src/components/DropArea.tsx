import {useDropzone} from "react-dropzone";
import {useAppStore} from "../store/AppStore.ts";



/**
 * The drop area component.
 * @constructor
 */
export default function DropArea() {

    const addTexture = useAppStore(state => state.addTexture);


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
        <button style={{border: '1px dashed grey'}}>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drop a KTX2 file here or click to browse.</p>
            </div>
        </button>
    );
}