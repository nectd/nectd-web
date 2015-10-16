import React from "react";
import Picture from "./Picture";

export default class Logo extends React.Component {
    render() {
        return <a href="/" className="header-logo">
            <Picture source="logo" altText="Nectd"/>
        </a>
    }
};
