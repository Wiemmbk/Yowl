const mysql = require('mysql')

const dbConn = mysql.createPool({
    password: 'sk7Qazazet',
    user: 'QFqayauflX',
    database: 'QFqayauflX',
    host: 'remotemysql.com',
    port:'3306'
})
module.exports = dbConn

// const dbConnLocal = mysql.createPool({
//     password: '',
//     user: 'root',
//     database: 'yowl_db',
//     host: 'localhost',
//     port:'3306'
// })
// module.exports = dbConnLocal