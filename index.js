const http = require('http');

http.createServer((req, res) => {
  res.end('foobar');
}).listen(process.env.PORT);


