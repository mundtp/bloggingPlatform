import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import Dashboard from './views/HomeView'
import InboxView from './views/InboxView'
import AllView from './views/AllView'
import ComposeView from './views/ComposeView'
import LoginView from './views/LoginView'
import {MsgCollection} from './models/models'
import {MyMsgCollection} from './models/models'
import {User}  from './models/models'
import CommentPosted from './CommentPosted'

export const APP_NAME = "bloggingPlatform"

const app = function() {



	const MsgRouter = Backbone.Router.extend({
		routes: {
			"messages/read/myposts": "showMyMsgs",
			"messages/read": "showMsgs",
			"messages/write": "showMsgEditor",
			"home": "showHome",
			"login": "showLogin",
			"commentPosted":"commentPosted",
			"*catchall": "redirect"
		},

		commentPosted: function(){
			ReactDOM.render(<CommentPosted />, document.querySelector('.container'))
		},

		redirect: function() {
			location.hash = "home"
		},

		showHome: function() {
			ReactDOM.render(<Dashboard />, document.querySelector('.container'))
		},

		showLogin: function() {
			ReactDOM.render(<LoginView />, document.querySelector('.container'))
		},

		showMyMsgs: function() {
			var coll = new MyMsgCollection()
			coll.fetch().fail(function(err){
				console.log(err)
			})
			ReactDOM.render(<InboxView coll={coll} />, document.querySelector('.container'))
		},

		showMsgs: function() {
			var coll = new MsgCollection()
			coll.fetch().fail(function(err){
				console.log(err)
			})
			ReactDOM.render(<AllView coll={coll} />, document.querySelector('.container'))
		},

		showMsgEditor: function() {
			ReactDOM.render(<ComposeView />, document.querySelector('.container'))
		},

		initialize: function() {
			// this.on("route",()=> {
			// 	if (!User.getCurrentUser()) {
			// 		location.hash = "login"
			// 	}
			// })
			Backbone.history.start()
		}
	})

	new MsgRouter()
}

app()