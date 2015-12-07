import React from "react";
import Header from "./Header";
import TabList from "./TabList";
import GroupSet from "./GroupSet";
import ContactList from "./ContactList";
import ProfileDetails from "./ProfileDetails";
import API from "../scripts/nectd";

export default class ThePage extends React.Component {
    render() {
        return <div className="full-page-wrapper">
            <Header {...this.props}/>
            <TabList {...this.props}/>
            <ContactList {...this.props}/>
            <GroupSet {...this.props}/>
            {this.props.children}
        </div>
    }
};
