const db = require('../../model/mysqlCon.js');

const leagueTable = function (req, res) {
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
}

module.exports = leagueTable;