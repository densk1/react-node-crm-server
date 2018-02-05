// passport.js
const passport = require("passport");
const passportJWT = require("passport-jwt");
const cfg = require("./JWTconfig.js");
// Bearer Token 

// const ExtractJwt = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy


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

// Configure Strategies
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

const Google = new GoogleStrategy({
    clientID: 'GOOGLE_CLIENT_ID',
    clientSecret: 'GOOGLE_CLIENT_SxsECRET',
    callbackURL: "http://www.example.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
)

// Add Strategies
passport.use('jwt', JWT);
passport.use('google', Google);

module.exports = function () {
	return {
		initialize: function() {
			return passport.initialize();
		},
		authenticate: function() {
            return passport.authenticate(['jwt', 'google'], cfg.jwtSession)
		}
	}	
}