// routes/auth/index.js
const express = require("express");  
const router = express.Router();
const crmRoutes = require("./routes.js");

const mongoose = require('mongoose');
const Client = mongoose.model('clients');
const Comment = mongoose.model('comment');

module.exports = (passport) => {
    router.use(passport.authenticate());
    

    router.post('/list', (req, res) => {
        let offset = req.body.offset || 0;
        let amount = req.body.amount || 10;
        Client.find().skip(offset).limit(amount)
        .then( (result) => {
            res.status(200).json(result);
        }).catch( (err) => {
            res.status(500).end();
        });
    });

    
	router.post('/client/', async (req, res) => {
		let result = await Client.findOne({_id:req.body.clientID });
        return res.status(200).json(result);
	});
	
	
	router.post('/client/comments', async (req, res) => {
		let result = await Comment.find({clientID: req.body.clientID});
		console.log(result);
		res.status(200).json(result);
	});
	router.post('/client/comment/add', async (req, res) => {
		let {clientID, comment} = req.body;
         await new Comment({
			clientID,
			comment,
			added: new Date(),
			addedBy: 'AuthorID'
        }).save();
		let result = await Comment.find({}).sort({_id:-1}).limit(1)


        // need to return the new entry and add it to the top of the list
		res.status(200).json(result);
	})
	router.post('/client/:clientID/edit', (req, res) => {
        console.log(req.user, req.params, req.body);
        return res.status(200).json({result: "List Route"});
	});
	
    router.post('/search', async (req, res) => {
		let query = await new RegExp(".*" + req.body.query+ ".*", "i");
        const result = await Client.find({ 
			$or: [
				{name: query }, 
				{email: query }, 
				{role: query }, 
				{company: query }
			]
		});
        res.status(200).json(result);
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
    
/*    router.post('/list', (req, res) => {
        res.status(200).json({result: '/crm/list Not yet complete'});
    })*/
	return router;
}