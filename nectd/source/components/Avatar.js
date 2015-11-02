import React from "react";
import Icon from "./Icon";

export default class Avatar extends React.Component {
    render() {
        return <span className="user-avatar" data-profile-id={this.props.profileId}><Icon type="user"/></span>
    }
};
