import React from 'react'
import ACTIONS from '../actions'

const Header = React.createClass({
	render: function() {
		return (
			<div id="headerContainer">
				<h1>Blogging Platform</h1>

				<div className="topborder">
				</div>

				<NavBar />

				<div className="bottomborder">
				</div>

			</div>
			)
	}
})

const NavBar = React.createClass({
	render: function() {
		return (
			<div id="navBar">
				<a href="#login">Log In</a>
				<a href="#home">Home</a>
				<a href="#messages/read">All Posts</a>
				<a href="#messages/read/myposts">My Posts</a>
				<a href="#messages/write">Compose</a>
				<a href="#" onClick={ACTIONS.logUserOut} >Log Out</a>
			</div>
			)
	}
})

export default Header