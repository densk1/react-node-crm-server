const jwt = require("jwt-simple");
const cfg = require("../../JWTconfig.js");
const db = require('../../model/mysqlCon');
const checkPass = require('../../model/checkPass');

const auth = {
	local: function (req, res) {
		let emailAddress = req.body.emailAddress;
		let password = req.body.password;
		let stayLoggedIn = req.body.stayLoggedIn;
		let query = `
			SELECT 
				PlayerID,
				email,
				password,
				salt
			FROM 
				users 
			WHERE 
				email = ?`;
		let query_params = [ emailAddress ];

		db.query(
			query, 
			query_params, 
			async function(error, result, fields) {
				if(error) {
					console.log(error.message);
					res.status(500).json({result: "Server Error "});
				}
				if ( result.length == 1 ) {
					if ( await checkPass(password, result[0].password, result[0].salt ) ) {
						let payload = { id: result[0].PlayerID };
						//console.log('Server: Login Success');
						res.cookie('blrstkn',jwt.encode(payload, cfg.jwtSecret), {domain:'localhost'});
						res.status(200).json({result: true});
						return;
					}
				} 
				//console.log('Server: Login Failure');
				res.status(401).json({result: false});
			}
		);
	},
	facebook: function(req, res) {
		
	},
}

module.exports = auth ;