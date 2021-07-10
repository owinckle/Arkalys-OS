import React, { Component } from "react";
import { render } from "react-dom";

export default class InvoiceModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			items: []
		}

		this.addItem	= this.addItem.bind(this);
		this.deleteItem	= this.deleteItem.bind(this);
		this.updateItem	= this.updateItem.bind(this);
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
								className="text-field"
								type="text"
							/>
						</div>
						<div className="flex">
							<div className="mr-10">
								<p className="label">City</p>
								<input
									className="text-field"
									type="text"
								/>
							</div>
							<div className="mr-10">
								<p className="label">Zip Code</p>
								<input
									className="text-field"
									type="text"
								/>
							</div>
							<div>
								<p className="label">Country</p>
								<input
									className="text-field"
									type="text"
								/>
							</div>
						</div>

						<div className="mt-50">
							<h3>Client</h3>
							<div className="mb-30">
								<p className="label">Name</p>
								<input
									className="text-field"
									type="text"
								/>
							</div>
							<div className="mb-30">
								<p className="label">Email</p>
								<input
									className="text-field"
									type="text"
								/>
							</div>
							<div className="mb-30">
								<p className="label">Street address</p>
								<input
									className="text-field"
									type="text"
								/>
							</div>
							<div className="flex">
								<div className="mr-10">
									<p className="label">City</p>
									<input
										className="text-field"
										type="text"
									/>
								</div>
								<div className="mr-10">
									<p className="label">Zip Code</p>
									<input
										className="text-field"
										type="text"
									/>
								</div>
								<div>
									<p className="label">Country</p>
									<input
										className="text-field"
										type="text"
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
										className="text-field"
										type="date"
									/>
								</div>
								<div>
									<p className="label">Due date</p>
									<input
										className="text-field"
										type="date"
									/>
								</div>
							</div>
							<div className="mb-30">
								<p className="label">Description</p>
								<input
									className="text-field"
									type="text"
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
					<div className="ArkButton danger">Discard</div>
					<div>
						<div className="ArkButton transparent mr-10">Save draft</div>
						<div className="ArkButton">Create Invoice</div>
					</div>
				</div>
			</div>
		)
	}
}