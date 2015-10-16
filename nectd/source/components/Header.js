import React from "react";
import Logo from "./Logo";
import UserInfo from "./UserInfo";

export default class Header extends React.Component {
    render() {
        return <div className="header-top">
            <Logo />
            <UserInfo info={this.props.info}/>
        </div>
    }
};
