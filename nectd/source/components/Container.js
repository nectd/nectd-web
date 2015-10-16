import React from "react";
import UserBox from "./UserBox";

export default class Container extends React.Component {
    render() {
        return <div className="container" data-container-id={this.props.container.id}>
            <button className="container-action fa fa-cog pull-right"></button>
            <div className="container-header">{this.props.container.title}</div>
            {this.props.container.users.map(
                (user) => <UserBox key={user.id} user={user}/>
            )}
        </div>
    }
};
