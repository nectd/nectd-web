import React from "react";
import Spinner from "./Spinner";
import API from "../scripts/nectd";

export default class Header extends React.Component {
    render() {
        let content = {
            ready: <button type="button" onClick={API.login.bind(API)}>Login</button>,
            loading: <span>Loading <Spinner/></span>,
            failed: <em>Error</em>
        }[this.props.status] || "";

        return <div className="login-bar">{content}</div>
    }
};
