// Modules
var express = require('express');
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;  // Want to use Basic Authentication Strategy

// Constants
var PORT = 3000;

// Other
var app = express();
var user = { username: 'bob', password: 'secret', email: 'bob@example.com' };

passport.use(new BasicStrategy(
  function(username, password, done) {
    // Example authentication strategy using
    if ( !(username === user.username && password === user.password) ) {
      return done(null, false);
    }
    return done(null, user);
}));

var server = app.listen(PORT, function () {
  console.log('listening on '+PORT);
});