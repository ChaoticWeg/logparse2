import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Card } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    fileHashCard: {
        display: "flex",
        justifyContent: "center",
        padding: theme.spacing(2)
    },
    fileHashAvatar: {
        margin: `0 ${theme.spacing(1)}px`,
        [theme.breakpoints.only("md")]: {
            margin: 0
        }
    }
}));

function getHashImgUrl(name) {
    name = encodeURIComponent(name);
    return `https://ootrandomizer.com/img/hash/${name}.png`;
}

export default function FileHash(props) {
    const classes = useStyles();
    const { hash } = props;
    return (
        <Card className={classes.fileHashCard}>
            {
                hash.map((name, i) => (
                    <Avatar
                        className={classes.fileHashAvatar}
                        alt={name}
                        src={getHashImgUrl(name)}
                        key={i}
                    />
                ))
            }
        </Card>
    );
}