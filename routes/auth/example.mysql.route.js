/* THIS IS NOT CONNECTED UP */

const jwt = require("jwt-simple");
const cfg = require("../../config/JWTconfig.js");
const db = require('../../model/mysqlCon');
const checkPass = require('../../model/checkPass');

const auth = {
	localSQL: function (req, res) {
		let emailAddress = req.body.emailAddress;
		let password = req.body.password;
		let stayLoggedIn = req.body.stayLoggedIn;
		let query = `
			SELECT 
				userID,
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
					res.status(500).json({
						result: "Server Error "
					});
				}
				if ( result.length == 1 ) {
					if ( await checkPass(password, result[0].password, result[0].salt ) ) {
						let payload = { id: result[0].userID };
						res.cookie('blrstkn',jwt.encode(payload, cfg.jwtSecret), {path:'/'});
						res.status(200).json({result: true});
						return;
					}
				} 
				res.status(401).json({result: false});
			}
		);
	},
}

module.exports = auth ;