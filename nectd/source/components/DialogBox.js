import React from "react";

export default class DialogBox extends React.Component {
    closeClick() {
        if (typeof this.props.onClose === "function")
            this.props.onClose();
    }

    render() {
        var title = this.props.dialogTitle
                ? <div className="dialog-title">{this.props.dialogTitle}</div> : "",
            closeBtn = this.props.noClose ? ""
                : <button type="button" className="dialog-close fa fa-times" onClick={this.closeClick.bind(this)}/>;

        return <div className="dialog-backdrop">
            <div className="dialog-box">
                {closeBtn}
                {title}
                {this.props.children}
            </div>
        </div>
    }
};
