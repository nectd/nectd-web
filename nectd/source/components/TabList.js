import React from "react";
import Tab from "./Tab";

export default class TabList extends React.Component {
    render() {
        var tabs = this.props.loginStatus === "connected"
            ? [ { icon: "user" }, { icon: "users" } ]
            : [];

        return <div className="tab-list">
            {tabs.map((tab, i) => <Tab info={tab} key={i}/>)}
        </div>
    }
};
