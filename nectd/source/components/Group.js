import React from "react";
import UserBox from "./UserBox";

export default class Group extends React.Component {
    render() {
        var description = this.props.group.description || "List " + this.props.group.groupId;

        return <div className="group" data-group-id={this.props.group.groupId}>
            <button className="group-action fa fa-cog pull-right"></button>
            <div className="group-header">{description}</div>
            {this.props.group.handles.map(
                (user) => <UserBox key={user.handleId} user={user}/>
            )}
        </div>
    }
};
