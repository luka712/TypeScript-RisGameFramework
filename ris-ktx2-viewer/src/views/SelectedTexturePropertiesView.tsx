import {useEffect, useState} from "react";
import GenericPropertiesView from "./GenericPropertiesView.tsx";
import type {ITexture2DContainer} from "../model/ITexture2DContainer.ts";
import {Mapper} from "../service/Mapper.ts";
import {useTextureStore} from "../store/TextureStore.ts";

export default function SelectedTexturePropertiesView() {
    const onTexSelected = useTextureStore(
        store => store.onTextureSelectedCallbacks
    );

    const [properties, setProperties] = useState([
        { name: "Width", value: "0" },
        { name: "Height", value: "0" },
        { name: "Mipmaps", value: "1" },
        { name: "Format", value: "RGBA8" },
    ]);

    useEffect(() => {
        const callback = (tex: ITexture2DContainer) => {

            setProperties([
                { name: "Width", value: tex?.texture?.width?.toString() ?? "0" },
                { name: "Height", value: tex?.texture?.height?.toString() ?? "0" },
                { name: "Mipmaps", value: "1" },
                { name: "Format", value: Mapper.mapTextureFormatToString[tex.texture!.textureFormat!] }
            ]);
        };

        onTexSelected.push(callback);

        return () => {
            const index = onTexSelected.indexOf(callback);

            if (index !== -1) {
                onTexSelected.splice(index, 1);
            }
        };
    }, [onTexSelected]);

    return (
        <GenericPropertiesView properties={properties} />
    );
}