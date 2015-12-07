import React from "react";
import Contact from "./Contact";
import Spinner from "./Spinner";
import API from "../scripts/nectd";
import App from "../nectd-app";

export default class Group extends React.Component {
    deleteGroup() {
        this.setState({ removing: true });
        API.delete("account/groups/" + this.props.group.groupId)
            .then(() => {
                delete API.userData.groups;
                App.render();
            });
    }

    render() {
        var description = this.props.group.description || "List " + this.props.group.groupId;

        if (this.props.contacts) {
            var btn = this.state && this.state.removing ? <Spinner/>
                    : <button type="button" className="group-action fa fa-times" onClick={() => this.deleteGroup()}></button>,
                contacts = this.props.contacts;
        } else {
            var btn = "", contacts = [];
        }


        return <div className="group" data-group-id={this.props.group.groupId}>
            <div className="pull-right">{btn}</div>
            <div className="group-header">{description}</div>
            {contacts.map(
                contact => <Contact key={contact.nodeId} {...contact}/>
            )}
        </div>
    }
};
