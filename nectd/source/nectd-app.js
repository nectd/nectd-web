import React from "react";
import ThePage from "./components/ThePage";
import DialogBox from "./components/DialogBox";
import ContactSearch from "./components/ContactSearch";

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
        this.render(
            null,
            <DialogBox dialogTitle="New contact" onClose={() => this.render()}>
                <ContactSearch onContactClick={contact => console.log("Weeeh", contact)}/>
            </DialogBox>
        );
    }
}

var App = new NectdApp();

document.addEventListener("DOMContentLoaded", () => {
    App.render();
});

export default App;
