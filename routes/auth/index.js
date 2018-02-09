// routes/auth/index.js
const express = require("express");  
const router = express.Router();
const login = require("./routes.js");

module.exports = (passport) => {

// add authentication
// router.use(authentication())
// https://www.terlici.com/2014/09/29/express-router.html#router-specific-middlewares
	
	router.post("/", function (req, res) {
		res.json({ status: "TEST: My API is alive!" });
	});
	router.post('/checklogin',
		passport.authenticate(),
        (req, res) => {
			return res.status(200).json({result: "logged IN GLOBAL"});
	});
	router.post('/login', login.local )
/*	router.all('*', (req, res) => {
		res.status(404);
	});*/
	return router;
}