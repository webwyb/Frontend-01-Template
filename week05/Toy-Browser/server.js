const http = require('http')
const server = http.createServer((req, res)=>{
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('ok')
})
server.listen('8088',()=>{
    console.log('server is ok');
})