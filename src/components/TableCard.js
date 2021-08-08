import React from "react";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Collapse, Grid, Table, TableBody, TableCell, TableRow, Typography } from "@material-ui/core";

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    header: {
        padding: theme.spacing(2),
        margin: 0,
        display: "flex",
        alignItems: "center"
    },
    headerTitle: {
        flex: 1
    },
    headerArrow: {
        flex: 0,
        transition: theme.transitions.create(["transform", "opacity"], {
            duration: theme.transitions.duration.short
        })
    },
    rotate: {
        transform: "rotate(180deg)"
    },
    cardContent: {
        padding: `0 ${theme.spacing(2)}px`,
        margin: 0
    }
}));

export default function InfoCard(props) {
    const { title, tables, startOpen = false } = props;

    const [open, setOpen] = React.useState(startOpen);
    const classes = useStyles();

    const iconClass = React.useMemo(() => (
        clsx(classes.headerArrow, {
            [classes.rotate]: open
        })
    ), [open, classes.headerArrow, classes.rotate]);

    return (
        <Card>
            <div className={classes.header} onClick={() => setOpen(!open)}>
                <Typography className={classes.headerTitle} variant="h5" component="h2" gutterBottom>{title}</Typography>
                <div className={classes.headerArrow}>
                    <ExpandMoreIcon className={iconClass} />
                </div>
            </div>
            <CardContent className={classes.cardContent}>
                <Collapse in={open}>
                    <Grid container spacing={3}>
                        {
                            tables.map(({ name, rows }) => (
                                <Grid item xs={12} md={6} lg={4} xl={3}>
                                    <Typography variant="h6" component="h3" gutterBottom>{name}</Typography>
                                    <Table size="small">
                                        <TableBody>
                                            {
                                                rows.map(([key, { name, value }]) => (
                                                    <TableRow key={key}>
                                                        <TableCell component="th" scope="row">{name}</TableCell>
                                                        <TableCell align="right">{value}</TableCell>
                                                    </TableRow>
                                                ))
                                            }
                                        </TableBody>
                                    </Table>
                                </Grid>
                            ))
                        }
                    </Grid>
                </Collapse>
            </CardContent>
        </Card>
    );
}
