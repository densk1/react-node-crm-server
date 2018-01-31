// => https://blog.jscrambler.com/implementing-jwt-using-passport/

// index.js
var express = require("express");  
var bodyParser = require("body-parser");  
var jwt = require("jwt-simple");  
var auth = require("./auth.js")();  
var users = require("./users.js");  
var cfg = require("./config.js");  
var app = express();


app.use(bodyParser.json());  
app.use(auth.initialize());

app.post("/", function(req, res) {  
    res.json({
        status: "My API is alive!"
    });
});
 
app.post("/user", auth.authenticate(), async function(req, res) {
	try {
    	res.json(await users.getUser(req.user.id));
	} catch (e) {
		res.json(resErrorObj);
	}
});

app.post("/token", async function(req, res) {
	let resErrorObj = {error: "Not Authorized" };
	try {
		if (req.body.email && req.body.password) {
			const email = req.body.email;
			const password = req.body.password;
			const user = await users.getID(email, password);

			if (user) {
				var payload = {
					id: user.id,
				};
				var token = jwt.encode(payload, cfg.jwtSecret);
				res.json({
					token: token,
				});
			} else {
				//res.sendStatus(401);
				res.json(resErrorObj)
			}
		} else {
			// username + password missing
			// res.sendStatus(401);
			res.json(resErrorObj);
		}
	} catch (e) {
		// Connection try failed 
		//res.sendStatus(401);
		res.json(resErrorObj);
	}
});

app.post('*', function (req, res) {
	res.sendStatus(404);
})

app.get('*', function (req, res) {
	res.sendStatus(404);
})
app.listen(3000, function() {  
    console.log("My API is running...");
});
/*
function conlog(text) {
	console.log(util.inspect(text, false, null))
}*/

module.exports = app;  