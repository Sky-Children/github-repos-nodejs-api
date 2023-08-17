const express = require("express")
const server = express();

const PORT = process.env.PORT || 8081;
// 创建express 实例
const app = express();
// 配置 静态资源文件 
app.use(express.static(__dirname + '/apps'))
// 监听端口号
app.listen(PORT,()=>{
    console.log('服务已启动')
})