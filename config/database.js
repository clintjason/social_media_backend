const { createPool } = require("mysql");

const pool = createPool({
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 10,
})


pool.getConnection(function(err, connection) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('DB Connection Successfull');
});
/* pool.getConnection(function(err, connection) {
  if (err) throw err; // not connected!
 
  // Use the connection
  connection.query('SELECT something FROM sometable', function (error, results, fields) {
    // When done with the connection, release it.
    connection.release();
 
    // Handle error after the release.
    if (error) throw error;
 
    // Don't use the connection here, it has been returned to the pool.
  });
}); */

module.exports = pool;