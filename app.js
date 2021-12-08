const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const memberRouter = require("./routes/member");
const missionRouter = require("./routes/mission");


app.use(bodyparser.urlencoded({extended:false}));
app.use('/Member', memberRouter);
app.use('/Mission', missionRouter);

app.listen(3003);
// 3003 -> server, 3306 -> Mysql