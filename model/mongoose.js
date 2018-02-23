const mongoose = require('mongoose');
const keys = require('../keys.js');
const clientSchema = require('./schema.client.js');
const contactSchema = require('./schema.contact.js');
const commentSchema = require('./schema.comment.js');
const userSchema = require('./schema.user.js');

// Schemas
mongoose.connect(keys.mongoURI);

mongoose.model('clients', clientSchema);
mongoose.model('contacts', contactSchema);
mongoose.model('comment', commentSchema);
mongoose.model('user', userSchema);

module.exports = mongoose;


/*
Next step is to add data to the DB using post.
*/