/**
 * Gets the pixels of an image.
 * @param image The image to get the pixels from.
 * @param mipmaps If mipmaps should be generated.
 * @returns The pixels of the image per mipmap level.
 */
export function getPixels(image: HTMLImageElement, mipmaps: boolean): ImageDataArray[] {

    let w = image.naturalWidth;
    let h = image.naturalHeight;

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(image, 0, 0);

    // Create data with level 0
    const data = [ctx.getImageData(0, 0, w,h).data];

    if(mipmaps) {
        while(w > 0 && h > 0){
            w = Math.max(w / 2, 1);
            h = Math.max(h / 2, 1);
            canvas.width = w;
            canvas.height = h;
            ctx.drawImage(image, 0, 0, w, h);
            data.push(ctx.getImageData(0, 0, w,h).data);
        }
    }

    return data;
}