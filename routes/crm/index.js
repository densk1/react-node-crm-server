// routes/auth/index.js
const express = require("express");  
const router = express.Router();
const crmRoutes = require("./routes.js");

const mongoose = require('mongoose');
const Client = mongoose.model('clients');

module.exports = (passport) => {

	
	router.post("/create", passport.authenticate(), (req, res) => {
        
		res.json({ status: "TEST: My API is alive!" });
	});
	router.get('/list/:clientID', passport.authenticate(), (req, res) => {
        console.log(req.user);
        console.log(req.params);
        new Client({
            ownerID: req.user.id,
            name: 'Carden',
            job: 'Digital Producer',
            company: 'indiepics',
            email: 'carden.k@indiepics.ie', 
        }).save();
        return res.status(200).json({result: "List Route"});
	});


	return router;
}