import React, { Component } from "react";
import { render } from "react-dom";

export default class CalendarEventCreate extends Component {
	constructor(props) {
		super(props);

		this.state = {
		}

		this.changeHandler	= this.changeHandler.bind(this);
	}

	changeHandler(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	render() {
		const show			= this.props.show;
		const modal_class	= show ? "modal calendar show" : "modal calendar";

		return(
			<div className={ modal_class }>
				<div className="head">
					<p className="title">Create new invoice</p>
					<span className="material-icons icon"
						onClick={ () => this.props.updateState("newEvent", false) }>
						close
					</span>
				</div>
				<div className="content">
					<input
						name="title"
						type="text"
						placeholder="Title"
						className="text-field slim"
						spellCheck="off"
						autoComplete="off"
					/>
					<div className="color-picker">
						<div className="label">Color</div>
						<div className="color"></div>
						<div className="color selected"></div>
						<div className="color"></div>
						<div className="color"></div>
						<div className="color"></div>
						<div className="color"></div>
					</div>

					<div className="date">
						<div className="label">Date</div>
						<input
							name="date"
							type="date"
							placeholder="Title"
							className="text-field slim"
							spellCheck="off"
							autoComplete="off"
						/>
						<div className="time grid-layout">
							<select
								name="start-time"
								className="select-field"
							>
								<option>18:00</option>
								<option>19:00</option>
								<option>20:00</option>
							</select>
							<select
								name="end-time"
								className="select-field"
							>
								<option>18:00</option>
								<option>19:00</option>
								<option>20:00</option>
							</select>
						</div>
					</div>
				</div>
				<div className="footer">
					<div className="ArkButton danger"
					onClick={ () => this.props.updateState("newEvent", false) }>
						Cancel
					</div>
					<div className="ArkButton">
						Create
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