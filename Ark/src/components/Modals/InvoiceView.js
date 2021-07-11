import React, { Component } from "react";
import { render } from "react-dom";

export default class InvoiceView extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div className="modal invoice">
				<div className="head">
					<div>
						<p className="invoice-id">#424ZDZ</p>
						<p className="Invoice-title">Test Invoice</p>
					</div>
					<div className="organization">
						<p className="addr-1">77 rue de Rome</p>
						<p className="addr-2">Paris, France</p>
						<p className="addr-3">75017</p>
					</div>
				</div>
				<div className="client">
					<h3>Invoice for</h3>
					<p className="name">Winnie Pooh</p>
					<p className="addr-1"></p>
				</div>
				<div className="items">
					
				</div>
			</div>
		)
	}
}