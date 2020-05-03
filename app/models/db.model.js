const mysql = require('mysql');
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: `gupoecom_mcnreader`
});

connection.connect(function(err) {
  if (err) throw err.code;
});


module.exports = connection;