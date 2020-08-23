const http = require('http');
const fs = require('fs');
const unzipper = require("unzipper")

const server = http.createServer((req, res)=>{
    // 存储文件
    // let matched = req.url.match(/filename=([^&]+)/);
    // let filename = matched && matched[1];
    // console.log(filename);
    // if(!filename){
    //     return;
    // }
    // let writeStream = fs.createWriteStream("../server/public/" + filename)

    // 解压缩文件
    let writeStream = unzipper.Extract({path: "../server/public"});
    req.pipe(writeStream)
    // console.log('writeStream',writeStream);
    req.on("end", ()=>{
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('ok')
    })
})
server.listen(8081);