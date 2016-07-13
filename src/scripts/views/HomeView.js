import React from 'react'

var HomeView = React.createClass({
	render: function() {
		return (

			<div class="homeView">
				<a href='#messages/read'>view inbox</a>
				<a href='#messages/write'>compose message</a>
			</div>
			)
	}
})

export default HomeView