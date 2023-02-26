const server = require('http').createServer()

server.on('request', (req, res,) => {
    console.log('request event')
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Hello World\n')
})

server.on('connection', (socket) => console.log('connection event'))

server.listen(8124, () => console.log('Listening on http://127.0.0.1:8124'))
