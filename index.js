var cluster = require('cluster');
var noofCpus = require('os').cpus().length;

if(cluster.isMaster) {
	for(var i = 0; i < noofCpus; i++) {
		cluster.fork();
	}
}
else {
	var express = require('express');
	var bodyparser = require('body-parser');
	var mongoose = require('mongoose');
	var passport = require('passport');
	var userRouter = require('./route.js');

	var app = express();

	mongoose.connect('mongodb://localhost:27017/demo');

	app.use(bodyparser.json());
	require('./passport')(passport);
	app.use(passport.initialize());
	app.use('/user', userRouter);

	app.listen(3000, function() {
		console.log("Hey there, am "+cluster.worker.id+", listening on port 3000!");
	});	
}

