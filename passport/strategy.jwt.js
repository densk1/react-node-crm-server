// const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const cfg = require("../JWTconfig.js");

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
    //jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};


const JWT = new JWTStrategy(params, function(payload, done) {
	let user = payload.id;
	if (user) {
		return done(null,  {
			id: user
		});
	} else {
		return done(new Error("User not found"), null);
	}
});

module.exports = JWT;