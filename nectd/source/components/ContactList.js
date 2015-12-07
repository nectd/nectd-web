import React from "react";
import Contact from "./Contact";
import Spinner from "./Spinner";
import App from "../nectd-app";

export default class ContactList extends React.Component {
    render() {
        var contacts = null;
        if (this.props.groups) {
            var contactList = this.props.groups.find(group => group.default);
            if (contactList && this.props.groupContacts)
                contacts = this.props.groupContacts[contactList.nodeId];
        }

        if (contacts) {
            return <div className="user-list">
                {contacts.map(
                    contact => <Contact key={contact.nodeId} {...contact}/>
                )}
                <button type="button" onClick={App.newContact.bind(App)}>New contact</button>
            </div>
        // } else if (this.props.loginStatus === "connected") {
        //     return <div className="contact-list"><Spinner/></div>
        }

        return <div className="contact-list"/>
    }
};
