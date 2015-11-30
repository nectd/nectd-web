import React from "react";
import ThePage from "./components/ThePage";
import DialogBox from "./components/DialogBox";

var isDOMReady = false;

class NectdApp {
    showDetails(show = true) {
        React.render(<ThePage detailShow={show}/>, document.body);
    }

    newContact() {
        React.render(<ThePage>
            <DialogBox dialogTitle="New contact">
                <h5>Search contact</h5>
                <input type="search"/>
            </DialogBox>
        </ThePage>, document.body);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    isDOMReady = true;
    React.render(<ThePage/>, document.body);
});

export default new NectdApp();
