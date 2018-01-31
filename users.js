// users.js
// Fake list of users to be used in the authentication

// must use minus one in auth on payload 


const db = require('./model/mysqlCon');
const checkPass = require('./model/checkPass');
//const util = require('util');

module.exports.getID = function(emailAddress, password) {
	return new Promise ((resolve, reject) => {
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
		let query_params = [emailAddress];

		db.query(
			query, 
			query_params, 
			async function(error, result, fields) {
				if(error) {
					reject(error);
					return;
				}
				if ( result.length == 1 ) {
					if ( await checkPass(password, result[0].password, result[0].salt ) ) {
                        console.log("// Login True")
						resolve({ id: result[0].PlayerID });
					} else {
						console.log("// login False Password")
						resolve(false);
					}
				} else {
					console.log("// login False Username")
					resolve(false);
				}
			}
		);
	});
}

module.exports.getUser = function( PlayerID ) {
	return new Promise ((resolve, reject) => {
		let query = `
			SELECT 
				PlayerID,
				playername,
				email,
				emailConfirmed
			FROM 
				users 
			WHERE 
				PlayerID = ?`;
		let query_params = [PlayerID];
		db.query(
			query, 
			query_params, 
            function(error, result, fields) {
				if(error) {
                    
					reject(error);
					return;
				}
				if ( result.length == 1 ) {
					// User Data Sent
					resolve({ user: result[0] });
				} else {
					// No User Data Found
					resolve(false);
				}
			}
		);
	});
}

module.exports.getLeagueTable = function( data ) {
	return new Promise ((resolve, reject) => {
		let query = require('./queries/tablequery.sql');
		let query_params = [data.Season, data.TeamID];
		db.query(
			query, 
			query_params, 
			function(error, result, fields) {
                
				if(error) {
					reject(error);
					return;
				}
				if ( result ) {
					// User Data Sent
					resolve({ tableData: result });
				} else {
					// No User Data Found
					resolve(false);
				}
			}
		);
        
	});
}


