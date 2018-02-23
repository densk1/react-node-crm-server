


const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	firstName: String,
	secondName: String,
	email: String,
	passwordHash: String,
	passwordSalt: String,
	admin: Boolean,
	lastLogin: Date,
});

module.exports = userSchema;