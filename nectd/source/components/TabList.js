import React from "react";
import Tab from "./Tab";

export default class TabList extends React.Component {
    constructor() {
        super();
        this.state = {
            tabs: [{
                icon: "user"
            }, {
                icon: "users"
            }]
        }
    }
    render() {
        return <div className="tab-list">
            {this.state.tabs.map((tab, i) => <Tab info={tab} key={i}/>)}
        </div>
    }
};
