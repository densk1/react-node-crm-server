const express = require("express");  
const router = express.Router();
const teamIndexer = require('./middleware/teamIndexer.js');


const team = {
	teamIndex: require("./route.teamIndex.js"),
	leagueTable: require("./route.leaguetable.js"),
	//previousSeason: require("./route.previousSeason.js"),
}

module.exports = (passport) => { 
	router.get('/:teamIndex(\\d+)', 
		passport.authenticate(), 
		teamIndexer, 
		team.teamIndex
	);
	router.get("/:teamIndex(\\d+)/leaguetable/", 
		passport.authenticate(), 
		teamIndexer, 
		team.leagueTable
	);
	return router;
}