var mysql = require("mysql");

var conn = mysql.createConnection({
  host: "localhost",
  database: "usersdb",
  user: "root",
  password: "",
});

module.exports.query = function (queryString) {
  try {
    conn.connect();

    conn.query(queryString, function (err, result, fields) {
      if (err) {
        console.log("ERROR : " + err);
      }
      // console.log("The solution is: ", result);

      // callback(rows[0].solution);

      return result;
    });
    // callback();

    conn.end();
  } catch (error) {
    console.log("Exception: " + error);
  }
};

// module.exports = conn;
