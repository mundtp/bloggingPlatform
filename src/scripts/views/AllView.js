import React from 'react'
import $ from 'jquery'
import {MsgModel} from '../models/models'
import {User} from '../models/models'
import Header from './header'
import Backbone from 'backbone'

var AllView = React.createClass({

	getInitialState: function() {
		return {
			coll: this.props.coll
		}
	},

	componentWillMount: function() {
		this.state.coll.on('sync update',()=>{
			this.setState({
				coll: this.state.coll
			})
		})
	},

	render: function() {
		return (
			<div className="inboxView">
				<Header />
				<Inbox coll={this.props.coll} />
			</div>
			)
	}
})

var Inbox = React.createClass({
	_makeMsg: function(record) {
		return <Msg key={record.id} record={record} />
	},

	render: function() {
		return (
			<div className="inbox">
				{this.props.coll.map(this._makeMsg)}
			</div>
			)
	}
})

var Msg = React.createClass({

	_removeModel: function() {
		this.props.record.destroy({
			url: `/api/messages/${this.props.record.id}`		
		})
	},

	_handleKD: function(e) {
		if(e.keyCode === 13){
			var content = this.props.record.attributes.content 
			var fro = this.props.record.attributes.from
			var co = this.props.record.attributes.comments
			var newco = co + '\n' + e.target.value
			this._removeModel()
			var newMsg = new MsgModel({
			from: fro,
			content: content,
			comments: newco
			})
			newMsg.save()
			location.hash = "commentPosted"
		}
	},

	_makeComment: function(record) {
		return <p key={record}>{record}</p>
	},


	_makeArray: function(){
		var commentArray = this.props.record.get('comments').split('\n')
		return commentArray.map(this._makeComment)
	},

	render: function() {

		return (
			<div className="msg">
				<div className="msgDeets">
					<p>Author: {this.props.record.get('from')}</p>
					<p id='content'>{this.props.record.get('content')}</p>
					<p>Comments: </p>
					{this._makeArray()}
				</div>
				<input className='commentInput' onKeyDown={this._handleKD} type="text" placeholder="Add a comment..." />
				<div>
				<button onClick={this._removeModel}>Delete Post</button>
				</div>
			</div>
			)
	}
})

var SearchForm = React.createClass({
	render: function() {
		return (
			<div className="searchForm">
				<input name="to" placeholder="to"></input>
				<input name="from" placeholder="from"></input>
			</div>
			)
	}
})


export default AllView