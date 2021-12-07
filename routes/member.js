const express = require("express");
const router = express.Router();
const conn = require("../config/DBConn.js");

//회원가입 라우터
router.post("/Sign", function (request, response) {
    console.log(request.body);

    let mem_id = request.body.mem_id;
    let pw = request.body.pw;
    let nick = request.body.nick;
    let birth = request.body.birth;
    let gender = request.body.gender;

    let sql = "insert into member(mem_id, pw, nick, birth, gender) values(?, ?, ?, ?, ?)";
    conn.query(sql, [mem_id, pw, nick, birth, gender], function (err, rows) {
        if (!err) {
            console.log(rows);
            
            let arr = new Array();
            let data = new Object();
            data.status = "200";
            arr.push(data);
            let jsonData = JSON.stringify(arr);
            console.log(jsonData);
            response.send(jsonData);

        } else {
            console.log(err);
        }
    });
    //sql 명령 실행
    //conn.end();
});


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

// 회원 정보를 가져오는 라우터
router.post("/MemberInfo", function (request, response) {
    console.log(request.body);
    let mem_id = request.body.mem_id;

    let sql = "select * from member where mem_id = ?";
    conn.query(sql, [mem_id], function (err, rows) {
        if (!err) {
            console.log(rows);
            let arr = new Array(); 
            let data = new Object();

            // id로 요청하면 어차피 row는 1개만 나옴 (id는 유일값)
            data.nick = rows[0].nick;
            data.birth = rows[0].birth;
            data.mem_image = rows[0].mem_image;
            // 돌려주고 싶은 자료들 보내주면 됨

            arr.push(data);
            

            let jsonData = JSON.stringify(arr);
        
            console.log(jsonData);
            response.send(jsonData);
             
        } else {
            console.log(err);
        }
    });

});

// 회원수정라우터
router.post("/Modify", function (request, response) {
    console.log(request.body);

    let nick = request.body.nick;
    let pw = request.body.pw;
    let birth = request.body.birth;
    let mem_image = request.body.mem_image;
    let mem_id = request.body.id;

    let sql = "update member set nick = ?, pw = ?, birth = ?, mem_image = ? where mem_id = ?";
    conn.query(sql, [nick, pw, birth, mem_image, mem_id], function (err, rows) {
        if (!err) {
            console.log(rows);
            let arr = new Array();
            let data = new Object();
            data.status = "200";
            arr.push(data);
            let jsonData = JSON.stringify(arr);
            console.log(jsonData);
            response.send(jsonData);

        } else {
            console.log(err);
        }
    });
    //sql 명령 실행
    //conn.end();
});






module.exports = router;