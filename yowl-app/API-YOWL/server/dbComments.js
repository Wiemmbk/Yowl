const dbConn = require('./dbConnect')

let yowl_db_comments = {}

yowl_db_comments.allComments = () => {
    return new Promise((resolve, reject) => {
        dbConn.query('SELECT * FROM comments', (err, results) => {
            if(err){
                return reject(err)
            }
            return resolve(results)
        })
    })
}
yowl_db_comments.comment = (id) => {
    return new Promise((resolve, reject) => {
        dbConn.query('SELECT * FROM comments WHERE id=' + id , (err, results) => {
            if(err){
                return reject(err)
            }
            return resolve(results[0])
        })
    })
}
yowl_db_comments.addComment = (data) => {
  return new Promise((resolve, reject) => {
    dbConn.query("INSERT INTO comments SET ?", data,  (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};
yowl_db_comments.updateComment = (id, data) => {
  return new Promise((resolve, reject) => {
    dbConn.query("UPDATE comments SET ? WHERE id=" + id, data, (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};
yowl_db_comments.deleteComment = (id) => {
    return new Promise((resolve, reject) => {
      dbConn.query("DELETE FROM comments WHERE id=" + id, (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      });
    });
  };


module.exports = yowl_db_comments