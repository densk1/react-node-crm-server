// routes/auth/index.js
const express = require("express");  
const router = express.Router();
const crmRoutes = require("./routes.js");

const mongoose = require('mongoose');
const Client = mongoose.model('clients');

module.exports = (passport) => {
    router.use(passport.authenticate());
    

    router.post('/list', (req, res) => {
        let offset = req.body.offset || 3;
        let amount = req.body.amount || 5;
        Client.find().skip(offset).limit(amount)
        .then( (result) => {
            res.status(200).json(result);
        }).catch( (err) => {
            res.status(500).end();
        });
    });

    
	router.post('/client/:clientID', (req, res) => {
        // boostrap Card!
        console.log(req.user, req.params);
        return res.status(200).json({result: "/client/:clientID Not yet Complete!"});
	});
	router.post('/client/:clientID/edit', (req, res) => {
        console.log(req.user, req.params, req.body);
        return res.status(200).json({result: "List Route"});
	});
	
    router.post('/search', async (req, res) => {
        console.log(req.body);
        const result = await Client.find({
            name: new RegExp(".*" + req.body.query+ ".*")
        });
        // const result = Client.find({name: req.body });
        console.log(result);
        res.status(200).json({});
    });
	router.post("/create", (req, res) => {
        /*
        new Client({
            ownerID: 1,
            name: 'Carden',
            job: 'Digital Producer',
            company: 'indiepics',
            email: 'carden.k@indiepics.ie', 
        }).save();
        */
		res.status(200).json({ result: "/Create route note yet built" });
	});
    
    router.post('/list', (req, res) => {
        res.status(200).json({result: '/crm/list Not yet complete'});
    })
	return router;
}