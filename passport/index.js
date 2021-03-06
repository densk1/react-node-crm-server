// passport.js
const passport = require("passport");
const strategyJWT = require('./strategy.jwt.js');
const cfg = require("../config/JWTconfig.js");

// Add Strategies
passport.use('jwt', strategyJWT);

module.exports = function () {
	return {
		initialize: function() {
			return passport.initialize();
		},
		authenticate: function() {
            return passport.authenticate('jwt', cfg.session)
            //return passport.authenticate(['jwt', 'google'], cfg.session)
		},
        deserializeUser: function() {
            return passport.deserializeUser();
        }
	}	
}