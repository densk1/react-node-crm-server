// authRoutes.js

const jwt = require("jwt-simple");
const express = require("express");  
const router = express.Router();
const users = require("../users.js");  
const cfg = require("../config.js");
const db = require('../model/mysqlCon');

module.exports = (auth) => {

// add authentication
// router.use(authentication())
// https://www.terlici.com/2014/09/29/express-router.html#router-specific-middlewares
	
	router.all("/", function(req, res) {  
		res.json({
			status: "My API is alive!"
		});
	});

	router.post("/user", auth.authenticate(), async function(req, res) {
		try {
			res.json(await users.getUser(req.user.id));
		} catch (e) {
			res.status(401).json();
		}
	});

	router.post("/token", async function(req, res) {
		let resErrorObj = {error: "Not Authorized" };

		try {
			if (req.body.email && req.body.password) {
				const email = req.body.email;
				const password = req.body.password;
				const user = await users.getID(email, password);

				if (user) {
					var payload = {
						id: user.id,
					};
					var token = jwt.encode(payload, cfg.jwtSecret);
					res.json({
						token: token,
					});
				} else {
					console.log("User Not True")
					res.status(401).json(resErrorObj);
				}
			} else {
				console.log("username + password missing")
				res.status(401).json(resErrorObj);
			}
		} catch (e) {
			console.log("Connection failed ")
			res.status(401).json(resErrorObj);
		}
	});

return router;
}