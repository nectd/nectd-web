import React from "react";
import API from "../scripts/nectd";

export default class Header extends React.Component {
    constructor() {
        super();

        this.state = { status: API.status };
        API.on("status", () => {
            this.setState({ status: API.status });
        });
    }

    render() {
        let content = {
            ready: <button type="button" onClick={API.login.bind(API)}>Login</button>,
            loading: <span>Loading</span>,
            failed: <em>Error</em>
        }[this.state.status] || "";

        return <div className="login-bar">{content}</div>
    }
};
