import React from "react";

export default class Spinner extends React.Component {
    render() {
        return <span className={"fa fa-spin fa-circle-o-notch" + (this.props.size ? ` fa-${this.props.size}` : "")}/>
    }
};
