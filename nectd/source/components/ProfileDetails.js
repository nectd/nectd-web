import React from "react";
import Spinner from "./Spinner";
import Detail from "./Detail";
import App from "../nectd-app";
import API from "../scripts/nectd";

export default class ProfileDetails extends React.Component {
    constructor() {
        super();

        this.state = {
            addDetails: false,
            details: API.userData.details
        };
    }

    buildDetailList() {
        if (this.state.details)
            return <div className="detail-list">
                {details.map((detail, i) => {
                    return <Detail data={detail} key={`detail-/${detail.id}`}/>
                })}
            </div>;

        if (API.loginStatus === "connected")
            API.fetchUserData("details")
                .then((info) => {
                    this.setState({ details: info });
                });

        return <Spinner/>
    }

    render() {
        var details = this.state.details || API.userData.details;

        var addForm = this.state.addDetails ? <DetailForm/>
                : <button type="button" class="add-button" onClick={this.setState({ addDetails: true })}/>;

        var list = this.buildDetailList();

        return <div className="overlay-dialog">
            <button type="button" className="dialog-close" onClick={App.showDetails(false)}/>
            <h2 className="dialog-title">Profile details</h2>
            <div className="dialog-body">
                {list}
                {addForm}
            </div>
        </div>
    }
};
