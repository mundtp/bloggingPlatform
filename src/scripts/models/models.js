import Backbone from 'backbone'
import $ from 'jquery'
import {APP_NAME} from '../app'

const MsgModel = Backbone.Model.extend({
	url: "/api/messages",
	// warning: behind-the-scenes magic
	// when you sync with the server, read the ._id property
	// off the returned record, and assign it into your .id
	// property
	idAttribute: "_id"
})

const MsgCollection = Backbone.Collection.extend({
	model: MsgModel,
	url: "/api/myMessages"
})

const User = {
	register: function(email,password) {
		return $.ajax({
			type: 'post',
			url: '/auth/register',
			data: {
				email: email,
				password: password
			}
		})
	},

	login: function(email,password) {
		return $.ajax({
			type: 'post',
			url: '/auth/login',
			data: {
				email: email,
				password: password
			}
		}).then((userData) => {
			localStorage[APP_NAME] = JSON.stringify(userData)
			return userData
		})
	},

	logout: function() {
		return $.getJSON('/auth/logout').then(()=>{
			localStorage[APP_NAME] = null
		})
	},

	getCurrentUser: function() {
		return localStorage[APP_NAME] ? JSON.parse(localStorage[APP_NAME]) : null
	}
}

export {User,MsgModel,MsgCollection}