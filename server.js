/**
 * Module dependencies.
 */

var express = require('express');
var logger = require('morgan');
var vhost = require('vhost');

var main = express();

if (!module.parent) main.use(logger('dev'));

main.get('/', function(req, res){
  res.send('Hello from main app!');
});

main.get('/:sub', function(req, res){
  res.send('requested ' + req.params.sub);
});

// Redirect app

var redirect = express();

redirect.use(function(req, res){
  if (!module.parent) console.log(req.vhost);
  res.redirect('http://instagram.buisson.pro:3000/' + req.vhost[0]);
});

// Vhost app

var app = module.exports = express();

app.use(vhost('instagram.buisson.pro', main)); // Serves top level domain via Main server app

/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}