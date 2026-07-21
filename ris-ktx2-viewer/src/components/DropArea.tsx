import {useDropzone} from "react-dropzone";
import {useAppStore} from "../store/AppStore.ts";
import {Ktx2Loader} from "../../../ris-ktx2/dist";

interface DropAreaProps {
    ktxLoader: Ktx2Loader;
}


/**
 * The drop area component.
 * @constructor
 */
export default function DropArea({ktxLoader}: DropAreaProps) {

    const addKtxTexture = useAppStore(state => state.addKtxTexture);

    const {getRootProps, getInputProps} = useDropzone({
        accept: {
            "image/ktx2": [".ktx2"],
        },
        onDrop: async (files) => {

            for(const file of files) {
                const ktxTex = await ktxLoader.loadAsync(file);
                addKtxTexture(ktxTex);
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