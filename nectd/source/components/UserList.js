import React from "react";
import UserBox from "./UserBox";

export default class UserList extends React.Component {
    render() {
        return <div className="user-list">{this.props.users.map(
            (user) => <UserBox key={user.id} user={user}/>
        )}</div>
    }
};
