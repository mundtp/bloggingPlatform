import React from 'react'
import Header from './header'
import {User}  from '../models/models'

var Dashboard = React.createClass({
	_message: function() {
				if (!User.getCurrentUser()) {
					return "You are not logged in. Please go to the 'Log In' screen to register or log in."
				}
		},
	_welcome: function() {
				if (User.getCurrentUser()) {
					return "Welcome to the Blogging Platform"
				}
		},
	render: function() {
		console.log(User)
		return (
			<div className="homeView">
				<Header />
				<p className="welcome">{this._welcome()}</p>
				<p className="message">{this._message()}</p>
			</div>
		)
	}

})

export default Dashboard