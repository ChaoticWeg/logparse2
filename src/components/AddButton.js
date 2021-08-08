import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Fab, Portal, Tooltip } from "@material-ui/core";

import PublishIcon from '@material-ui/icons/Publish';

const useStyles = makeStyles((theme) => ({
    fileInput: {
        display: "none"
    },
    fabWrapper: {
        position: "absolute",
        right: theme.spacing(6),
        bottom: theme.spacing(6)
    }
}));

export default function AddButton(props) {

    const fileInput = React.useRef(null);
    const classes = useStyles();

    function callPropFunction(name, ...args) {
        const fn = props[name];
        if (typeof fn === "function") {
            return fn(...args);
        }
    }

    function onFileSelected(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onerror = () => alert("Error reading file");

        reader.onload = (e) => {
            const json = e.target.result;
            let data;

            try {
                data = JSON.parse(json);
            } catch (err) {
                alert("Could not read file. Is it a properly formatted JSON file?");
                return;
            }

            callPropFunction("onFileSelected", data);
        };

        reader.readAsText(file, "utf-8");
    }

    function onClick() {
        fileInput.current?.click();
    }

    return (
        <Portal container={document.html}>
            <div className={classes.fabWrapper}>
                <input
                    type="file"
                    accept="application/json"
                    id="upload-file"
                    ref={fileInput}
                    className={classes.fileInput}
                    onChange={onFileSelected}
                />
                <Tooltip title="Upload Log">
                    <Fab color="secondary" aria-label="add" onClick={onClick}>
                        <PublishIcon />
                    </Fab>
                </Tooltip>
            </div>
        </Portal>
    );

}