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
	router.post('/client/update', async (req, res) => {
        console.log(req.body.values);
        let { _id } = req.body.values;
        await Contact.findByIdAndUpdate(_id, req.body.values, {upsert: true})
        let result = await Contact.findById(_id);
        return res.status(200).json(result);
	});
	router.post('/client/comment/delete', async (req, res) =>{
        let { commentID, clientID } = req.body;
        // 1. Find and delete comments
        // 2. get and return updated list.

        
        Comment.findById( commentID ).remove().exec();
		let result = await Comment.find({clientID: req.body.clientID});
		return res.status(200).json(result);

        
    })
    router.post('/search', async (req, res) => {
		let query = await new RegExp(".*" + req.body.query+ ".*", "i");
        const result = await Contact.find({ 
			$or: [
				{firstName: query }, 
				{secondName: query }, 
				{email: query }, 
				{role: query }, 
				{organisation: query }
			]
		});
        res.status(200).json(result);
    });
	router.post("/contact/new", (req, res) => {

		let newContact = req.body.newContact.values;
		// Must add in Upsert here
		// Must add in too Many requests handler
        new Contact( {...newContact} ).save();
        
		res.status(200).json({ result: "/Create route note yet built" });
	});
	return router;
}