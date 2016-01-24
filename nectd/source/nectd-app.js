import React from "react";
import API from "./scripts/nectd";
import ThePage from "./components/ThePage";
import DialogBox from "./components/DialogBox";
import ContactSearch from "./components/ContactSearch";
import Spinner from "./components/Spinner";

class NectdApp {
    constructor() {
        if (App) throw new Error("There can be only one!");
    }

    get pageProps() {
        return {
            status: API.status,
            loginStatus: API.loginStatus,
            details: API.userData.details,
            profiles: API.userData.profiles,
            groups: API.userData.groups,
            groupContacts: API.userGroups
        };
    }

    render(props, content = "") {
        props = Object.assign(this.pageProps, props);
        React.render(<ThePage {...props}>{content}</ThePage>, document.body);
    }

    showDetails(show = true) {
        this.render({ detailShow: show });
    }

    searchContact(groupId) {
        var addContact = contact => {
            this.render(
                null,
                <DialogBox dialogTitle="New contact" noClose={true}>
                    <Spinner/>
                </DialogBox>
            );

            this.addContact(groupId, contact.content[0].nodeId);
        };

        this.render(
            null,
            <DialogBox dialogTitle="New contact" onClose={() => this.render()}>
                <ContactSearch onContactClick={addContact}/>
            </DialogBox>
        );
    }

    addContact(groupId, contactId) {
        API.post(`account/groups/${groupId}/contacts/${contactId}`)
            .then(() => API.fetchGroup(groupId));
    }

    removeContact(groupId, contactId) {
        API.delete(`account/groups/${groupId}/contacts/${contactId}`)
            .then(() => API.fetchGroup(groupId));
    }

    newGroup() {
        var nameFld, descrFld;
        var addGroup = () => {
            var name = nameFld.value,
                description = descrFld.value;

            if (!name || !description) return;

            this.render(
                null,
                <DialogBox dialogTitle="Creating group..." noClose={true}>
                    <Spinner/>
                </DialogBox>
            );

            this.createGroup(name, description);
        };

        this.render(
            null,
            <DialogBox dialogTitle="New group" onClose={() => this.render()}>
                <label>Name <input type="text" ref={input => {
                    if (input) nameFld = input.getDOMNode()
                }}/></label><br/>
                <label>Description <input type="text" ref={input => {
                    if (input) descrFld = input.getDOMNode()
                }}/></label><br/>
                <button type="button" onClick={() => addGroup()}>Save</button>
            </DialogBox>
        );
    }

    editGroup(groupId, name, description) {
        var nameFld, descrFld;
        var doEdit = () => {
            var name = nameFld.value,
                description = descrFld.value;

            if (!name || !description) return;

            this.render(
                null,
                <DialogBox dialogTitle="Editing group..." noClose={true}>
                    <Spinner/>
                </DialogBox>
            );

            this.modifyGroup(groupId, name, description);
        };
        var doDelete = () => {
            this.render(
                null,
                <DialogBox dialogTitle="Deleting group..." noClose={true}>
                    <Spinner/>
                </DialogBox>
            );

            this.deleteGroup(groupId);
        };

        this.render(
            null,
            <DialogBox dialogTitle="Edit group" onClose={() => this.render()}>
                <label>Name <input type="text" ref={input => {
                    if (input) nameFld = input.getDOMNode()
                }} defaultValue={name}/></label><br/>
                <label>Description <input type="text" ref={input => {
                    if (input) descrFld = input.getDOMNode()
                }} defaultValue={description}/></label><br/>
                <button type="button" onClick={() => doEdit()}>Save</button>
                <button type="button" onClick={() => doDelete()}>Delete</button>
            </DialogBox>
        );
    }

    createGroup(name, description) {
        API.post("account/groups/create?sharable=true", { name, description })
            .then(() => API.fetchUserData("groups"));
    }

    modifyGroup(nodeId, name, description) {
        API.post(`account/groups/`, { nodeId, name, description })
            .then(() => API.fetchUserData("groups"));
    }

    deleteGroup(groupId) {
        API.delete(`account/groups/${groupId}`)
            .then(() => API.fetchUserData("groups"));
    }

    isDataLoading(what) {
        return !!API.requests[what];
    }

    isGroupLoading(id) {
        return this.isDataLoading(`group-${id}`);
    }
}

var App = new NectdApp();

API
    .on("status", () => App.render())
    .on("loginStatus", status => {
        if (status === "connected") {
            API.fetchUserData("details");
            API.fetchUserData("profiles");
            API.fetchUserData("groups");
        }
        App.render();
    })
    .on("detailsLoad", () => App.render())
    .on("profilesLoad", () => App.render())
    .on("groupsLoad", groups => {
        // Collecting groups id's and fetching missing user group data
        var groupIds = groups.map(group => {
            if (!(group.nodeId in API.userGroups))
                API.fetchGroup(group.nodeId);

            return group.nodeId;
        });

        // Removing stale group data
        Object.keys(API.userGroups).forEach(id => {
            if (groupIds.indexOf(+id) === -1)
                delete API.userGroups[id];
        });

        App.render();
    })
    .on("groupLoad", () => {
        App.render();
    })
;

document.addEventListener("DOMContentLoaded", () => {
    App.render();
});

export default App;
