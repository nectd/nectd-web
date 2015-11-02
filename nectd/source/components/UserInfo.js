import React from "react";
import Avatar from "./Avatar";
import Icon from "./Icon";
import Spinner from "./Spinner";
import API from "../scripts/nectd";

export default class UserInfo extends React.Component {
    constructor() {
        super();

        API.on("loginStatus", () => { this.updateInfo(); });
        API.on("logout", () => {
            this.state.loggingOut = true;
            this.setState(this.state);
        });
        this.updateInfo();

        this.state = {};
    }

    updateInfo() {
        if (API.loginStatus === "connected")
            API.fetchUserInfo()
                .then((info) => {
                    this.setState({ profiles: info });
                });
    }

    render() {
        if (this.state.profiles)
            var name = `${this.state.profiles[0].firstName} ${this.state.profiles[0].lastName}`;
        else return <div className="user-info"/>

        var logoutBtn = this.state.loggingOut
                ? <Spinner/>
                : <span onClick={API.logout.bind(API)}>
                    <Icon type="sign-out"/>
                </span>

        return <div className="user-info">
            <Avatar profileId={this.state.profiles[0].profileId} />
            <div className="user-name">
                {name}
                {logoutBtn}
            </div>
        </div>
    }
};
