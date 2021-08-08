import React from "react";
import _ from "underscore";

import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline, Toolbar } from "@material-ui/core";

import AddButton from "./components/AddButton";

import Theme from "./theme/Theme";
import TopBar from "./components/TopBar";
import LeftLockedDrawer from "./components/LeftLockedDrawer";

import Tabs from "./navigation/Tabs";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex"
    },
    content: {
        height: "100%",
        flexGrow: 1,
        padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`
    }
}));

function App() {

    const [log, setLog] = React.useState(null);
    const [tabKey, setTabKey] = React.useState(_.first(Tabs).key);

    const ScreenComponent = React.useMemo(() => {
        const tab = _.findWhere(Tabs, { key: tabKey });
        return tab ? tab.screen : React.Fragment;
    }, [tabKey]);

    const classes = useStyles();

    function onFileSelected(data) {
        setLog(data);
    }

    return (
        <div className={classes.root}>
            <ThemeProvider theme={Theme}>
                <CssBaseline />
                <TopBar />
                <LeftLockedDrawer activeKey={tabKey} onTabSelected={setTabKey} seedUrl={log ? log[":seed_url"] : null} />
                <main className={classes.content}>
                    <Toolbar />
                    <ScreenComponent log={log} />
                </main>
                <AddButton onFileSelected={onFileSelected} />
            </ThemeProvider>
        </div>
    );
}

export default App;
