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

	setContextMenu(e, module) {
		e.preventDefault();
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
		const class_invoicing	= active == "invoicing" ? "link active" : "link";
		const class_calendar	= active == "calendar" ? "link active" : "link";

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
							onContextMenu={ (e) => this.setContextMenu(e, "contacts") }
						>
							<span className="icon material-icons">people</span>
						</Link>
						: null
					}

					{ pins.invoicing || active == "invoicing" ?
						<Link to="/dashboard/invoicing/" className={ class_invoicing }
							onClick={ () => this.togglePage("invoicing") }
							onContextMenu={ (e) => this.setContextMenu(e, "invoicing") }
						>
							<span className="icon material-icons">receipt</span>
						</Link>
						: null
					}

					{ pins.calendar || active == "calendar" ?
						<Link to="/dashboard/calendar/" className={ class_calendar }
							onClick={ () => this.togglePage("calendar") }
							onContextMenu={ (e) => this.setContextMenu(e, "calendar") }
						>
							<span className="icon material-icons">today</span>
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