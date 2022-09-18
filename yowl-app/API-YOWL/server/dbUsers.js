const dbConn = require("./dbConnect");

let yowl_db_users = {};

// Crud 

yowl_db_users.allUsers = () => {
  return new Promise((resolve, reject) => {
    dbConn.query("SELECT * FROM users", (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};
yowl_db_users.user = (id) => {
  return new Promise((resolve, reject) => {
    dbConn.query("SELECT * FROM users WHERE id=" + id, (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results[0]);
    });
  });
};
yowl_db_users.addUser = (data) => {
  return new Promise((resolve, reject) => {
    dbConn.query("INSERT INTO users SET ?", data,  (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};
yowl_db_users.updateUser = (id, data) => {
  return new Promise((resolve, reject) => {
    dbConn.query("UPDATE users SET ? WHERE id=" + id, data, (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};
yowl_db_users.deleteUser = (id) => {
    return new Promise((resolve, reject) => {
      dbConn.query("DELETE FROM users WHERE id=" + id, (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      });
    });
  };

// login 



  module.exports = yowl_db_users;
