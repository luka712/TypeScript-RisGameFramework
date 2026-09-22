import {IImageProcessor} from "./IImageProcessor";
import {RawImageData} from "./RawImageData";
import {vec2} from "gl-matrix";

/**
 * The default CPU-based image processor.
 */
export class CpuImageProcessor implements IImageProcessor {

    /** @inheritdoc */
    public resize(image: RawImageData, vec2: vec2): RawImageData {
        const data = image.getData(0);

        if (data === undefined) {
            throw new Error("Invalid image data");
        }

        if (data instanceof HTMLImageElement) {
            const htmlImage = this._resizeHTMLImage(data, vec2);
            return new RawImageData([htmlImage], htmlImage.width, htmlImage.height, image.channels);
        } else {
            throw new Error("Not implemented.");
        }
    }

    /** @inheritdoc */
    public generateMipmaps(image: RawImageData, levels = -1): RawImageData {

        const data = image.getData(0);
        const resultData = [data];

        const resize = vec2.create();
        let w = image.baseWidth;
        let h = image.baseHeight;

        if (levels < 0) {

            while (w > 1 && h > 1) {
                w = Math.floor(w / 2);
                h = Math.floor(h / 2);

                resize[0] = w;
                resize[1] = h;

                if (data instanceof HTMLImageElement) {
                    const htmlImage = this._resizeHTMLImage(data, resize);
                    resultData.push(htmlImage);
                } else {
                    throw new Error("Not implemented.");
                }
            }
        } else {
            for(let i = 0; i < levels; i++) {

                w = Math.floor(w / 2);
                h = Math.floor(h / 2);

                resize[0] = w;
                resize[1] = h;

                if (data instanceof HTMLImageElement) {
                    const htmlImage = this._resizeHTMLImage(data, resize);
                    resultData.push(htmlImage);
                } else {
                    throw new Error("Not implemented.");
                }
            }
        }

        return new RawImageData(resultData, image.baseWidth, image.baseHeight, image.channels);
    }

    private _resizeHTMLImage(image: HTMLImageElement, vec2: vec2): HTMLImageElement {

        const w = Math.floor(vec2[0]);
        const h = Math.floor(vec2[1]);

        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;

        const context = canvas.getContext("2d")!;
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";
        context.drawImage(image, 0, 0, w, h);

        const pixels = context.getImageData(0, 0, w, h);

        const resizedImage = new Image();
        resizedImage.width = w;
        resizedImage.height = h;
        resizedImage.src = canvas.toDataURL("image/png");

        return resizedImage;
    }
}