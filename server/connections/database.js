// Esta conexão está feita no ficheiro app.js

// const mongoose = require("mongoose");

// mongoose
//   .connect("mongodb://localhost:9000/projeto_aieb_pce", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then((result) => {
//     console.log("Connection Established");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// module.exports.uri = "mongodb://localhost:9000/projeto_aieb_pce";

// module.exports.query = function (queryString) {
//   try {
//     conn.connect();

//     conn.query(queryString, function (err, result, fields) {
//       if (err) {
//         console.log("ERROR : " + err);
//       }
//       // console.log("The solution is: ", result);

//       // callback(rows[0].solution);

//       return result;
//     });
//     // callback();

//     conn.end();
//   } catch (error) {
//     console.log("Exception: " + error);
//   }
// };

// // module.exports = conn;
