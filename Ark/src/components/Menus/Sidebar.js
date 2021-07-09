import React, { Component } from "react";
import { render } from "react-dom";

export default class Sidebar extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const props = this.props;

		return(
			<div className="main-sidebar">
				<div className="logo">
					<img src="/static/img/logos/arkalys-logo.png" />
				</div>
				<div className="content">
					<a className="link active">
						<span class="icon material-icons">home</span>
					</a>
					<a className="link">
						<span class="icon material-icons">home</span>
					</a>
				</div>
				<div className="bottom">
					<a className="link" onClick={ () => props.updateState("logged", false) }>
						<span class="icon material-icons">power_settings_new</span>
					</a>
				</div>
			</div>
		)
	}
}