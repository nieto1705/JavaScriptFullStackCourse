const http = require("http");
const fs = require("fs");
const formidable = require('formidable');
const util = require('util');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  /*res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');*/
});

server.on("request", (req, res) =>
          {
    console.log(req.url);
    
    
    if(req.method === "GET")
        {
            if(req.url === "/")
            {
                fs.readFile('public/index.html',(err, data) => {
                    if (err) {
                        res.writeHead(404, {'Content-Type': 'text/html'});
                        return res.end("404 Not Found");
                    } 
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.write(data);
                    res.end();
                });
            }
            else if(req.url === "/upload")
            {
                    fs.readFile('public/upload.html',(err, data) => {
                    if (err) {
                        res.writeHead(404, {'Content-Type': 'text/html'});
                        return res.end("404 Not Found");
                    } 
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.write(data);
                    res.end();
                 });
            }
        }
    else if (req.method === "POST"){
        
        if(req.url === "/upload")
            {
                let form = new formidable.IncomingForm();
                
                form.uploadDir = `${__dirname}/public/uploads`;
                form.keepExtensions = true;
                
                form.parse(req, (err,fields, files) => {
                  res.writeHead(200, {'content-type': 'text/plain'});
                  res.write('received upload:\n\n');
                  res.end(util.inspect({fields: fields, files: files}));        
                })
                
                form.on('fileBegin', (name, file) =>{
                    console.log(`comenzando a subir ${util.inspect({name: name, file: file})}`);
                });
                
                form.on('field', (name, value) =>{
                    console.log(`comenzando a subir ${util.inspect({name: name, value: value})}`);
                    
                });
            }
    }
    
}) ;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});