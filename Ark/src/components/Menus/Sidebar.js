import React, { Component } from "react";
import { render } from "react-dom";

import { Link } from "react-router-dom";

export default class Sidebar extends Component {
	constructor(props) {
		super(props);

		this.togglePage		= this.togglePage.bind(this);
		this.setContextMenu	= this.setContextMenu.bind(this);
	}

	togglePage(module) {
		this.props.updateState("activeModule", module);
	}

	setContextMenu(module) {
		this.props.updateState("contextMenuType", "sidebar");
		this.props.updateState("contextData", {
			"module": module,
			"pinned": this.props.pins[module]
		});
	}

	render() {
		const props = this.props;
		const pins	= this.props.pins;

		const active			= this.props.active;
		const class_home		= active == "home" ? "link active" : "link";
		const class_apps		= active == "apps" ? "link active": "link";
		const class_contacts	= active == "contacts" ? "link active" : "link";

		return(
			<div className="main-sidebar">
				<div className="logo">
					<img src="/static/img/logos/arkalys-logo.png" />
				</div>
				<div className="content">
					<Link to="/dashboard/" className={ class_home } onClick={ () => this.togglePage("home") }>
						<span className="icon material-icons">home</span>
					</Link>
					<Link to="/dashboard/apps/" className={ class_apps } onClick={ () => this.togglePage("apps") }>
						<span className="icon material-icons">apps</span>
					</Link>
					{ pins.contacts || active == "contacts" ?
						<Link to="/dashboard/contacts/" className={ class_contacts }
							onClick={ () => this.togglePage("contacts") }
							onContextMenu={ () => this.setContextMenu("contacts") }
						>
							<span className="icon material-icons">people</span>
						</Link>
						: null
					}
				</div>
				<div className="bottom">
					<a className="link" onClick={ () => props.updateState("logged", false) }>
						<span className="icon material-icons">power_settings_new</span>
					</a>
				</div>
			</div>
		)
	}
}