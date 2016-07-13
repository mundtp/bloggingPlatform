import React from 'react'
import $ from 'jquery'

var InboxView = React.createClass({

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
			<div class="inboxView">
				<a href="#home">home</a>
				<SearchForm />
				<Inbox coll={this.props.coll} />
			</div>
			)
	}
})

var Inbox = React.createClass({
	_makeMsg: function(record) {
		return <Msg record={record} />
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
		this.props.record.destroy()
		$.ajax({
			type: 'delete',
			url: '/api/messages',
			data: JSON.stringify({_id: 1}),
			dataType: 'json'
		}).then(function(res){console.log(res)})
	},

	render: function() {
		return (
			<div className="msg">
				<p>to: {this.props.record.get('to')}</p>
				<p>from: {this.props.record.get('from')}</p>
				<p>{this.props.record.get('content')}</p>
				<button onClick={this._removeModel} >X</button>
			</div>
			)
	}
})

var SearchForm = React.createClass({
	render: function() {
		return (
			<div class="searchForm">
				<input name="to" placeholder="to"></input>
				<input name="from" placeholder="from"></input>
			</div>
			)
	}
})


export default InboxView