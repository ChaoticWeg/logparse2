import React from "react";

import { Typography } from "@material-ui/core";

export default class Screen extends React.Component {

    static defaultProps = {
        title: "Screen"
    };

    render() {
        const { log, children } = this.props;

        return (
            <div>
                {
                    !log && (
                        <>
                            <Typography variant="h4" component="h4" gutterBottom style={{textAlign: "center"}}>
                                No spoiler log selected
                            </Typography>
                            <Typography variant="body1" component="p" style={{textAlign: "center"}}>
                                Use the upload button to select a spoiler log
                            </Typography>
                        </>
                    )
                }
                {
                    log && (
                        React.Children.map(children, (c) => React.isValidElement(c) && React.cloneElement(c))
                    )
                }
            </div>
        );
    }

}
