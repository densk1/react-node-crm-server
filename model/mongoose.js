const mongoose = require('mongoose');
const contactSchema = require('./schema.contact.js');
const commentSchema = require('./schema.comment.js');
const userSchema = require('./schema.user.js');

// Schemas
mongoose.connect(process.env.MONGOURI);

mongoose.model('contacts', contactSchema);
mongoose.model('comments', commentSchema);
mongoose.model('user', userSchema);

module.exports = mongoose;


/*
Next step is to add data to the DB using post.
*/