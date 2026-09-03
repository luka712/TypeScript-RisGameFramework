import {useDropzone} from "react-dropzone";
import {useTextureStore} from "../store/TextureStore.ts";
import {TEXTURE_FILE_ACCEPT} from "../service/fileAccept.ts";

/**
 * Full-width drop zone for loading texture files.
 */
export default function DropArea() {
    const addTexture = useTextureStore((state) => state.addTexture);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: TEXTURE_FILE_ACCEPT,
        onDrop: async (files) => {
            for (const file of files) {
                await addTexture(file);
            }
        },
    });

    return (
        <div
            {...getRootProps()}
            style={{
                border: "1px dashed grey",
                borderRadius: 8,
                padding: 16,
                textAlign: "center",
                cursor: "pointer",
                opacity: isDragActive ? 0.8 : 1,
            }}
        >
            <input {...getInputProps()} />
            <p>Drop a KTX2 / PNG / JPEG / WebP file here or click to browse.</p>
        </div>
    );
}
