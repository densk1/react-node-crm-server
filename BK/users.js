// users.js
// Fake list of users to be used in the authentication

// must use minus one in auth on payload 


const db = require('./model/mysqlCon');
const checkPass = require('./model/checkPass');
const util = require('util');

/*

const connect = () => new Promise((resolve, reject) => {
	db.connect((err) => {
		if (err) return reject(err);
	  	resolve();
	})
})

const makeDbRequest = (emailAddress, password) => new Promise((resolve, reject) => {
    const query = `
      SELECT 
          id,
          email,
          password,
          salt
      FROM 
          users 
      WHERE 
          email = ?`;

    const query_params = [emailAddress];

    db.query(
        query,
        query_params,
        handleDbData(resolve, reject),
    );
  })

const handleDbData = (resolve, reject, password) => (error, result, fields) => {
  if (error) return reject(error)

  if ( result.length == 1 ) {
      if ( checkPass(password, result[0].password, result[0].salt ) ) {
          resolve({id: result[0].id})

      } else {
          console.log("login False | Password");
          reject();
      }

  } else {
      console.log("login False | username");
      reject();
  }
}

module.exports.getID = (emailAddress, password) => new Promise((resolve, reject) => {
	connect()
		.then(() => {
			makeDbRequest(emailAddress, password)
			.then(resolve)
			.catch(reject)
		})
		.catch(reject);
})




module.exports.getUser = ( id ) => new Promise((resolve, reject) => {
	connect()
		.then(() => {
		
		})
})
*/



module.exports.getID = function(emailAddress, password) {
	return new Promise ((resolve, reject) => {
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
		var query_params = [emailAddress];

		db.query(
			query, 
			query_params, 
			function(error, result, fields) {
				if(error) {
					reject(error);
					return;
				}
				if ( result.length == 1 ) {
					if ( checkPass(password, result[0].password, result[0].salt ) ) {
						resolve({ id: result[0].PlayerID });
					} else {
						// login False Password
						resolve(false);
					}
				} else {
					// login False Username
					resolve(false);
				}
			}
		);
	});
}

module.exports.getUser = function( id ) {
	return new Promise ((resolve, reject) => {
		var query = `
			SELECT 
				PlayerID,
				email
			FROM 
				users 
			WHERE 
				PlayerID = ?`;
		var query_params = [id];
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
					resolve({ user: result[0] });
				} else {
					// No User Data Found
					resolve(false);
				}
			}
		);
	});
}

