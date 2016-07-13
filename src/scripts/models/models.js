import Backbone from 'backbone'
import $ from 'jquery'

export const MsgModel = Backbone.Model.extend({
	url: "/api/messages",
	// warning: behind-the-scenes magic
	// when you sync with the server, read the ._id property
	// off the returned record, and assign it into your .id
	// property
	idAttribute: "_id"
})

export const MsgCollection = Backbone.Collection.extend({
	model: MsgModel,
	url: "/api/messages"
})

export const UserModel = Backbone.Model.extend({
	register: function(email,password) {
		return $.ajax({
			type: 'post',
			url: '/auth/register',
			data: {
				email: email,
				password: password
			}
		}).then((email,password)=>this.login(email,password))
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
		})
	},
	logout: function() {
		return $.getJSON('/auth/logout')
	},
	getCurrentUser: function() {
		return JSON.parse(localStorage[APP_NAME])
	}
})