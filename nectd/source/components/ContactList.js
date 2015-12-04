import React from "react";
import Contact from "./Contact";
import Spinner from "./Spinner";
import API from "../scripts/nectd";
import App from "../nectd-app";

export default class ContactList extends React.Component {
    fetchContacts() {
        if (this.props.loginStatus === "connected")
            API.fetchUserData("groups")
                .then((groups) => {
                    this.setState({
                        contacts: groups.find(group => group.default)
                    });
                });
    }

    render() {
        var contacts = this.state && API.userData.groups && this.state.contacts;

        if (contacts) {
            return <div className="user-list">
                {contacts.handles.map(
                    (contact, index) => <Contact key={index} contact={contact}/>
                )}
                <button type="button" onClick={App.newContact.bind(App)}>New contact</button>
            </div>
        } else if (this.props.loginStatus === "connected") {
            this.fetchContacts();
            return <div className="contact-list"><Spinner/></div>
        }

        return <div className="contact-list"/>
    }
};
