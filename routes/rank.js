const express = require("express");
const router = express.Router();
const conn = require("../config/DBConn.js");

// 랭킹 확인 라우터
router.post("/RankInfo", function (request, response) {
    console.log(request.body);

    let sql = `select m.nick, m.mem_image, count(b.mem_id) as badge_num, rank() over(order by count(b.mem_id) desc) as ranking 
            from badge_member b join member m 
            on b.mem_id=m.mem_id 
            group by (b.mem_id)`
    conn.query(sql, function (err, rows) {
        if (!err) {
            console.log(rows);
            
            let arr = new Array();
            for(let i = 0; i  <rows.length; i++) {
                let data = new Object();
                data.ranking = rows[i].ranking;
                data.nick = rows[i].nick;
                data.mem_image = rows[i].mem_image;
                data.badge_num = rows[i].badge_num;

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


module.exports = router;