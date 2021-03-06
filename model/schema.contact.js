const mongoose = require('mongoose');
const { Schema } = mongoose;

const contactSchema = new Schema({
	firstName: String,
	secondName: String,
	email: String,
	organisation: String,
	status: String,
	role: String,
	office: String,
	extension: String,
	direct: String,
	mobile: String,
	address1: String,
	address2: String,
	city: String,
	postcode: String,
	country: String,
	//comments: [String],
});

module.exports = contactSchema;