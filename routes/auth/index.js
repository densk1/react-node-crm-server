// routes/auth/index.js
const express = require("express");  
const router = express.Router();
const login = require("./routes.js");

module.exports = (auth) => {

// add authentication
// router.use(authentication())
// https://www.terlici.com/2014/09/29/express-router.html#router-specific-middlewares
	
	router.all("/", function(req, res) {
		res.cookie('cookieName', "cookiedata", {domain:'localhost'} );
		res.json({ status: "TEST: My API is alive!" });
	});
	router.all('/checklogin',
		auth.authenticate(),
		function (req, res) {
			return res.status(200).json({result: "logged IN GLOBAL"});
	});
	router.post('/login', login.local )

	return router;
}