/** Shared dropzone accept config for supported texture files. */
export const TEXTURE_FILE_ACCEPT = {
    "image/png": [".png"],
    "image/jpeg": [".jpg", ".jpeg"],
    "image/webp": [".webp"],
    "application/octet-stream": [".ktx2"],
} as const;
