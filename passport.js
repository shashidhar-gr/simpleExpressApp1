var jwtStrategy = require('passport-jwt').Strategy;
var extractJwt = require('passport-jwt').ExtractJwt;

module.exports = function(passport) {
	var opts = {};
	opts.jwtFromRequest = extractJwt.fromAuthHeader();
	opts.secretOrKey = "shashidhar";
	passport.use(new jwtStrategy(opts, function(payload, done) {
		return done(null, false);
	}));
}