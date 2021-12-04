const express = require("express");
const router = express.Router();
const conn = require("../config/DBConn.js");


//로그인 라우터
router.post("/Login", function (request, response) {
    console.log(request.body);

    let id = request.body.id;
    let pw = request.body.pw;

    let sql = "select * from member where mem_id = ? and pw = ?";
    conn.query(sql, [id, pw], function (err, rows) {
        if (!err) {

            if (rows.length > 0) {
                // 성공
                // 안드로이드한테도 알려줘야징~
                let arr = new Array();
                let data = new Object();
                data.result = "success"; // {"result" : "success"}
                arr.push(data); // [{"ddong" : "200"}]
                let jsonData = JSON.stringify(arr);
                console.log(jsonData);
                response.send(jsonData); // json으로 바꿔서 안드로 ㄱ
            } else {
                // 실패
                let arr = new Array();
                let data = new Object();
                data.result = "fail"; 
                arr.push(data); 
                let jsonData = JSON.stringify(arr);
                console.log(jsonData);
                response.send(jsonData); 
            }
        

        } else {
            console.log(err);
        }
    });
    //sql 명령 실행
    //conn.end();
});

module.exports = router;