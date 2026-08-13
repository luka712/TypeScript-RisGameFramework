import { useState } from "react";
import { useAppStore } from "../store/AppStore.ts";
import {
    Divider,
    Menu,
    MenuItem,
    Paper,
    Typography
} from "@mui/material";
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";


/**
 * The texture list component.
 * @constructor
 */
export default function TextureList() {

    const textures = useAppStore(state => state.textures);
    const setSelectedTexture = useAppStore(state => state.setSelectedTexture);
    const removeTexture = useAppStore(state => state.removeTexture);

    const [contextMenu, setContextMenu] = useState<{
        mouseX: number;
        mouseY: number;
        itemId: string;
    } | null>(null);

    const listTextures = textures.map((tex, index) => ({
        id: tex.texture?.id.toString() ?? "0",
        label: `${index + 1}. ${tex.name ?? "Unknown"}`,
        texture: tex
    }));

    const handleSelectionChange = (
        event: React.SyntheticEvent | null,
        itemId: string | null
    ) => {
        if (itemId === null) {
            return;
        }

        const selected = listTextures.find(
            tex => tex.id === itemId
        );

        if (selected) {
            setSelectedTexture(selected.texture);
        }
    };

    const handleContextMenu = (
        event: React.MouseEvent,
        itemId: string
    ) => {
        event.preventDefault();

        setContextMenu({
            mouseX: event.clientX,
            mouseY: event.clientY,
            itemId
        });
    };

    const handleCloseContextMenu = () => {
        setContextMenu(null);
    };

    const handleRemove = () => {
        if (contextMenu === null) {
            return;
        }

        const selected = listTextures.find(
            tex => tex.id === contextMenu.itemId
        );

        if (selected) {
            removeTexture(selected.texture);
        }

        handleCloseContextMenu();
    };

    // If there are no textures return empty component.
    if (listTextures.length === 0) {
        return (
            <Paper elevation={3}>
                <Typography sx={{ p: 2 }} variant="h6">
                    Textures
                </Typography>
            </Paper>
        );
    }

    return (
        <Paper
            elevation={3}
            sx={{
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20
            }}
        >
            <Typography sx={{ p: 2 }} variant="h6">
                Textures
            </Typography>

            <Divider />

            <SimpleTreeView
                onSelectedItemsChange={handleSelectionChange}
            >
                {listTextures.map(tex => (
                    <TreeItem
                        key={tex.id}
                        itemId={tex.id}
                        label={tex.label}
                        onContextMenu={(event) =>
                            handleContextMenu(event, tex.id)
                        }
                    />
                ))}
            </SimpleTreeView>

            <Menu
                open={contextMenu !== null}
                onClose={handleCloseContextMenu}
                anchorReference="anchorPosition"
                anchorPosition={
                    contextMenu !== null
                        ? {
                            top: contextMenu.mouseY,
                            left: contextMenu.mouseX
                        }
                        : undefined
                }
            >
                <MenuItem onClick={handleRemove}>
                    Remove
                </MenuItem>
            </Menu>
        </Paper>
    );
}