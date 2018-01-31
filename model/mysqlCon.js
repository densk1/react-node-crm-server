const mysql      = require('mysql');
module.exports = mysql.createPool({
	connectionLimit 	: 50,
  	host     			: 'localhost',
  	user     			: 'ballers',
  	password 			: '***REMOVED***YTStwc',
   	database 			: 'Ballers',
});