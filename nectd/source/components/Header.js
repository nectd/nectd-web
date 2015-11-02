import React from "react";
import Logo from "./Logo";
import UserInfo from "./UserInfo";
import LoginBar from "./LoginBar";
import API from "../scripts/nectd";

export default class Header extends React.Component {
    constructor() {
        super();

        this.state = { loginStatus: API.loginStatus };
        API.on("loginStatus", (status) => {
            this.setState({ loginStatus: status });
        })
    }

    render() {
        let topRight = {
            "starting": "",
            "connected": <UserInfo/>,
            "not_authorized": <LoginBar/>,
            "unknown": <LoginBar/>
        }[API.loginStatus];

        return <div className="header-top">
            <Logo />
            {topRight}
        </div>
    }
};
