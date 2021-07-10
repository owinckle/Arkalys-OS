import React, { Component } from "react";
import { render } from "react-dom";

import { Link } from "react-router-dom";

import InvoiceModal from "../Modals/InvoiceModal";

export default class Invoicing extends Component {
	constructor(props) {
		super(props);

		this.state = {
			invoices: null,
			newInvoice: false,
		}

		this.getInvoices	= this.getInvoices.bind(this);
		this.updateState	= this.updateState.bind(this);
	}

	componentWillMount() {
		this.props.updateState("activeModule", "invoicing");
		this.getInvoices();
	}

	updateState(target, value) {
		this.setState({
			[target]: value
		});
	}

	getInvoices() {
		const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": getCookie('csrftoken')
			},
			body: JSON.stringify({
				action: "get"
			})
		}

		fetch("/api/invoicing/get", requestOptions)
			.then((response) => response.json())
			.then((data) =>
				this.setState({
					invoices: data.invoices
				})
		);
	}

	render() {
		const invoices	= this.state.invoices;

		let invoice_list = [];
		if (invoices) {
			invoice_list = invoices.map((d) =>
				<div key={ d.uuid } className="table-row hover">
					<div className="grid-layout _6-grid">
						<div>
							<div className="label">No.</div>
							<div className="value">{ d.uuid }</div>
						</div>
						<div>
							<div className="label">Issued</div>
							<div className="value">{ d.issued }</div>
						</div>
						<div>
							<div className="label">Due</div>
							<div className="value">{ d.due }</div>
						</div>
						<div>
							<div className="label">Client</div>
							<div className="value">{ d.client }</div>
						</div>
						<div>
							<div className="label">Amount</div>
							<div className="value">{ d.amount } { d.currency }</div>
						</div>
						<div>
							<div className="label">Status</div>
							{ d.status == "Pending" ?
								<div className="value status pending">{ d.status }</div>
								: null
							}

							{ d.status == "Draft" ?
								<div className="value status draft">{ d.status }</div>
								: null
							}

							{ d.status == "Paid" ?
								<div className="value status paid">{ d.status }</div>
								: null
							}
						</div>
					</div>
				</div>
			);
		}

		return(
			<div className="module invoicing">
				<div className="grid-layout main-grid">
					<div className="grid-layout stacked">
						<div className="card">
							<div className="head">
								<div className="title">Invoices</div>
								<div className="ArkButton"
									onClick={ () => this.updateState("newInvoice", true) }>
									New Invoice
								</div>
							</div>
							<div className="grid-layout table-headers">
								<div className="caption">No.</div>
								<div className="caption">Issued</div>
								<div className="caption">Due</div>
								<div className="caption">Client</div>
								<div className="caption">Amount</div>
								<div className="caption">Status</div>
							</div>
							{ invoice_list }
						</div>
					</div>
				</div>

				<InvoiceModal
					show={ this.state.newInvoice } 
					updateState={ this.updateState }
					reload={ this.getInvoices }
				/>
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