const mongoose = require('mongoose');
const { Schema } = mongoose;

const clientSchema = new Schema({
    ownerID: Number,
    name: String,
    role: String,
    company: String,
    email: String,
});

module.exports = clientSchema;