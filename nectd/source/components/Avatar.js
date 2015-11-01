import React from "react";
import Icon from "./Icon";

export default class Avatar extends React.Component {
    render() {
        return <span className="user-avatar"><Icon type="user" profileId={this.props.profileId}/></span>
    }
};
