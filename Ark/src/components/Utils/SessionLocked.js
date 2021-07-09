import React, { Component } from "react";
import { render } from "react-dom";

export default class SessionLocked extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div className="session-locked">
				<div className="connect-modal">
					<img className="avatar" src="/static/img/avatars/default.png" />
					<p className="session-name">Ocean Winckler</p>
					<input
						name="password"
						type="password"
						placeholder="Password"
					/>
				</div>
			</div>
		)
	}
}