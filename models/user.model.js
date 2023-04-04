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
  findUserByEmail: (email) => {
    //id, username, email, isAdmin, profile, createdAt, updatedAt
    const getQuery = "SELECT * FROM users WHERE email = ?";
    return new Promise((resolve, reject) => {
      db.query(getQuery, [email], (err, res) => {
        err? reject(err) : resolve(res)
      })
    })
  },
  findById: (id) => {
    //id, username, email, isAdmin, profile, createdAt, updatedAt
    const getQuery = "SELECT id, username, email, isAdmin, profile, createdAt, updatedAt FROM users WHERE id = ?";
    return new Promise((resolve, reject) => {
      db.query(getQuery, [id], (err, res) => {
        err? reject(err) : resolve(res)
      })
    })
  },
  findAll: () => {
    //id, username, email, isAdmin, profile, createdAt, updatedAt
    const getQuery = "SELECT id, username, email, isAdmin, profile, createdAt, updatedAt FROM users";
    return new Promise((resolve, reject) => {
      db.query(getQuery, (err, res) => {
        err? reject(err) : resolve(res)
      })
    })
  },
  update: (id, data) => {
    const query = `UPDATE users SET ? WHERE id =?`;
    return new Promise((resolve, reject) => {
      db.query(query, [data,id], (err,res) => {
        err? reject(err) : resolve(res)
      })
    })
  }
}