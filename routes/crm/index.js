// routes/auth/index.js
const express = require("express");  
const router = express.Router();
const crmRoutes = require("./routes.js");
/*
const mongoose = require('mongoose');
const Client = mongoose.model('clients');
const Contact = mongoose.model('contact');
const Comment = mongoose.model('comments');
*/


const crm = require("./routes.js");

module.exports = (passport) => {
    router.use(passport.authenticate());
    

    router.post('/list', crm.list);
	router.post('/client/', crm.client);
	router.post('/client/comments', crm.clientComments);
	router.post('/client/comment/add', crm.clientCommentAdd)
	router.post('/client/update', crm.clientUpdate);
	router.post('/client/comment/delete', crm.clientCommentDelete)
    router.post('/search', crm.search);
	router.post("/contact/new", crm.contactNew);
	router.post("/contact/delete", crm.contactDelete);
	return router;
}