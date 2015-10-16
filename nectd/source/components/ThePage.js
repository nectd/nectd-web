import React from "react";
import Header from "./Header";
import ContainerSet from "./ContainerSet";
import UserList from "./UserList";

export default class ThePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            containers: [{
                id: 3209857,
                title: "SuperTeam",
                users: [{
                    username: "Steven",
                    id: 3456
                }, {
                    username: "Tony",
                    id: 1
                }, {
                    username: "Natasha",
                    id: 906090
                }]
            }, {
                id: 96541213,
                title: "Side project",
                users: [{
                    username: "Susan",
                    id: 8765
                }, {
                    username: "Stuart",
                    id: 5678
                }]
            }],
            users: [{
                username: "Kevin",
                id: 1234
            }, {
                username: "Stuart",
                id: 5678
            }, {
                username: "Bob",
                id: 9012
            }],
            userInfo: {
                username: "foobar"
            }
        }
    }

    render() {
        return <div className="full-page-wrapper">
            <Header info={this.state.userInfo}/>
            <ContainerSet containers={this.state.containers}/>
            <UserList users={this.state.users}/>
        </div>
    }
};
