// routes/auth/index.js
const express = require("express");  
const router = express.Router();
const account = require("./routes.js");

module.exports = (passport) => {
    router.use(passport.authenticate());

	router.post("/adduser", account.adduser);
	router.post("/users", account.getUsers);
	router.post("/users/update",  account.updateUser);
	router.post("/users/delete",  account.deleteUser);
	router.post("/update/password",  account.updatePassword);
    
	router.all('*', (req, res) => {
		res.status(404);
	});
	return router;
}