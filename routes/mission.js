const express = require("express");
const router = express.Router();
const conn = require("../config/DBConn.js");


//내 미션 목록 확인 라우터
router.post("/MyMission", function (request, response) {
    console.log(request.body);

    let mem_id = request.body.mem_id;

    let sql = `select lo.location_name, sum(succ) as star, badge 
            from mission_member mm join mission_bank mb 
            on mm.mission_id = mb.mission_id 
            join location lo 
            on mb.location_name = lo.location_name 
            where mm.mem_id = ? group by (location_name)`
    conn.query(sql, [mem_id], function (err, rows) {
        if (!err) {
            console.log(rows);
            
            let arr = new Array();
            for(let i = 0; i  <rows.length; i++) {
                let data = new Object();
                data.location_name = rows[i].location_name;
                data.star = rows[i].star;
                data.badge = rows[i].badge;

                arr.push(data);
            }
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

//내 미션 목록 삭제 라우터
router.post("/Delete", function (request, response) {
    console.log(request.body);

    let mem_id = request.body.mem_id;
    let location_name = request.body.location_name;

    let sql = `delete from mission_member 
            where mem_id=? 
            and mission_id in (select mission_id from mission_bank where location_name = ?)`
    conn.query(sql, [mem_id, location_name], function (err, rows) {
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