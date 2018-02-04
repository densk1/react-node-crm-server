// passport.js
const passport = require("passport");
const passportJWT = require("passport-jwt");
const cfg = require("./JWTconfig.js");
// Bearer Token 

// const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;


const cookieExtractor = function(req) {
    var token = null;
    if (req && req.cookies) {
        token = req.cookies['blrstkn'];
    }
    return token;
};

const params = {
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: cookieExtractor,
	// Bearer Token 
    //jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};


// Configure Strategies
const JWTstrategy = new Strategy(params, function(payload, done) {
	let user = payload.id;
	if (user) {
		return done(null,  {
			id: user
		});
	} else {
		return done(new Error("User not found"), null);
	}
});

// Add Strategies
passport.use(JWTstrategy);

module.exports = function () {
	return {
		initialize: function() {
			return passport.initialize();
		},
		authenticateJWT: function() {
            return passport.authenticate("jwt", cfg.jwtSession)
		},
		authenticateFB: {},
		authenticateGoogle: {},
	}	
}