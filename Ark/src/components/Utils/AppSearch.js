import React, { Component } from "react";
import { render } from "react-dom";

export default class AppSearch extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
	}

	render() {
		if (this.props.show) {
			return(
				<div className="module">
					<div className="app-search">
						<span className="material-icons search-icon">search</span>
						<input
							autoFocus
							name="search"
							type="text"
							className="text-field"
							placeholder="Search an app"
							autoComplete="off"
							spellCheck="off"
						/>
					</div>
				</div>
			)
		} else return null;
	}
}