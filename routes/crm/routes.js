const express = require("express");  
const router = express.Router();
const crmRoutes = require("./routes.js");

const mongoose = require('mongoose');
//const Client = mongoose.model('clients');
const Contact = mongoose.model('contacts');
const Comment = mongoose.model('comments');

const routes = {
	list: (req, res) => {
        let offset = req.body.offset || 0;
        let amount = req.body.amount || null;
        Contact.find().skip(offset).limit(amount)
        .then( (result) => {
            res.status(200).json(result);
        }).catch( (err) => {
            res.status(500).end();
        })
	},
	client: async (req, res) => {
		let result = await Contact.findOne({_id:req.body.clientID });
        return res.status(200).json(result);
	},
	clientComments: async (req, res) => {
		let result = await Comment.find({clientID: req.body.clientID});
		res.status(200).json(result);
	},
	clientCommentAdd: async (req, res) => {
		let {clientID, comment, author} = req.body;
		if (comment.length > 5 ) {
			await new Comment({
				clientID,
				comment,
				added: new Date(),
				addedBy: author
			}).save();
			let result = await Comment.find({}).sort({_id:-1}).limit(1);
			res.status(200).json(result);
		} else {
			res.status(200).json(null);
		}
	},
	clientUpdate: async (req, res) =>{
        let { commentID, clientID } = req.body;
        Comment.findById( commentID ).remove().exec();
		let result = await Comment.find({clientID: req.body.clientID});
		return res.status(200).json(result); 
    },
	clientCommentDelete: async (req, res) => { 
        let { commentID, clientID } = req.body;
        Comment.findById( commentID ).remove().exec();
		let result = await Comment.find({clientID: req.body.clientID});
		return res.status(200).json(result); 
    },
	search: async (req, res) => {
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
    },
	contactNew: async (req, res) => {
		let newContact = req.body.newContact.values;
        await new Contact( {...newContact} ).save();
		let { email, firstName, secondName } = newContact;
		let newEntry = await Contact.findOne({ email, firstName, secondName })
		let newUserID = await newEntry._id;
		return 	res.status(200).json(newUserID);
	},
	contactDelete: async (req, res) => {
		console.log(req.body.contactID);
		let delID = req.body.contactID;
		await Contact.remove( { _id: delID });
		return res.status(200).json(delID);
	},
}

module.exports = routes;