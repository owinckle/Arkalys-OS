import React, { Component } from "react";
import { render } from "react-dom";

export default class ContextMenu extends Component {
	constructor(props) {
		super(props);

		this.state = {
			xPos: "0px",
			yPos: "0px",
			show: false
		}

		this.handleClick		= this.handleClick.bind(this);
		this.handleContextMenu	= this.handleContextMenu.bind(this);
		this.unpinModule		= this.unpinModule.bind(this);
	}

	componentDidMount() {
		document.addEventListener("click", this.handleClick);
		document.addEventListener("contextmenu", this.handleContextMenu);
	}

	handleClick(e) {
		this.props.updateState("contextMenuType", "default");
		this.setState({
			show: false
		});
	}

	handleContextMenu(e) {
		e.preventDefault();
		this.setState({
			xPos: e.pageX + "px",
			yPos: e.pageY + "px",
			show: true
		});
	}

	unpinModule() {
		const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": getCookie('csrftoken')
			},
			body: JSON.stringify({
				action: "edit",
				module: this.props.data.module
			})
		}

		fetch("/api/user-settings/pins", requestOptions)
			.then((response) => this.props.reload());
	}

	render() {
		const show	= this.state.show;
		const yPos	= this.state.yPos;
		const xPos	= this.state.xPos;
		const type	= this.props.type;
		const data	= this.props.data;

		if (show) {
			return (
				<ul className="context-menu" style={{ top: yPos, left: xPos}}>
					{ type == "default" ?
						<li>
							<div>Copy</div>
							<div>CTRL+C</div>
						</li>
						: null
					}

					{ type == "sidebar" ?
						<li onClick={ this.unpinModule }>{ data.pinned ? "Unpin" : "Pin"} { data.module } to sidebar</li>
						: null
					}
				</ul>
			);
		} else return null;
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