const express = require("express");  
const router = express.Router();
const teamIndexer = require('./middleware/teamIndexer.js');
const team = require("./routes.js");


module.exports = (auth) => { 
	router.get('/:teamIndex(\\d+)', 
		auth.authenticate(), 
		teamIndexer, 
		team.teamIndex
	);
	router.get("/:teamIndex(\\d+)/leaguetable/", 
		auth.authenticate(), 
		teamIndexer, 
		team.leagueTable
	)
	return router;
}