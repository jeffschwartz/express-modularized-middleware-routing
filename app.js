/*
 * Blog article on Express route specific middleware
 * and how it can be usedto expose a database to routes.
 * Published on 2012-08-23 to my Ramblings blog on Wordpress
 * @ http://jefftschwartz.wordpress.com.
 */

/**
 * Module dependencies.
 */

var mongo = require("mongodb")
  , express = require('express')
  , http = require('http')
  , path = require('path');

// server options
var serverOptions = {
  auto_reconnect: true,
  poolSize: 10
};

// create mongo server
var server = new mongo.Server("localhost", 27017, serverOptions);
// create mongo database
var db = new mongo.Db("dbname", server, {});

// route specific middleware - will expose the database to route
var exposeDb = function(req, resp, next){
  req.mongoDb = db;
  next();
};

var app = express(); //INFO! because of var the app variable is local to this module.

exports.app = app; //INFO! exporting app allows other modules to access it without polluting the global name space

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(exposeDb);
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

var index = require('./routes');  //IMPORTANT! If routes is dependent on anything requiring configuration then do this after all configuration statements.

db.open(function(err, db){
  if(err){
    throw err;
  }

  http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
  });
});

