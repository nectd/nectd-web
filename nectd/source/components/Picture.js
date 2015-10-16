import React from "react";

export default class Picture extends React.Component {
    render() {
        return <picture>
            <img src={"/assets/img/" + this.props.source + ".png"} alt={this.props.altText}/>
        </picture>
    }
};
