// routes/auth/index.js
const express = require("express");  
const router = express.Router();
const login = require("./routes.js");
const mongoose = require('mongoose');
const User = mongoose.model('user');


module.exports = (passport) => {
	router.post('/login', login.local )
	router.post('/checklogin', passport.authenticate(), login.checkLogin );
	router.post('/logout', login.logout ) 
	router.all('*', (req, res) => { res.status(404) });
	return router;
}