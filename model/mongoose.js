const mongoose = require('mongoose');
const keys = require('../keys.js');
const clientSchema = require('./schema.client.js');

// Schemas
mongoose.connect(keys.mongoURI);

mongoose.model('clients', clientSchema);

module.exports = mongoose;


/*
Next step is to add data to the DB using post.
*/