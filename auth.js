// auth.js
const passport = require("passport");
const passportJWT = require("passport-jwt");
//const users = require("./users.js");
const cfg = require("./JWTconfig.js");
const ExtractJwt = passportJWT.ExtractJwt;
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
    //jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
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