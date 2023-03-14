var express = require("express");
var router = express.Router();
var conn = require("./database");

let make_query = (request) => {
  conn.connect(function (err) {
    if (err) throw err;
    return "connected";
  });
  conn.query(request, function (err, result, fields) {
    if (err) throw err;
    // console.log(result);
    return result;
  });
  conn.end((err) => {
    // The connection is terminated gracefully
    // Ensures all remaining queries are executed
    // Then sends a quit packet to the MySQL server.
  });
};

module.exports = make_query;
