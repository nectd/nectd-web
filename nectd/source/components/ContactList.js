import React from "react";
import Contact from "./Contact";
import Spinner from "./Spinner";
import App from "../nectd-app";

export default class ContactList extends React.Component {
    render() {
        if (App.isDataLoading("groups")) return <div/>;

        var contacts = null;
        if (this.props.groups) {
            var contactList = this.props.groups.find(group => group.default);
            if (contactList) {
                if (App.isGroupLoading(contactList.nodeId))
                    return <div className="contact-list"><Spinner/></div>

                contacts = this.props.groupContacts[contactList.nodeId];
            }
        }

        if (contacts) {
            return <div className="user-list">
                {contacts.map(
                    contact => <Contact key={contact.nodeId} onRemove={() => App.removeContact(contactList.nodeId, contact.nodeId)} {...contact}/>
                )}
                <button type="button" onClick={() => App.searchContact(contactList.nodeId)}>Add contact</button>
            </div>
        }

        return <div className="contact-list"/>
    }
};
