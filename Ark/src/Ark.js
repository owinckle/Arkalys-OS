import React, { Component } from "react";
import { render } from "react-dom";

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
} from "react-router-dom";

import ContextMenu from "./components/Utils/ContextMenu";
import AppSearch from "./components/Utils/AppSearch";

import Sidebar from "./components/Menus/Sidebar";
import Topbar from "./components/Menus/Topbar";

import Apps from "./components/Modules/Apps";
import Contacts from "./components/Modules/Contacts";
import Invoicing from "./components/Modules/Invoicing";
import Calendar from "./components/Modules/Calendar";

export default class Ark extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeModule: "home",
			pins: {
				contact: false
			},
			contextMenuType: "default",
			contextData: null,
			search: false
		}

		this.updateState	= this.updateState.bind(this);
		this.loadView		= this.loadView.bind(this);
		this.getPins		= this.getPins.bind(this);
		this.searchToggle	= this.searchToggle.bind(this);
		this.shortcutsListener	= this.shortcutsListener.bind(this);
	}

	componentWillMount() {
		document.addEventListener('keydown', this.shortcutsListener);
		this.loadView();
	}

	shortcutsListener(e) {
		if (e.ctrlKey && e.code === "Space") {
			this.searchToggle();
		}

		if (!e.ctrlKey) {
			if (e.code == "Escape") {
				if (this.state.search) {
					this.searchToggle();
				}
			}
		}
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

	searchToggle() {
		this.setState({
			search: this.state.search ? false : true
		});
	}

	render() {
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
						searchToggle={ this.searchToggle }
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

					<Route exact path="/dashboard/invoicing/" render={ (props) =>
						<Invoicing
							updateState={ this.updateState }
						/>}
					/>

					<Route exact path="/dashboard/calendar/" render={ (props) =>
						<Calendar
							updateState={ this.updateState }
						/>}
					/>
				</Router>

				<AppSearch
					show={ this.state.search }
				/>

				<ContextMenu
					type={ this.state.contextMenuType }
					updateState={ this.updateState }
					data={ this.state.contextData }
					reload={ this.loadView }
				/>
			</div>
		)
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