import React from "react";
import Avatar from "./Avatar";

export default class UserBox extends React.Component {
    render() {
        return <div className="user-box" data-user-id={this.props.user.id}>
            <Avatar user={this.props.user.id} />
            <div className="user-box-name">{this.props.user.username}</div>
        </div>
    }
};
