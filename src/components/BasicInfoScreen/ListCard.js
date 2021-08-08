import React from "react";
import clsx from "clsx";
import _ from "underscore";

import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Chip, Collapse, List, ListItem, ListItemText, Typography } from "@material-ui/core";

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    header: {
        display: "flex",
        alignItems: "center",
        marginBottom: theme.spacing(1)
    },
    title: {
        flex: 1
    },
    chip: {
        flex: 0,
        alignSelf: "flex-start"
    },
    headerArrowWrapper: {
        flex: 0,
        marginLeft: theme.spacing(1)
    },
    headerArrow: {
        transition: theme.transitions.create(["transform", "opacity"], {
            duration: theme.transitions.duration.short
        })
    },
    rotate: {
        transform: "rotate(180deg)"
    },
}));

export default function ListCard(props) {
    const { title, values, startOpen = false } = props;

    const [open, setOpen] = React.useState(startOpen);
    const classes = useStyles();

    const iconClass = React.useMemo(() => (
        clsx(classes.headerArrow, {
            [classes.rotate]: open
        })
    ), [open, classes.headerArrow, classes.rotate]);

    return (
        <Card>
            <CardContent>
                <div className={classes.header} onClick={() => setOpen(!open)}>
                    <Typography className={classes.title} variant="h5" component="h2" gutterBottom>{title}</Typography>
                    <Chip className={classes.chip} label={_.size(values)} />
                    <div className={classes.headerArrowWrapper}>
                        <ExpandMoreIcon className={iconClass} />
                    </div>
                </div>
                <Collapse in={open}>
                    <List dense disablePadding>
                        {
                            _.map(values, (v) => (
                                <ListItem dense disablePadding>
                                    <ListItemText primary={v} />
                                </ListItem>
                            ))
                        }
                    </List>
                </Collapse>
            </CardContent>
        </Card>
    );
}
