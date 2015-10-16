import React from "react";
import Container from "./Container";

export default class ContainerSet extends React.Component {
    render() {
        return <ul className="container-set">{this.props.containers.map(
            (container) => <Container key={container.id} container={container}/>
        )}</ul>
    }
};
