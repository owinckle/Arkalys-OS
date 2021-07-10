import React, { Component } from "react";
import { render } from "react-dom";

import { Link } from "react-router-dom";

export default class Apps extends Component {
	constructor(props) {
		super(props);

		this.state = {
			installed: {
				contacts: false
			}
		}

		this.getApps	= this.getApps.bind(this);
	}

	componentWillMount() {
		this.props.updateState("activeModule", "apps");
		this.getApps();
	}

	getApps() {
		const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": getCookie('csrftoken')
			},
			body: JSON.stringify({
				action: "get"
			})
		}

		fetch("/api/user-settings/apps/get", requestOptions)
			.then((response) => response.json())
			.then((data) =>
				this.setState({
					installed: data.installed
				})
		);
	}

	render() {
		const installed = this.state.installed;

		return(
			<div className="module">
				<div className="grid-layout main-grid">
					<div className="grid-layout stacked">
						<div className="card">
							<div className="head">
								<div className="title">Installed Apps</div>
								<div className="ArkButton">Add app</div>
							</div>
							<div className="grid-layout _4-grid app-grid">
								{ installed["contacts"] ?
									<Link to="/dashboard/contacts/" className="app">
										<span className="material-icons app-icon">people</span>
										<div>
											<p className="app-name">Contacts</p>
											<p className="app-description">Relations</p>
										</div>
									</Link>
									: null
								}

								{ installed["invoicing"] ?
									<Link to="/dashboard/invoicing/" className="app">
										<span className="material-icons app-icon">receipt</span>
										<div>
											<p className="app-name">Invoicing</p>
											<p className="app-description">Management</p>
										</div>
									</Link>
									: null
								}
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

function getCookie(name) {
	var cookieValue = null;
	if (document.cookie && document.cookie !== '') {
		var cookies = document.cookie.split(';');
		for (var i = 0; i < cookies.length; i++) {
			var cookie = jQuery.trim(cookies[i]);
			if (cookie.substring(0, name.length + 1) === (name + '=')) {
				cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
				break;
			}
		}
	}
	return cookieValue;
}