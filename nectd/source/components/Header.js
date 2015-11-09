import React from "react";
import Logo from "./Logo";
import UserInfo from "./UserInfo";
import LoginBar from "./LoginBar";

export default class Header extends React.Component {
    render() {
        let topRight = {
            "starting": "",
            "connected": <UserInfo status={this.props.status} loginStatus={this.props.loginStatus}/>,
            "not_authorized": <LoginBar status={this.props.status}/>,
            "unknown": <LoginBar status={this.props.status}/>
        }[this.props.loginStatus];

        return <div className="header-top">
            <Logo/>
            {topRight}
        </div>
    }
};
