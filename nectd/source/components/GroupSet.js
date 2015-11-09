import React from "react";
import Group from "./Group";
import Spinner from "./Spinner";
import API from "../scripts/nectd";

export default class GroupSet extends React.Component {
    fetchGroups() {
        if (this.props.loginStatus === "connected")
            API.fetchUserData("groups")
                .then((groups) => {
                    this.setState({ groups: groups });
                });
    }

    render() {
        var groups = this.state && this.state.groups || API.userData.groups;

        if (groups) {
            return <div className="group-set">
                {groups.map(
                    (group) => <Group key={group.groupId} group={group}/>
                )}
                <button type="button">New list</button>
            </div>
        } else if (this.props.loginStatus === "connected") {
            this.fetchGroups();
            return <div className="group-set"><Spinner/></div>
        }

        return <div className="group-set"/>
    }
};
