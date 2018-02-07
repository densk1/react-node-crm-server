const mongoose = require('mongoose');
const keys = require('../keys.js');

module.exports = () =>{
    mongoose.connect(keys.mongoURI);
}