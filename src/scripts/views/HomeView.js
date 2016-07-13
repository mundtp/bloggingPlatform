import React from 'react'
import Header from './header'

var HomeView = React.createClass({
	render: function() {
		return (
			<div className="homeView">
				<Header />
				<a href='#messages/read'>view inbox</a>
				<a href='#messages/write'>compose message</a>
			</div>
			)
	}
})

export default HomeView