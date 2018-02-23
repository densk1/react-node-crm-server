// routes/auth/index.js
const express = require("express");  
const router = express.Router();
const account = require("./routes.js");

module.exports = (passport) => {

// add authentication
// router.use(authentication())
// https://www.terlici.com/2014/09/29/express-router.html#router-specific-middlewares
	
	router.post("/adduser", account.adduser);
	
	
    
    
/*	router.all('*', (req, res) => {
		res.status(404);
	});*/
	return router;
}