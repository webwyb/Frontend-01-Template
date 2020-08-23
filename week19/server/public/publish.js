const http = require('http')
const querystring = require('querystring')
const fs = require('fs')
var archiver = require('archiver');

let filename = './cat.jpg';
let packname = './package.zip';

// const postData = querystring.stringify({
//   'content': '你好世界122223'
// });


// fs.stat(filename, (error, stat)=>{
  const options = {
    hostname: 'localhost',
    port: 8081,
    path: '/?filename=package.zip',
    method: 'POST',
    headers: {
        'Content-Type': 'application/octet-stream',
        // 'Content-Length': stat.size
      }
  };
  const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  });

  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });
  // Write data to request body
  // req.write(postData);

  // let readSteam = fs.createReadStream("./cat.jpg")
  // readSteam.pipe(req)
  // readSteam.on("end",()=>{
  //   req.end();
  // });

  var archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
  });
  archive.directory(packname, false);
  archive.finalize();
  archive.pipe(req);
  archive.on('end', ()=>{
    req.end();
  })
// })


  
  