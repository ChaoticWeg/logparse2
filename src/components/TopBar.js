import { AppBar, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";

import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';

const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1
    },
    leftIcon: {
        marginLeft: theme.spacing(1)
    }
}));

export default function TopBar(props) {
    const classes = useStyles();
    return (
        <AppBar className={classes.appBar}>
            <Toolbar>
                <VideogameAssetIcon className={classes.leftIcon} />
                <ListAltOutlinedIcon className={classes.leftIcon} />
            </Toolbar>
        </AppBar>
    );
}