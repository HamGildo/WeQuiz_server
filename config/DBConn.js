const mysql = require("mysql2");
// npm install express mysql --save

// let conn = mysql.createConnection({
//     host: "127.0.0.1",
//     user: "root",
//     password: "123456",
//     port: 3306,
//     database: "wequiz_db"
// });

let conn = mysql.createPool({
    host: "project-db-stu.ddns.net",
    user: "running",
    password: "211119",
    port: 3307,
    database: "running"
});
// Mysql 연결정보등록

//conn.connect();
// Mysql과 연결실행

module.exports = conn;