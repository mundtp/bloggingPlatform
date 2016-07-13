import Backbone from 'backbone'

export const MsgModel = Backbone.Model.extend({
	url: "/api/messages"
})

export const MsgCollection = Backbone.Collection.extend({
	model: MsgModel,
	url: "/api/messages"
})

