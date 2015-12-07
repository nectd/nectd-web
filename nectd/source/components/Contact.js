import React from "react";
import Avatar from "./Avatar";

export default class Contact extends React.Component {
    render() {
        return <div className="user-contact" data-contact-id={this.props.nodeId}>
            <Avatar user={this.props.nodeId}/>
            {this.props.firstName + " " + this.props.lastName}
        </div>
    }
};
