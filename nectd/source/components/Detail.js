import React from "react";
import Spinner from "./Spinner";
import Icon from "./Icon";
import API from "../scripts/nectd";

function getDetailData(detail) {
    switch (detail.category) {
        case "EmailDetail":
            return {
                icon: "envelope",
                value: detail.email,
                link: `mailto:${detail.email}`
            };
        case "AddressDetail": return "";
            return {
                icon: "location-arrow",
                value: `${detail.street}, ${detail.n}, ${detail.city} ${detail.zipCode}, ${detail.country}`
            };
        case "SocialDetail":
            return {
                icon: detail.type,
                value: detail.email,
                link: `https://social.com/${detail.email}`
            };
    }

    return {
        icon: "star",
        value: ""
    };
}

export default class Detail extends React.Component {
    constructor() {
        super();

        this.state = { deleting: false };
    }

    deleteDetail() {
        API.delete(`account/details/${this.props.data.detailId}`)
            .then(() => {
                this.setState({ deleting: false });
            });

        this.setState({ deleting: true });
    }

    render() {
        if (this.state.deleting)
            return <div className="detail-row"><Spinner/></div>;

        var data = getDetailData(this.props.data);

        return <div className="detail-row">
            <Icon type={data.icon}/> {data.value}
            <button type="button" className="delete-button" onClick={this.deleteDetail()}/>
        </div>
    }
};
