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

    newContact() {
        API.fetchUserData("groups")
            .then(groups => {
                var contactList = groups.find(group => group.default);
                if (!contactList) return;

                var addContact = contact => {
                    this.render(
                        null,
                        <DialogBox dialogTitle="New contact" noClose={true}>
                            <Spinner/>
                        </DialogBox>
                    );

                    API.post(`account/groups/${contactList.nodeId}/contacts/${contact.content[0].nodeId}`)
                        .then(() => {
                            delete API.userData.groups;
                            this.render();
                        });
                };

                this.render(
                    null,
                    <DialogBox dialogTitle="New contact" onClose={() => this.render()}>
                        <ContactSearch onContactClick={addContact}/>
                    </DialogBox>
                );
            });
    }

    newGroup() {
        var nameFld, descrFld;
        var addGroup = () => {
            var name = nameFld.value,
                description = descrFld.value;

            if (!name || !description) return;

            this.render(
                null,
                <DialogBox dialogTitle="New group" noClose={true}>
                    <Spinner/>
                </DialogBox>
            );

            API.post("account/groups/create?sharable=true", { name, description })
                .then(() => {
                    delete API.userData.groups;
                    this.render();
                });
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
        groups.forEach(group => {
            API.fetchGroup(group.nodeId);
        });
        API.render();
    })
    .on("groupLoad", () => {
        App.render();
    })
;

document.addEventListener("DOMContentLoaded", () => {
    App.render();
});

export default App;
