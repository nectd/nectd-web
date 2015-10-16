import React from "react";
import Avatar from "./Avatar";

export default class UserInfo extends React.Component {
    render() {
        return <div className="user-info">
            <Avatar />
            <div className="user-name">{this.props.info.username}</div>
        </div>
    }
};
