const mongoose = require('mongoose');
const createModel = mongoose.model.bind(mongoose);
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    // REQUIRED FOR AUTHENTICATION: Do Not Touch
    email: String,
    password: String,
})

const msgSchema = new Schema({
	content: String,
	to: String,
	from: String
})

const listingSchema = new Schema({
	listingId: String,
	title: String,
	thumbnailUrl: String,
	price: String
})

module.exports = {
  User: createModel('User', usersSchema),
  Msg: createModel('Msg', msgSchema)
}
