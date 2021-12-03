const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const memberRouter = require("./routes/member");


app.use(bodyparser.urlencoded({extended:false}));
app.use('/Member', memberRouter);

app.listen(3003);
// 3003 -> server, 3306 -> Mysql