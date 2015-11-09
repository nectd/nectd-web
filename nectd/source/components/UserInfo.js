import React from "react";
import Avatar from "./Avatar";
import Icon from "./Icon";
import Spinner from "./Spinner";
import API from "../scripts/nectd";

export default class UserInfo extends React.Component {
    fetchProfiles() {
        if (API.loginStatus === "connected")
            API.fetchUserData("profiles")
                .then((info) => {
                    this.setState({ profiles: info });
                });
    }

    render() {
        var profiles = this.state && this.state.profiles || API.userData.profiles;

        if (profiles) {
            return <div className="user-info">
                <Avatar profileId={profiles[0].profileId} />
                <div className="user-name">
                    {`${profiles[0].firstName} ${profiles[0].lastName}`}
                    {this.props.loginStatus === "logout"
                        ? <Spinner/>
                        : <span onClick={API.logout.bind(API)}>
                            <Icon type="sign-out"/>
                        </span>}
                </div>
            </div>
        } else if (this.props.loginStatus === "connected") {
            this.fetchProfiles();
            return <div className="user-info"><Spinner/></div>
        }

        return <div className="user-info"/>
    }
};
