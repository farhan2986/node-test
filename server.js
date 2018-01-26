var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  routes = require('./api/routes/routes')
  port = process.env.PORT || 3000;


routes(app); //register the route
app.set('views', __dirname + '/api/views');
app.set('view engine', 'pug');
app.listen(port);

console.log('CareerAxiom Node test assignment: ' + port);