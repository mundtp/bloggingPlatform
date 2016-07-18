import React from 'react'
import Header from './views/header'

const CommentPosted = React.createClass({
	render: function() {
		return (
			<div id="headerContainer">
				

				<Header />
				<p className='commentPosted'> Your Comment Has Been Posted </p>

			
			</div>
			)
	}
})


export default CommentPosted