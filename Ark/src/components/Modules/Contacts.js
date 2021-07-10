import React, { Component } from "react";
import { render } from "react-dom";

export default class Contacts extends Component {
	constructor(props) {
		super(props);

		this.state = {
			contacts: null
		}

		this.getContacts	= this.getContacts.bind(this);
	}

	componentWillMount() {
		this.props.updateState("activeModule", "contacts");
		this.getContacts();
	}

	getContacts() {
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

		fetch("/api/contacts/get", requestOptions)
			.then((response) => response.json())
			.then((data) =>
				this.setState({
					contacts: data.contacts
				})
		);
	}

	render() {
		const contacts	= this.state.contacts;

		let contact_list = [];
		if (contacts) {
			contact_list = contacts.map((d) =>
				<div key={ d.uuid } className="table-row">
					<div className="grid-layout _6-grid">
						<div>
							<div className="label">Name</div>
							<div className="value">{ d.name }</div>
						</div>
						<div>
							<div className="label">Home email</div>
							<div className="value">{ d.emails.home }</div>
							<div className="label mt-10">Work email</div>
							<div className="value">{ d.emails.work }</div>
						</div>
						<div>
							<div className="label">Home phone number</div>
							<div className="value">{ d.phones.home }</div>
							<div className="label mt-10">Work phone number</div>
							<div className="value">{ d.phones.work }</div>
						</div>
						<div>
							<div className="label">Organization</div>
							<div className="value">{ d.organization }</div>
						</div>
						<div>
							<div className="label">Title</div>
							<div className="value">{ d.title }</div>
						</div>
						<div className="more">
							<div className="flex">
								<div>See more</div>
								<span className="material-icons">keyboard_arrow_down</span>
							</div>
							<span className="material-icons more-icon">more_vert</span>
						</div>
					</div>
				</div>
			);
		}

		return(
			<div className="module contacts">
				<div className="grid-layout main-grid">
					<div className="grid-layout stacked">
						<div className="card">
							<div className="head">
								<div className="title">Address Book</div>
								<div className="ArkButton">Add Contact</div>
							</div>
							<div className="grid-layout table-headers">
								<div className="caption">Name</div>
								<div className="caption">Email</div>
								<div className="caption">Phone Number</div>
								<div className="caption">Organization</div>
								<div className="caption">Title</div>
								<div className="caption">Actions</div>
							</div>
							{ contact_list }
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