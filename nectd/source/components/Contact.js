import React from "react";
import UserBox from "./UserBox";

export default class Contact extends React.Component {
    render() {
        return <div className="user-contact" data-contact-id={this.props.contact.nodeId}>
            {this.props.contact.firstName + " " + this.props.contact.lastName}
        </div>
    }
};
