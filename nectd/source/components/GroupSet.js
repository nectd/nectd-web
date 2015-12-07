import React from "react";
import Group from "./Group";
import Spinner from "./Spinner";
import App from "../nectd-app";

export default class GroupSet extends React.Component {
    render() {
        var groups = null;
        if (this.props.groups)
            groups = this.props.groups.filter(group => !group.default);

        if (groups) {
            return <div className="group-set">
                {groups.filter(group => !group.default).map(
                    group => <Group key={group.groupId} group={group} contacts={this.props.groupContacts[group.nodeId]}/>
                )}
                <button type="button" onClick={App.newGroup.bind(App)}>New list</button>
            </div>
        // } else if (this.props.loginStatus === "connected") {
        //     return <div className="group-set"><Spinner/></div>
        }

        return <div className="group-set"/>
    }
};
