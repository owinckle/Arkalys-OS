import React, { Component } from "react";
import { render } from "react-dom";

import getCookie from "./components/Utils/Cookies";
import SessionLocked from "./components/Utils/SessionLocked";

import Sidebar from "./components/Menus/Sidebar";

export default class Ark extends Component {
	constructor(props) {
		super(props);

		this.state = {
			logged: true
		}

		this.updateState	= this.updateState.bind(this);
	}

	updateState(target, value) {
		this.setState({
			[target]: value
		});
	}

	render() {
		const logged = this.state.logged;

		if (logged) {
			return(
				<div>
					<Sidebar
						updateState={ this.updateState }
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