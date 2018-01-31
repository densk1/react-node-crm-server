const db = require('./mysqlCon');
const checkPass = require('./checkPass')

/***********************************
=> checklogin   
************************************/

module.exports = function(username, password) {
    db.connect();
    var query = `
        SELECT 
            PlayerID,
            email,
            password,
            salt
        FROM 
            users 
        WHERE 
            email = ?`;
    var query_params = [username];
    
    return db.query(
		query, 
		query_params, 
		function (error, result, fields) {
        	if (error) throw error;			
			//console.log(result[0].password)
			db.end();
			if ( result.length == 1 ) {
				// check password
				if ( checkPass(password, result[0].password, result[0].salt ) ) {
					console.log("login true");
					return {
						loginSuccess: true,
						PlayerID: result[0].PlayerID,
					}
				} else {
					console.log("login False pw");
					return {
						loginSuccess: false,
						reason: 'pw'
					}
				}

			} else {
				console.log("login False UN");
				return {
					loginSuccess: false,
					reason: 'pw'
				};
			}
		})
}



// return result.length ? result[0] : false; // TODO return object with client: {id: clientId} and user: {id: userId} 