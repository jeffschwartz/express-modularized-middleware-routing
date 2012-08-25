/**
 * Created with JetBrains WebStorm.
 * User: jeffrey
 * Date: 8/25/12
 * Time: 3:55 PM
 * To change this template use File | Settings | File Templates.
 */

var app = require("../app").app;

app.get('/', function(req, res){
  var mongoDb = req.mongoDb;
  var expose = "";
  if(mongoDb){
    expose = "index route has access to mongo";
  }else{
    expose = "index route doesn't have access to mongo";
  }
  res.render('index', { title: 'Express', expose: expose });
});