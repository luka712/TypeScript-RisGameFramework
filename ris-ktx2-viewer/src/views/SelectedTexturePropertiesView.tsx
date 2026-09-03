import GenericPropertiesView from "./GenericPropertiesView.tsx";
import {useTextureStore} from "../store/TextureStore.ts";
import {textureFormatToString} from "../service/Mapper.ts";

export default function SelectedTexturePropertiesView() {
    const selectedTexture = useTextureStore((store) => store.selectedTexture);
    const texture = selectedTexture?.texture;

    const properties = [
        {name: "Width", value: texture?.width?.toString() ?? "0"},
        {name: "Height", value: texture?.height?.toString() ?? "0"},
        {name: "Mipmaps", value: texture?.mipLevels?.toString() ?? "0"},
        {name: "Format", value: textureFormatToString(texture?.textureFormat)},
    ];

    return <GenericPropertiesView properties={properties}/>;
}
