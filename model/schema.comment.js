const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
    clientID: String,
    comment: String,
    added: Date,
	addedBy: String
});

module.exports = commentSchema;