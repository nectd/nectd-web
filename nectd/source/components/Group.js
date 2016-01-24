import React from "react";
import Contact from "./Contact";
import Spinner from "./Spinner";
import API from "../scripts/nectd";
import App from "../nectd-app";

export default class Group extends React.Component {
    editGroup() {
        App.editGroup(this.props.nodeId, this.props.name, this.props.description || "");
    }

    render() {
        var description = this.props.description || "List " + this.props.nodeId;

        if (App.isGroupLoading(this.props.nodeId))
            return <div className="group" data-group-id={this.props.nodeId}>
                <div className="group-header">{description}</div>
                <Spinner/>
            </div>

        var btn = "", contacts = [];
        if (this.props.contacts) {
            contacts = this.props.contacts;
            btn = this.state && this.state.removing ? <Spinner/>
                    : <button type="button" className="group-action fa fa-pencil" onClick={() => this.editGroup()}></button>;
        }

        return <div className="group" data-group-id={this.props.nodeId}>
            <div className="pull-right">{btn}</div>
            <div className="group-header">{description}</div>
            {contacts.map(
                contact => <Contact key={contact.nodeId} onRemove={() => App.removeContact(this.props.nodeId, contact.nodeId)} {...contact}/>
            )}
            <button type="button" onClick={() => App.searchContact(this.props.nodeId)}>Add contact</button>
        </div>
    }
};
