import React from "react";
import UserBox from "./UserBox";

export default class Group extends React.Component {
    render() {
        return <div className="group" data-group-id={this.props.group.groupId}>
            <button className="group-action fa fa-cog pull-right"></button>
            <div className="group-header">List {this.props.group.groupId}</div>
            {this.props.group.handles.map(
                (user) => <UserBox key={user.id} user={user}/>
            )}
        </div>
    }
};
