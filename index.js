const express = require("express")
const server = express();

const PORT = process.env.PORT || 8081;
server.listen(PORT, function () { //在3001端口启动
    console.log('Example app listening on port 3001');
})

server.use('', express.static('./apps/'))