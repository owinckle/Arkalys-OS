import React, { Component } from "react";
import { render } from "react-dom";

export default class InvoiceModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			items: [],
			org_street: "",
			org_city: "",
			org_zip: "",
			org_country: "",
			client_name: "",
			client_email: "",
			client_street: "",
			client_city: "",
			client_zip: "",
			client_country: "",
			issued: "",
			due: "",
			description: ""
		}

		this.addItem		= this.addItem.bind(this);
		this.deleteItem		= this.deleteItem.bind(this);
		this.updateItem		= this.updateItem.bind(this);
		this.changeHandler	= this.changeHandler.bind(this);
		this.discardInvoice	= this.discardInvoice.bind(this);
		this.createInvoice	= this.createInvoice.bind(this);
	}

	addItem() {
		let items		= this.state.items;
		const newItem	= {
			id: Math.random().toString(36).substr(2, 9),
			name: "",
			qty: 1,
			price: 0
		}

		items.push(newItem);

		this.setState({
			items: items
		});
	}

	deleteItem(id) {
		const items	= this.state.items;
		const index = items.findIndex(x => x.id == id)
		items.splice(index, 1);

		this.setState({
			items: items
		});
	}

	updateItem(e, id) {
		const items	= this.state.items;
		const index = items.findIndex(x => x.id == id)
		items[index].[e.target.name] = e.target.value;

		this.setState({
			items: items
		});
	}

	changeHandler(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	discardInvoice() {
		this.props.updateState("newInvoice", false);
		this.setState({
			items: [],
			org_street: "",
			org_city: "",
			org_zip: "",
			org_country: "",
			client_name: "",
			client_email: "",
			client_street: "",
			client_city: "",
			client_zip: "",
			client_country: "",
			issued: "",
			due: "",
			description: ""
		});
	}

	createInvoice(type) {
		const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": getCookie('csrftoken')
			},
			body: JSON.stringify({
				type: type,
				items: this.state.items,
				org_street: this.state.org_street,
				org_city: this.state.org_city,
				org_zip: this.state.org_zip,
				org_country: this.state.org_country,
				client_name: this.state.client_name,
				client_email: this.state.client_email,
				client_street: this.state.client_street,
				client_city: this.state.client_city,
				client_zip: this.state.client_zip,
				client_country: this.state.client_country,
				issued: this.state.issued,
				due: this.state.due,
				description:this.state.description
			})
		}

		fetch("/api/invoicing/create", requestOptions)
			.then((response) => {
				this.discardInvoice();
				this.props.reload();
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