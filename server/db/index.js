var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

exports.connection = mysql.createConnection({
  host: 'localhost',
  user: 'student',
  password: 'student',
  database: 'test'
});

exports.connection.connect((err) => {
  if (err) {
    throw err;
  } 
  console.log('Connected!');
});

// connection.end((err) => {
//   if (err) {
//     throw err;
//   } 
// });