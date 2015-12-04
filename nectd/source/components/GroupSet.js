import React from "react";
import Group from "./Group";
import Spinner from "./Spinner";
import API from "../scripts/nectd";
import App from "../nectd-app";

export default class GroupSet extends React.Component {
    fetchGroups() {
        if (this.props.loginStatus === "connected")
            API.fetchUserData("groups")
                .then(groups => {
                    this.setState({ groups: groups });
                });
    }

    render() {
        var groups = this.state && API.userData.groups && this.state.groups;

        if (groups) {
            return <div className="group-set">
                {groups.filter(group => !group.default).map(
                    group => <Group key={group.groupId} group={group}/>
                )}
                <button type="button" onClick={App.newGroup.bind(App)}>New list</button>
            </div>
        } else if (this.props.loginStatus === "connected") {
            this.fetchGroups();
            return <div className="group-set"><Spinner/></div>
        }

        return <div className="group-set"/>
    }
};
