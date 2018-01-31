// auth.js
const passport = require("passport");
const passportJWT = require("passport-jwt");
const users = require("./users.js");
const cfg = require("./config.js");
const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

module.exports = function() {
    let JWTstrategy = new Strategy(params, function(payload, done) {
        let user = payload.id;
        if (user) {
            return done(null,  {
                id: user
            });
        } else {
            return done(new Error("User not found"), null);
        }
    });
    passport.use(JWTstrategy);
    return {
        initialize: function() {
            return passport.initialize();
        },
        authenticate: function() {
            return passport.authenticate("jwt", cfg.jwtSession);
        }
    };
};