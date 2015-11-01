import React from "react";
import Avatar from "./Avatar";
import API from "../scripts/nectd";

export default class UserInfo extends React.Component {
    constructor() {
        super();

        API.on("loginStatus", () => { this.updateInfo(); });
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

        return <div className="user-info">
            <Avatar profileId={this.state.profiles[0].profileId} />
            <div className="user-name">{name}</div>
        </div>
    }
};
