const db = require("../config/database");

module.exports = {
  createUserTable:(data, callback) => {
    const createSQLQuery = `CREATE TABLE IF NOT EXISTS users (
      id INT NOT NULL AUTO_INCREMENT,
      username VARCHAR(40) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      profile VARCHAR(150) NOT NULL,
      isAdmin BOOLEAN NOT NULL DEFAULT false,
      createdAt timestamp NOT NULL DEFAULT current_timestamp(),
      updatedAt timestamp NOT NULL DEFAULT current_timestamp(),
      CONSTRAINT PK_User PRIMARY KEY (id))`;
      return new Promise((resolve, reject) => {
        db.query(createSQLQuery, (err, row) => {
          if (err) { 
            console.error(err)
            reject(err)
          }
          console.log("Users Table Created");
          resolve(row)
        })
      })
  },
  createUser:(data) => {
    const insertQuery = `INSERT INTO users SET ?`;
    return new Promise((resolve, reject) => {
      db.query(insertQuery,[data], (err, res) => {
        err ? reject(err) : resolve(res)
      })
    })
  },
  getUser: () => {
    const getQuery = "SELECT";
  }
}