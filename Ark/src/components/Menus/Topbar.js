import React, { Component } from "react";
import { render } from "react-dom";

export default class Topbar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			fullscreen: false
		}

		this.toggleFullscreen	= this.toggleFullscreen.bind(this);
	}

	toggleFullscreen() {
		if (document.fullscreenElement) {
			document.exitFullscreen();
		} else {
			document.documentElement.requestFullscreen();
		}
		this.setState({
			fullscreen: this.state.fullscreen ? false : true
		});
	}

	render() {
		const props = this.props;
		const fullscreenIcon = this.state.fullscreen ? "fullscreen_exit" : "fullscreen";

		return(
			<div className="main-topbar">
				<h2 className="title">{ props.title }</h2>
				<div>
					<span className="action-icon material-icons" onClick={ this.props.searchToggle }>search</span>
					<span className="action-icon material-icons">notifications</span>
					<span className="action-icon material-icons" onClick={ this.toggleFullscreen }>{ fullscreenIcon }</span>
					<span className="action-icon material-icons">settings</span>
				</div>
			</div>
		)
	}
}