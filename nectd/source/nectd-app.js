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

    render(props = null, content = "") {
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
                    delete API.userData.groups;
                    this.render(
                        null,
                        <DialogBox dialogTitle="New contact" noClose={true}>
                            <Spinner/>
                        </DialogBox>
                    );

                    API.post(`account/groups/${contactList.nodeId}/contacts/${contact.content[0].nodeId}`)
                        .then(() => this.render());
                };

                this.render(
                    null,
                    <DialogBox dialogTitle="New contact" onClose={() => this.render()}>
                        <ContactSearch onContactClick={addContact}/>
                    </DialogBox>
                );
            });
    }
}

var App = new NectdApp();

document.addEventListener("DOMContentLoaded", () => {
    App.render();
});

export default App;
