// authRoutes.js

const jwt = require("jwt-simple");
const express = require("express");  
const router = express.Router();
const users = require("../users.js");  
const cfg = require("../config.js");
const db = require('../model/mysqlCon');
const checkPass = require('../model/checkPass');

module.exports = (auth) => {

// add authentication
// router.use(authentication())
// https://www.terlici.com/2014/09/29/express-router.html#router-specific-middlewares
	
	router.all("/", function(req, res) {
		res.cookie('cookieName',"cookiedata", {domain:'localhost'});
		res.json({
			status: "My API is alive!"
		});
	});
	router.post('/login', function (req, res) {
		let emailAddress = req.body.emailAddress;
		let password = req.body.password;
		let stayLoggedIn = req.body.stayLoggedIn;
		let query = `
			SELECT 
				PlayerID,
				email,
				password,
				salt
			FROM 
				users 
			WHERE 
				email = ?`;
		let query_params = [ emailAddress ];

		db.query(
			query, 
			query_params, 
			async function(error, result, fields) {
				if(error) {
					console.log(error.message);
					res.status(500).json({result: "Server Error "});
				}
				if ( result.length == 1 ) {
					if ( await checkPass(password, result[0].password, result[0].salt ) ) {

                        let payload = {
                            id: result[0].PlayerID,
                        };
                        res.cookie('cookieName',jwt.encode(payload, cfg.jwtSecret), {domain:'localhost'});
						res.status(200).json({result: "true We win!!!"});
					} 
				}
                // res.cookieRemove();
				res.status(401);
			}
		);
		
		//res.status(200).json({result: 'Login Response'});
	})
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