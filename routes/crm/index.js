// routes/auth/index.js
const express = require("express");  
const router = express.Router();
const crmRoutes = require("./routes.js");

const mongoose = require('mongoose');
const Client = mongoose.model('clients');
const Contact = mongoose.model('contacts');
const Comment = mongoose.model('comment');

module.exports = (passport) => {
    router.use(passport.authenticate());
    

    router.post('/list', (req, res) => {
        let offset = req.body.offset || 0;
        let amount = req.body.amount || 10;
        Contact.find().skip(offset).limit(amount)
        .then( (result) => {
            res.status(200).json(result);
        }).catch( (err) => {
            res.status(500).end();
        });
    });

    
	router.post('/client/', async (req, res) => {
		let result = await Contact.findOne({_id:req.body.clientID });
        return res.status(200).json(result);
	});
	
	
	router.post('/client/comments', async (req, res) => {
		let result = await Comment.find({clientID: req.body.clientID});
		res.status(200).json(result);
	});
	router.post('/client/comment/add', async (req, res) => {
		let {clientID, comment} = req.body;
		if (comment.length > 5 ) {
			await new Comment({
				clientID,
				comment,
				added: new Date(),
				addedBy: 'AuthorID'
			}).save();
			let result = await Comment.find({}).sort({_id:-1}).limit(1);
			res.status(200).json(result);
		} else {
			res.status(200).json(null);
		}
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
	router.post("/contact/new", (req, res) => {
		/*
		const {
			firstName,
			secondName,
			email,
			organisation,
			address1,
			city,
			postcode,
			country,
			office,
			extension,
			desk,
			mobile,
			address2
		} = req.body.newContact.values;
		*/
		let newContact = req.body.newContact.values;
		// Must add in Upsert here
		// Must add in too Many requests handler
        new Contact( {...newContact} ).save();
        
		res.status(200).json({ result: "/Create route note yet built" });
	});
	return router;
}