// teamRoutes.js

//const jwt = require("jwt-simple");
const express = require("express");  
const router = express.Router();
const teamIndexer = require('../middleware/teamIndexer.js');

const db = require('../model/mysqlCon.js');

module.exports = (auth) => { 
	
	router.get('/:teamIndex(\\d+)', /*auth.authenticate(),*/ teamIndexer, function (req, res) {
        let r = req.params
        let PlayerID = 5;//r.PlayerID;
        let teamIndex = parseInt(r.teamIndex);
		let query = `
			SELECT 
				p.TeamID,
                Season
			FROM 
				playerteams p 
            LEFT JOIN
                teams t 
            ON
                p.TeamID = t.TeamID

			WHERE 
				PlayerID = ?
            LIMIT 1 
            OFFSET ?
        `;
		let query_params = [PlayerID, teamIndex];
		db.query(
			query, 
			query_params, 
            function(error, result, fields) {

                if(error) {
                    console.log(error.message);
                    return res.status(500).json({result: "Server Error "});
                }

				if ( result.length == 1 ) {
                    res.status(200).json( result[0] );
				} else {
                    res.status(401).json({});
				}
			}
		);
    });  
    
	router.get("/:teamIndex(\\d+)/leaguetable/", /*auth.authenticate(),*/ teamIndexer, function(req, res) {
        // function to get the actual TeamID from a particular database.
		console.log(req.cookies);
		
        let r = req.params;
		let TeamID = req.params.TeamID;
        let Season = req.params.Season;

        let query = require('../queries/tablequery.sql');
		let query_params = [Season, TeamID];
        db.query(
            query, 
            query_params, 
            function(error, result, fields) {
                if(error) {
                    console.log(error.message);
                    return res.status(500).json({result: "Server Error "});
                }
                if ( result ) {
                    // User Data Sent
                    res.json({ result });
                } else {
                    // No User Data Found
                    res.status(401).send('401');
                }
            }
        );
	})
	return router;
}