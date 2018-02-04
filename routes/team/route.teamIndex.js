const db = require('../../model/mysqlCon.js');
const teamIndex = function (req, res) {
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
}

module.exports = teamIndex;