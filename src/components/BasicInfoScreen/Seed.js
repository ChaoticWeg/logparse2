import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Card, IconButton, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    card: {
        display: "flex",
        padding: `${theme.spacing(1)}px ${theme.spacing(3)}px`
    }
}));

export default function Seed(props) {
    const {
        title = "Seed",
        seed,
        rightIcon,
        onRightIconClick
    } = props;

    const classes = useStyles();

    const IconWrapper = (typeof onRightIconClick === "function") ? IconButton : React.Fragment;

    return (
        <Card className={classes.card}>
            <div style={{ flex: 1 }}>
                <Typography variant="body1" component="p" color="textSecondary">{title}</Typography>
                <Typography variant="h6" component="h3">{seed}</Typography>
            </div>
            {
                rightIcon && (
                    <div style={{ flex: 0, alignSelf: "center" }}>
                        <IconWrapper onClick={onRightIconClick}>
                            {rightIcon}
                        </IconWrapper>
                    </div>
                )
            }
        </Card>
    );
}