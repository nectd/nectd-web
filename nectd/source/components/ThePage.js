import React from "react";
import Header from "./Header";
import TabList from "./TabList";
import GroupSet from "./GroupSet";
import ContactList from "./ContactList";
import ProfileDetails from "./ProfileDetails";
import API from "../scripts/nectd";

function buildState() {
    return {
        status: API.status,
        loginStatus: API.loginStatus,
        API: API
    };
}

export default class ThePage extends React.Component {
    constructor() {
        super();

        API.on("status", () => { this.setState(buildState()); });
        API.on("loginStatus", () => { this.setState(buildState()); });

        this.state = buildState();
    }

    render() {
        var details = this.state.loginStatus === "connected" && this.props && this.props.detailShow
                ? <ProfileDetails /> : "";

        return <div className="full-page-wrapper">
            <Header status={this.state.status} loginStatus={this.state.loginStatus}/>
            <TabList status={this.state.status} loginStatus={this.state.loginStatus}/>
            <ContactList status={this.state.status} loginStatus={this.state.loginStatus}/>
            <GroupSet status={this.state.status} loginStatus={this.state.loginStatus}/>
            {this.props.children}
        </div>
    }
};
