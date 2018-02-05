// passport.js
const passport = require("passport");

const strategyJWT = require('./strategy.jwt.js');
const strategyGoogle = require('./strategy.google.js');

const cfg = require("../JWTconfig.js");

// Add Strategies
passport.use('jwt', strategyJWT);
passport.use('google', strategyGoogle);

module.exports = function () {
	return {
		initialize: function() {
			return passport.initialize();
		},
		authenticate: function() {
            return passport.authenticate(['jwt', 'google'], cfg.session)
		}
	}	
}