import React from "react";
import _ from "underscore";

import { makeStyles } from "@material-ui/styles";
import { Drawer, Toolbar, List, ListItem, ListItemText, ListItemIcon } from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import Tabs from "../navigation/Tabs";

const getDrawerWidth = (theme) => ({
    [theme.breakpoints.down("sm")]: {
        display: "none"
    },
    [theme.breakpoints.up("md")]: {
        width: "20vw"
    },
    [theme.breakpoints.up("lg")]: {
        width: "15vw"
    }
});

const useStyles = makeStyles((theme) => ({
    drawer: {
        ...getDrawerWidth(theme),
        flexShrink: 0
    },
    drawerPaper: {
        ...getDrawerWidth(theme)
    },
    drawerContainer: {
        overflow: "auto"
    }
}));

export default function LeftLockedDrawer(props) {
    const { activeKey, seedUrl } = props;

    const classes = useStyles();

    function callPropFunction(name, ...args) {
        const fn = props[name];
        if (typeof fn === "function") {
            return fn(...args);
        }
    }

    function onListItemSelected(key) {
        callPropFunction("onTabSelected", key);
    }

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{ paper: classes.drawerPaper }}
        >
            <Toolbar />
            <div className={classes.drawerContainer}>
                <List>
                    {
                        _.map(Tabs, ({ key, name, icon }) => (
                            <ListItem button key={key} onClick={() => onListItemSelected(key)} selected={activeKey === key}>
                                {icon && (<ListItemIcon>{icon}</ListItemIcon>)}
                                <ListItemText primary={name} />
                            </ListItem>
                        ))
                    }
                    {
                        !_.isEmpty(seedUrl) && (
                            <ListItem button onClick={() => window.open(seedUrl, "_blank").focus()}>
                                <ListItemIcon><ExitToAppIcon/></ListItemIcon>
                                <ListItemText primary="View on OOTR" />
                            </ListItem>
                        )
                    }
                </List>
            </div>
        </Drawer>
    );

}