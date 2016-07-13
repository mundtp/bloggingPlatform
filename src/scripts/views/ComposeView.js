import React from 'react'
import {MsgModel} from '../models/models'

const ComposeView = React.createClass({
	render: function() {
		return (
			<div className="composeView">
				<a href="#home">home</a>
				<ComposeForm />
			</div>
			)
	}
})

const ComposeForm = React.createClass({

	_saveMsg: function(e) {
		var newMsg = new MsgModel({
			to: e.target.to.value,
			from: e.target.from.value,
			content: e.target.content.value
		})
		// makes a post request to the url set as a property on the model. 
		// all of the model's attributes will comprise the body of the request.
		newMsg.save()
	},

	render: function() {
		return (
			<form onSubmit={this._saveMsg}>
				<input name="to" placeholder="to" />
				<input name="from" placeholder="from" />
				<input name="content" placeholder="content" />
				<button type="submit" value="send!">send!</button>
			</form>
			)
	}
})

export default ComposeView