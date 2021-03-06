import React, { Component } from "react";
import { render } from "react-dom";

import moment from "moment";

import CalendarEventCreate from "../modals/CalendarEventCreate";

export default class Calendar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			dateObject: moment(),
			month: 0,
			newEvent: false
		}

		this.getEvents			= this.getEvents.bind(this);
		this.getEventByDate		= this.getEventByDate.bind(this);
		this.updateState		= this.updateState.bind(this);
		this.mapCalendar		= this.mapCalendar.bind(this);
		this.setMonth			= this.setMonth.bind(this);
	}

	componentWillMount() {
		this.props.updateState("activeModule", "calendar");
		this.getEvents();

		let dateObject	= this.state.dateObject;
		const date		= moment(dateObject);

		const month		= date.format("M");
		const day		= date.format("D");
		const year		= date.format("Y");
		let newDateObj	= Object.assign({}, this.state.dateObject);
		newDateObj 		= moment(newDateObj);
		newDateObj.set("month", month - 1);
		newDateObj.set("date", day);

		this.getEventByDate(day, month, year);

		this.setState({
			dateObject: newDateObj,
			month: month,
			year: year,
			originalMonth: month,
			originalYear: year
		});
	}

	getEvents() {
		const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": getCookie('csrftoken')
			}
		}

		fetch("/api/calendar/get", requestOptions)
			.then((response) => response.json())
			.then((data) =>
				this.setState({
					events: data.events
				})
		);
	}

	getEventByDate(day, month, year) {
		const date = moment({
			day: day,
			month: month,
			year: year
		})

		const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": getCookie('csrftoken')
			},
			body: JSON.stringify({
				date: date.toDate().getTime() / 1000
			})
		}

		fetch("/api/calendar/get/by-date", requestOptions)
			.then((response) => response.json())
			.then((data) =>
				this.setState({
					searched_events: data.events
				})
		);
	}


	updateState(target, value) {
		this.setState({
			[target]: value
		});
	}

	mapCalendar() {
		const date		= this.state.dateObject;
		let firstDay	= moment(date).startOf("month").format("d");
		let last_month	= [];
		for (let i = 1; i < firstDay; i++) {
			last_month.push(
				<div key={ i } className="outer">{ i }</div>
			);
		}

		let current_month	= [];
		for (let i = 1; i <= moment(date).daysInMonth(); i++) {
			let currentDay = i == moment(date).format("D") ? "today" : "";
			if (this.state.month != this.state.originalMonth || this.state.year != this.state.originalYear) {
				currentDay = "";
			}
			current_month.push(
				<div key={ i } className={ currentDay }>{ i }</div>
			);
		}

		let days_to_fill = 35 - (last_month.length + current_month.length);
		if (days_to_fill <  0) {
			days_to_fill = 42 - (last_month.length + current_month.length);
		}

		if (days_to_fill != 0 ) {
			days_to_fill++;
		}

		let next_month	= [];
		for (let i =  1; i < days_to_fill; i++) {
			next_month.push(
				<div key={ i } className="outer">{ i }</div>
			);
		}

		return ({
			month: moment(date).format("MMMM"),
			year: moment(date).format("Y"),
			last_month: last_month,
			current_month: current_month,
			next_month: next_month
		});
	}

	setMonth(month) {
		let year = this.state.year;
		if (month == 13) {
			month = 1;
			year = parseInt(year)+ 1;
		} else if (month == 0) {
			month = 12;
			year = parseInt(year)- 1;
		}

		let newDateObj	= Object.assign({}, this.state.dateObject);
		newDateObj 		= moment(newDateObj);
		newDateObj.set("month", month - 1);

		if (year != this.state.year) {
			newDateObj.set("year", year);
		}

		this.setState({
			dateObject: newDateObj,
			month: month,
			year: year
		});
	}

	render() {
		const calendarMap	= this.mapCalendar();
		const events		= this.state.events;
		const searched_events	= this.state.searched_events;

		let event_list = [];
		if (events) {
			event_list = events.map((d) =>
				<div key={ d.uuid } className="grid-layout event">
					<div className="user">
						<img className="avatar" src="https://i.gyazo.com/baaffd0f3dafe80368449b91a4ae6327.jpg" />
						<div>
							<p className="name">{ d.with }</p>
							<p className="email">email@domain.com</p>
						</div>
					</div>
					<div className="label">{ d.title }</div>
					<div className="time">{ d.time }</div>
					<div className="date">{ d.date }</div>
					<span className="material-icons more">more_horiz</span>
				</div>
			);
		}

		let searched_events_list = [];
		if (searched_events) {
			searched_events_list = searched_events.map((d) =>
				<div key={ d.uuid } className="grid-layout event">
					<div className="user">
						<img className="avatar" src="https://i.gyazo.com/baaffd0f3dafe80368449b91a4ae6327.jpg" />
						<div>
							<p className="name">Somebody</p>
						</div>
					</div>
					<div className="label">{ d.title }</div>
					<div className="time">{ d.time }</div>
					<span className="material-icons more">more_vert</span>
				</div>
			);
		}

		return(
			<div className="module calendar">
				<div className="grid-layout _2-1-grid">
					<div className="card calendar-grid">
						<div className="head">
							<span className="material-icons arrows" onClick={ () => this.setMonth(parseInt(this.state.month) - 1) }>chevron_left</span>
							<p>{ calendarMap.month } { calendarMap.year }</p>
							<span className="material-icons arrows" onClick={ () => this.setMonth(parseInt(this.state.month) + 1) }>chevron_right</span>
						</div>
						<div className="days-head grid-layout _7-grid">
							<div>Mon</div>
							<div>Tue</div>
							<div>Wed</div>
							<div>Thu</div>
							<div>Fri</div>
							<div>Sat</div>
							<div>Sun</div>
						</div>
						<div className="days grid-layout _7-grid">
							{ calendarMap.last_month }
							{ calendarMap.current_month }
							{ calendarMap.next_month }
						</div>
					</div>
					<div className="card insight">
						<div className="head">
							<p>Today</p>
							<span
								className="material-icons add-event-btn"
								onClick={ () => this.updateState("newEvent", true) }>
								add
							</span>
						</div>
						{ searched_events_list }
					</div>
				</div>
				<div className="card events">
					{ event_list }
				</div>
				<CalendarEventCreate
					show={ this.state.newEvent }
					updateState={ this.updateState }
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