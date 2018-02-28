const mysql      = require('mysql');

module.exports = mysql.createPool({
	connectionLimit 	: 50,
  	host     			: process.env.SQLHOST,
  	user     			: process.env.SQLUSER,
  	password 			: process.env.SQLPASSWORD,
   	database 			: process.env.SQLDB,
});