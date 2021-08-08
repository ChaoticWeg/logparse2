import React from "react";
import _ from "underscore";

import { Grid, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';

import Screen from "./Screen";

import FileHash from "../components/BasicInfoScreen/FileHash";
import TableCard from "../components/TableCard";
import ListCard from "../components/BasicInfoScreen/ListCard";
import Seed from "../components/BasicInfoScreen/Seed";

import {
    KeyTranslations,
    MainRulesOpenKeys,
    MainRulesWorldKeys,
    MainRulesShuffleKeys,
    MainRulesShuffleDungeonItemsKeys
} from "../data/BasicInfoScreenTableKeys";

function keyToPrintable(value) {
    if (typeof value === "string") {
        value = KeyTranslations[value] || value;
        return _.chain(value.split("_")

            // A little hacky but whatever
            .map(w => w === "mq" ? "MQ" : w)
            .map(w => w === "lacs" ? "LACS" : w)

            .map(w => `${w.substring(0, 1).toLocaleUpperCase()}${w.substring(1)}`))
            .join(" ")
            .value();
    }

    if (typeof value === "boolean") {
        return value ? "Yes" : "No";
    }

    if (Array.isArray(value)) {
        return value.join("\n");
    }

    if (typeof value === "object") {
        return null;
    }

    return `${value}`;
}

const useStyles = makeStyles((theme) => ({
    romInfoGrid: {
        marginBottom: theme.spacing(1)
    }
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function BasicInfoScreen(props) {
    const { log } = props;

    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(null);

    const classes = useStyles();

    if (!log) {
        return <Screen log={log} />;
    }

    function buildRowsFromKeys(keys) {
        return _.chain(keys)
            .map(k => [k, { name: keyToPrintable(k), value: keyToPrintable(settings[k]) }])
            .reject((r) => _.isEmpty(r[1].value))
            .value();
    }

    let { file_hash, settings } = log;
    let seed = log[":seed"];
    let version = log[":version"]

    function copySeedToClipboard() {
        navigator.clipboard.writeText(seed)
            .then(() => Promise.reject())
            .then(onSeedCopySuccess)
            .catch(onSeedCopyError);
    }

    function onSeedCopySuccess() {
        setSuccess(true);
    }

    function onSeedCopyError() {
        setError(true);
    }

    const mainRulesOpenRows = buildRowsFromKeys(MainRulesOpenKeys);
    const mainRulesWorldRows = buildRowsFromKeys(MainRulesWorldKeys);
    const mainRulesShuffleRows = buildRowsFromKeys(MainRulesShuffleKeys);
    const mainRulesShuffleDungeonItemsRows = buildRowsFromKeys(MainRulesShuffleDungeonItemsKeys);

    const mainRulesTables = [
        { name: "Open", rows: mainRulesOpenRows },
        { name: "World", rows: mainRulesWorldRows },
        { name: "Shuffle", rows: mainRulesShuffleRows },
        { name: "Dungeon Items", rows: mainRulesShuffleDungeonItemsRows }
    ];

    return (
        <Screen title="Basic Info" log={log}>
            <Grid container className={classes.romInfoGrid} spacing={2} alignItems="stretch">
                <Grid item xs={12} md={4}>
                    <FileHash hash={file_hash} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Seed
                        seed={seed}
                        rightIcon={<FileCopyOutlinedIcon />}
                        onRightIconClick={copySeedToClipboard}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Seed title="Version" seed={version} />
                </Grid>
                <Grid item xs={12}>
                    <TableCard
                        startOpen
                        title="Main Rules"
                        tables={mainRulesTables}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <ListCard
                        title="Disabled Locations"
                        values={log.settings.disabled_locations}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <ListCard
                        title="Allowed Tricks"
                        values={
                            _.isEmpty(log.settings.allowed_tricks)
                                ? ["(none)"]
                                : _.chain(log.settings.allowed_tricks)
                                    .map(t => t.replace(/^logic_/, ""))
                                    .map(t => keyToPrintable(t))
                                    .value()
                        }
                    />
                </Grid>
            </Grid>
            <Snackbar open={success} autoHideDuration={4000} onClose={() => setSuccess(false)}>
                <Alert severity="success" onClose={() => setSuccess(false)}>
                    Copied seed to clipboard
                </Alert>
            </Snackbar>
            <Snackbar open={error} autoHideDuration={4000} onClose={() => setError(false)}>
                <Alert severity="error" onClose={() => setError(false)}>
                    Error copying seed to clipboard. Is clipboard access allowed?
                </Alert>
            </Snackbar>
        </Screen>
    );
}