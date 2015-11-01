import React from "react";

export default class Icon extends React.Component {
    render() {
        return <span className={"fa fa-" + this.props.type} data-profile-id={this.props.profileId}/>
    }
};
