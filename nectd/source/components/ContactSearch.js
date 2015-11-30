import React from "react";
import Spinner from "./Spinner";
import Icon from "./Icon";
import API from "../scripts/nectd";

export default class ContactSearch extends React.Component {
    constructor(props) {
        super(props);

        this.state = { results: [], loading: null };
        this.searchDelay = props.searchDelay || 500;
    }

    updateSearch(e) {
        var text = e.target.value;
        if (text.length < 3) return;

        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(() => {
            this.setState({
                loading: API.post("graph/public/search", [ text ])
                    .then((results) => {
                        this.setState({
                            loading: null,
                            results: results.filter(result => result.content.length)
                        });
                    })
            });
        }, this.searchDelay);
    }

    clickedContact(contact) {
        if (typeof this.props.onContactClick === "function")
            this.props.onContactClick(contact);
    }

    render() {
        var theList = this.state.loading ? <div><Spinner/></div>
            : <ul className="contact-search-results">
                {this.state.results.map(
                    (result, index) => <li key={index} onClick={() => this.clickedContact(result)}>
                        {result.content[0].firstName}
                        {result.content[0].lastName}
                        @{result.content[0].handles[0].handle}
                    </li>
                )}
            </ul>;

        return <div className="contact-search">
            <label className="contact-search-input">
                <Icon type="search"/>
                <input type="search" onInput={(e) => this.updateSearch(e)}/>
            </label>
            {theList}
        </div>
    }
};
