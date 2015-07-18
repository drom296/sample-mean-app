var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var morgan = require('morgan');

// connect to our monogDB database
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/learn');

// turn on logging of requests
app.use(morgan('dev'));

// get all the data/stuff of the body (Post) parameters
app.use(bodyParser.json());

// parse applications/vbd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));
//app.use(methodOverride());

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/client'));

// routes =======================================
require('./server/routes')(app); // configure our routes

// start app =======================================

// set our port
var port = process.env.PORT || 3000;

// startup our app at http://localhost:3000
app.listen(port);

// shoutout to the user
console.log('App listening on port ' + port);

// expose app
exports = module.exports = app;
