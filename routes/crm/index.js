// routes/auth/index.js
const express = require("express");  
const router = express.Router();
const crmRoutes = require("./routes.js");

const mongoose = require('mongoose');
const Client = mongoose.model('clients');


module.exports = (passport) => {
    router.use(passport.authenticate());

	router.post("/create", (req, res) => {
        /*        
        new Client({
            ownerID: req.user.id,
            name: 'Carden',
            job: 'Digital Producer',
            company: 'indiepics',
            email: 'carden.k@indiepics.ie', 
        }).save();
        */
		res.json({ status: "TEST: My API is alive!" });
	});
	router.get('/list/:clientID', (req, res) => {
        console.log(req.user);
        console.log(req.params);

        return res.status(200).json({result: "List Route"});
	});
    router.post('/search', async (req, res) => {
        console.log(req.body.query);
        const result = await Client.find({
            name: new RegExp(".*" + req.body.query+ ".*")
        });
        // const result = Client.find({name: req.body });
        console.log(result);
        res.status(200).json({});
    });


	return router;
}