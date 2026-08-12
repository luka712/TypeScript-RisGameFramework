import { useEffect, useState } from "react";
import { useAppStore } from "../store/AppStore.ts";
import PropertiesView from "./PropertiesView.tsx";
import type {ITexture2DContainer} from "../model/ITexture2DContainer.ts";

export default function SelectedTexturePropertiesView() {
    const onTexSelected = useAppStore(
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
                { name: "Format", value: "RGBA8" },
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
        <PropertiesView properties={properties} />
    );
}