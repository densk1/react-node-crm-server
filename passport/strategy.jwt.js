// const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const cfg = require("../JWTconfig.js");

const mongoose = require('mongoose');
const User = mongoose.model('user');


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


const JWT = new JWTStrategy(params, async function(payload, done) {
	let user = payload.id;
	if (user) {
        let theUser = await User.findById({_id: user});
        const {
            firstName, secondName, email, admin
        } = theUser;
		return done(null,  { id: user, firstName, secondName, email, admin
		});
	} else {
		return done(new Error("User not found"), null);
	}
});

module.exports = JWT;