import React from "react";
import Icon from "./Icon";

export default class Tab extends React.Component {
    render() {
        return <div className="main-tab">
            <Icon type={this.props.info.icon}/>
        </div>
    }
};
