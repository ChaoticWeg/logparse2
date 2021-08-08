import {createTheme} from "@material-ui/core/styles";

const Theme = createTheme({
    palette: {
        type: "dark",
        success: {main: "#38786a"},
        error: {main: "#ab000d"},
        primary: {
            main: "#004c3f",
            light: "#38786a",
            dark: "#002419",
            contrastText: "#fafafa"
        },
        secondary: {
            main: "#37474f",
            light: "#62727b",
            dark: "#102027",
            contrastText: "#fafafa"
        }
    }
});

export default Theme;