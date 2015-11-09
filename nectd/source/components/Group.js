import React from "react";
import UserBox from "./UserBox";

export default class Group extends React.Component {
    render() {
        return <div className="group" data-group-id={this.props.group.id}>
            <button className="group-action fa fa-cog pull-right"></button>
            <div className="group-header">{this.props.group.title}</div>
            {this.props.group.users.map(
                (user) => <UserBox key={user.id} user={user}/>
            )}
        </div>
    }
};
