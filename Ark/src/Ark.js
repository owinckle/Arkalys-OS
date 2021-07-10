import React, { Component } from "react";
import { render } from "react-dom";

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
} from "react-router-dom";

import SessionLocked from "./components/Utils/SessionLocked";
import ContextMenu from "./components/Utils/ContextMenu";

import Sidebar from "./components/Menus/Sidebar";
import Topbar from "./components/Menus/Topbar";

import Apps from "./components/Modules/Apps";
import Contacts from "./components/Modules/Contacts";

export default class Ark extends Component {
	constructor(props) {
		super(props);

		this.state = {
			logged: true,
			activeModule: "home",
			pins: {
				contact: false
			},
			contextMenuType: "default",
			contextData: null
		}

		this.updateState	= this.updateState.bind(this);
		this.loadView		= this.loadView.bind(this);
		this.getPins		= this.getPins.bind(this);
	}

	componentWillMount() {
		this.loadView();
	}

	updateState(target, value) {
		this.setState({
			[target]: value
		});
	}

	loadView() {
		this.getPins();
	}

	getPins() {
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

		fetch("/api/user-settings/pins", requestOptions)
			.then((response) => response.json())
			.then((data) =>
				this.setState({
					pins: data.pins
				})
		);
	}

	render() {
		const logged = this.state.logged;

		if (logged) {
			return(
				<div>
					<Router>
						<Sidebar
							updateState={ this.updateState }
							active={ this.state.activeModule }
							pins={ this.state.pins }
							setContextMenu={ this.setContextMenu }
						/>
						<Topbar
							title={ this.state.activeModule }
						/>
						<Route exact path="/dashboard/" render={ (props) =>
							null}
						/>

						<Route exact path="/dashboard/apps/" render={ (props) =>
							<Apps
								updateState={ this.updateState }
							/>}
						/>

						<Route exact path="/dashboard/contacts/" render={ (props) =>
							<Contacts
								updateState={ this.updateState }
							/>}
						/>
					</Router>

					<ContextMenu
						type={ this.state.contextMenuType }
						updateState={ this.updateState }
						data={ this.state.contextData }
						reload={ this.loadView }
					/>
				</div>
			)
		}

		else {
			return(
				<SessionLocked />
			)
		}
	}
}

render(<Ark />, document.getElementById("app"));

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