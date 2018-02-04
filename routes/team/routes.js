const db = require('../../model/mysqlCon.js');
const team = {
	teamIndex: function (req, res) {
        let r = req.params
        let PlayerID = r.id;
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
                    return res.status(500).json({result: "Server Error "});
                }
				if ( result.length == 1 ) {
                    res.status(200).json( result[0] ).send();
				} else {
                    res.status(401).json({});
				}
			}
		)
	},
	leagueTable: function (req, res) {
        //let r = req.params;
		let TeamID = req.params.TeamID;
        let Season = req.params.Season;

        let query = require('./queries/tablequery.sql');
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
					res.status(200).json({ result });
                } else {
                    // No User Data Found
                    res.status(401).send('401');
                }
            }
        );
	},
	previousSeason: function (req, res) {
		
	}
}

module.exports = team;