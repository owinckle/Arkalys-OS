import React, { Component } from "react";
import { render } from "react-dom";

export default class InvoiceView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loaded: false,
			items: [],
			invoice: {
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
			},
			draft: false,
			paid: false
		}

		this.loadInvoice			= this.loadInvoice.bind(this);
		this.close					= this.close.bind(this);
		this.stateSwitch			= this.stateSwitch.bind(this);
	}

	loadInvoice(uuid) {
		const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": getCookie('csrftoken')
			},
			body: JSON.stringify({
				uuid: uuid
			})
		}

		fetch("/api/invoicing/load", requestOptions)
			.then((response) => response.json())
			.then((data) =>
				this.setState({
					loaded: true,
					invoice: data.invoice,
					items: data.items,
					total_price: data.total_price
				})
		);
	}

	close() {
		this.setState({
			loaded: false
		});
		this.props.updateState("viewInvoice", false);
	}

	stateSwitch(switch_name) {
		this.setState({
			[switch_name]: this.state.[switch_name] ? false : true
		});
	}

	render() {
		const show			= this.props.show;
		const modal_class	= show ? "modal invoice thin-scroll show" : "modal invoice thin-scroll";

		if (!this.state.loaded && show) {
			this.loadInvoice(this.props.id);
		}

		const invoice		= this.state.invoice;
		const items			= this.state.items;
		const total_price	= this.state.total_price;
		let item_list	= [];
		if (items) {
			item_list	= items.map((d) =>
				<div key={ d.name } className="grid-layout table-row">
					<div>
						<div className="label">Item</div>
						<div className="value">{ d.name }</div>
					</div>
					<div>
						<div className="label">Qty</div>
						<div className="value">{ d.quantity}</div>
					</div>
					<div>
						<div className="label">Price</div>
						<div className="value">{ d.price  * 1}???</div>
					</div>
					<div>
						<div className="label">Total</div>
						<div className="value">{ d.price * d.quantity }???</div>
					</div>
				</div>
			);
		}

		const draft_class	= this.state.draft ? "checkbox checked" : "checkbox";
		const paid_class	= this.state.paid ? "checkbox checked" : "checkbox";

		return(
			<div className={ modal_class }>
				<div className="head">
					<div>
						<p className="invoice-title">{ invoice.description }</p>
						<p className="invoice-id">#{ this.props.id }</p>
					</div>
					<div className="organization">
						<p className="addr">{ invoice.org_street }</p>
						<p className="addr">{ invoice.org_city }, { invoice.org_country }</p>
						<p className="addr">{ invoice.org_zip }</p>
					</div>
				</div>
				<div className="client">
					<h3>Invoice for</h3>
					<p className="name">{ invoice.client_name }</p>
					<p className="email">{ invoice.client_email }</p>
					<p className="addr">{ invoice.client_street }</p>
					<p className="addr">{ invoice.client_city }, { invoice.client_country }</p>
					<p className="addr">{ invoice.client_zip }</p>
				</div>
				<div className="items">
					<div className="grid-layout table-headers">
						<div className="caption">Item</div>
						<div className="caption">Qty</div>
						<div className="caption">Price</div>
						<div className="caption">Total</div>
					</div>
					
					{ item_list }
				</div>
				<div className="grid-layout infos">
					<div className="notes">{ invoice.notes }</div>
					<div></div>
					<div className="label">Total</div>
					<div className="price">{ total_price }???</div>
				</div>
				<div className="actions">
					<a href={ "/api/invoicing/view-invoice/" + this.props.id } target="_blank">
						<div className="download">
							<span className="material-icons icon">download</span>
							<p>Download Invoice</p>
						</div>
					</a>
					<div className="grid-layout action-buttons">
						<div className="switch-field">
							<div className={ draft_class } onClick={ () => this.stateSwitch("draft") }></div>
							<span className="checkbox-label">Draft</span>
						</div>
						<div className="switch-field">
							<div className={ paid_class } onClick={ () => this.stateSwitch("paid") }></div>
							<span className="checkbox-label">Paid</span>
						</div>
						<div className="ArkButton danger center"
							onClick={ this.close }>
							Close
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