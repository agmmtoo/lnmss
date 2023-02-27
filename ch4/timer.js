const http = require('http')

console.time('hello-timer')
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Hello World\n')
    console.timeEnd('hello-timer')
    console.time('hello-timer')
}).listen(8124, () => console.info('http://127.0.0.1:8124/'))
