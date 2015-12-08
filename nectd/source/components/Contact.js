import React from "react";
import Avatar from "./Avatar";
import Spinner from "./Spinner";

export default class Contact extends React.Component {
    removeContact() {
        this.setState({ removing: true });
        this.props.onRemove(this.props.nodeId);
    }

    render() {
        var actionBtn = "";
        if (this.state && this.state.removing)
            actionBtn = <span className="contact-action"><Spinner/></span>;
        else if (typeof this.props.onRemove === "function")
            actionBtn = <button className="contact-action fa fa-times" onClick={() => this.removeContact()}/>;

        return <div className="user-contact" data-contact-id={this.props.nodeId}>
            {actionBtn}
            <Avatar user={this.props.nodeId}/>
            {(this.props.firstName || "") + " " + (this.props.lastName || "")}
        </div>
    }
};
