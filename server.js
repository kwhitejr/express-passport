// Modules
var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;  // Want to use Basic Authentication Strategy

// Constants
var PORT = 3000;

// Other
var app = express();
var user = { username: 'bob', password: 'secret', email: 'bob@example.com' };

app.set('view engine', 'jade');
app.set('views', 'views');

// Middleware
app.use(bodyParser.urlencoded({extended: false}));

passport.use(new BasicStrategy(
  function(username, password, done) {
    // Example authentication strategy using
    if ( !(username === user.username && password === user.password) ) {
      return done(null, false);
    }
    return done(null, user);
}));

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/secret',
  passport.authenticate('basic', { session: false }),
  function (req, res) {
    res.json(req.user);
  });

var server = app.listen(PORT, function () {
  console.log('listening on '+PORT);
});