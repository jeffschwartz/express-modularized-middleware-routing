/**
 * Created with JetBrains WebStorm.
 * User: jeffrey
 * Date: 8/25/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

var db = require("../app").db;

// route specific middleware - will expose the database to route
exports.exposeDb = function(req, resp, next){
  req.mongoDb = db;
  next();
};
