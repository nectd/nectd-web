import React from "react";
import Header from "./Header";
import TabList from "./TabList";

export default class ThePage extends React.Component {
    render() {
        return <div className="full-page-wrapper">
            <Header/>
            <TabList/>
        </div>
    }
};
