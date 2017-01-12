var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var jwt_simple = require('jwt-simple');
var passport = require('./passport');

var User = require('./UserModel');

router.use(function(req, res, next) {
	next();
});

router.post('/login', function(req, res) {

	mongoose.model('User').findOne({email: req.body.email, password: req.body.password}, function(error, user) {
		if(error) {
			throw error;
		}
		if(!user) {
			res.status(404).send({success: false});
		}
		else{

			var token = jwt_simple.encode({email: req.body.email}, "shashidhar");
			res.status(200).send({success: true, user: user, token: "JWT "+token});
		}
	});
});

router.get('/:username', passport.authenticate('jwt', { session: false }), function(req, res) {
	
	mongoose.model('User').findOne({username: req.params.username}, function(error, user) {
		
		if(error) {
			throw error;
		}
		if(!user) {
			res.status(404).send({success: false});
		}
		else{
			res.status(200).send({success: true, user: user});
		}
	});
});

router.post('/', function(req, res) {
	var newUser = new User({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password
	});

	newUser.save(function(error, user) {
		if(error) {
			throw error;
		}

		res.send(user);
	});
});

router.put('/:username', function(req, res) {
	var user = new User();

	user.findOneAndUpdate({username: req.params.username}, {$set: {email: req.body.email}}, function(error, updatedUser) {
		if(error) {
			throw error;
		}
		else {
			res.send(updatedUser);
		}
	});

});

router.delete('/', function(req, res) {

});

module.exports = router;