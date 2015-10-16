import React from "react";
import ThePage from "./components/ThePage";
import API from "./scripts/nectd";

window.NectdAPI = API;

document.addEventListener("DOMContentLoaded", () => {
    React.render(<ThePage/>, document.body);
});
