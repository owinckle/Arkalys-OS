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
		const modal_class	= show ? "modal-right invoice show" : "modal-right invoice";

		const items			= this.state.items;
		let item_list		= [];
		if (items) {
			item_list = items.map((d) =>
				<div key={ d.id } className="table-row">
					<div className="grid-layout item-grid">
						<input
							name="name"
							className="text-field"
							type="text"
							value={ this.state.items[items.findIndex(x => x.id == d.id)].name }
							onChange={ (e) => this.updateItem(e, d.id) }
						/>
						<input
							name="qty"
							className="text-field"
							type="number"
							value={ this.state.items[items.findIndex(x => x.id == d.id)].qty }
							onChange={ (e) => this.updateItem(e, d.id) }
						/>
						<input
							name="price"
							className="text-field"
							type="number"
							value={ this.state.items[items.findIndex(x => x.id == d.id)].price }
							onChange={ (e) => this.updateItem(e, d.id) }
						/>
						<p>{ d.price * d.qty }€</p>
						<span className="material-icons delete-item-icon"
							onClick={ () => this.deleteItem(d.id) }>
							delete
						</span>
					</div>
				</div>
			);
		}

		return(
			<div className={ modal_class }>
				<div className="head">
					<p className="title">Create new invoice</p>
					<span className="material-icons icon"
						onClick={ () => this.props.updateState("newInvoice", false) }>
						close
					</span>
				</div>
				<div className="content">
					<div>
						<h3>Your organization</h3>
						<div className="mb-30">
							<p className="label">Street address</p>
							<input
								name="org_street"
								className="text-field"
								type="text"
								value={ this.state.org_street }
								onChange={ this.changeHandler }
							/>
						</div>
						<div className="flex">
							<div className="mr-10">
								<p className="label">City</p>
								<input
									name="org_city"
									className="text-field"
									type="text"
									value={ this.state.org_city }
									onChange={ this.changeHandler }
								/>
							</div>
							<div className="mr-10">
								<p className="label">Zip Code</p>
								<input
									name="org_zip"
									className="text-field"
									type="text"
									value={ this.state.org_zip }
									onChange={ this.changeHandler }
								/>
							</div>
							<div>
								<p className="label">Country</p>
								<input
									name="org_country"
									className="text-field"
									type="text"
									value={ this.state.org_country }
									onChange={ this.changeHandler }
								/>
							</div>
						</div>

						<div className="mt-50">
							<h3>Client</h3>
							<div className="mb-30">
								<p className="label">Name</p>
								<input
									name="client_name"
									className="text-field"
									type="text"
									value={ this.state.client_name }
									onChange={ this.changeHandler }
								/>
							</div>
							<div className="mb-30">
								<p className="label">Email</p>
								<input
									name="client_email"
									className="text-field"
									type="email"
									value={ this.state.client_email }
									onChange={ this.changeHandler }
								/>
							</div>
							<div className="mb-30">
								<p className="label">Street address</p>
								<input
									name="client_street"
									className="text-field"
									type="text"
									value={ this.state.client_street }
									onChange={ this.changeHandler }
								/>
							</div>
							<div className="flex">
								<div className="mr-10">
									<p className="label">City</p>
									<input
										name="client_city"
										className="text-field"
										type="text"
										value={ this.state.client_city }
										onChange={ this.changeHandler }
									/>
								</div>
								<div className="mr-10">
									<p className="label">Zip Code</p>
									<input
										name="client_zip"
										className="text-field"
										type="text"
										value={ this.state.client_zip }
										onChange={ this.changeHandler }
									/>
								</div>
								<div>
									<p className="label">Country</p>
									<input
										name="client_country"
										className="text-field"
										type="text"
										value={ this.state.client_country }
										onChange={ this.changeHandler }
									/>
								</div>
							</div>
						</div>

						<div className="mt-50">
							<h3>Invoice settings</h3>
							<div className="flex mb-30">
								<div className="mr-10">
									<p className="label">Issue date</p>
									<input
										name="issued"
										className="text-field"
										type="date"
										value={ this.state.issued }
										onChange={ this.changeHandler }
									/>
								</div>
								<div>
									<p className="label">Due date</p>
									<input
										name="due"
										className="text-field"
										type="date"
										value={ this.state.due }
										onChange={ this.changeHandler }
									/>
								</div>
							</div>
							<div className="mb-30">
								<p className="label">Description</p>
								<input
									name="description"
									className="text-field"
									type="text"
									value={ this.state.description }
									onChange={ this.changeHandler }
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="items">
					<div className="grid-layout table-headers">
						<div className="caption">Item</div>
						<div className="caption">Qty</div>
						<div className="caption">Price</div>
						<div className="caption">Total</div>
					</div>
					{ item_list }
					<p className="add-item" onClick={ this.addItem }>+ ADD ITEM</p>
				</div>
				<div className="footer">
					<div className="ArkButton danger"
						onClick={ this.discardInvoice }>
						Discard
					</div>
					<div>
						<div className="ArkButton transparent mr-10"
							onClick={ () => this.createInvoice("draft") }>
							Save draft
						</div>
						<div className="ArkButton"
							onClick={ () => this.createInvoice("invoice") }>
							Create Invoice
						</div>
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