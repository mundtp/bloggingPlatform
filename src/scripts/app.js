import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import HomeView from './views/HomeView'
import InboxView from './views/InboxView'
import ComposeView from './views/ComposeView'
import LoginView from './views/LoginView'
import {MsgCollection} from './models/models'

export const APP_NAME = "mongoMessages"

const app = function() {



	const MsgRouter = Backbone.Router.extend({
		routes: {
			"messages/read": "showMsgs",
			"messages/write": "showMsgEditor",
			"home": "showHome",
			"login": "showLogin",
			"*catchall": "redirect"
		},

		redirect: function() {
			location.hash = "home"
		},

		showHome: function() {
			ReactDOM.render(<HomeView />, document.querySelector('.container'))
		},

		showLogin: function() {
			ReactDOM.render(<LoginView />, document.querySelector('.container'))
		},

		showMsgs: function() {
			var coll = new MsgCollection()
			coll.fetch()
			ReactDOM.render(<InboxView coll={coll} />, document.querySelector('.container'))
		},

		showMsgEditor: function() {
			ReactDOM.render(<ComposeView />, document.querySelector('.container'))
		},

		initialize: function() {
			Backbone.history.start()
		}
	})

	new MsgRouter()
}

app()