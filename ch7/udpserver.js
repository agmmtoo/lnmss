const dgram = require('node:dgram')

const server = dgram.createSocket('udp4')

server.on('message', function (msg, rinfo) {
    console.log('Message: ', msg, 'from', rinfo.address, ':', rinfo.port)
})


let sec = 0;
setInterval(() => server.send(Buffer.from(`${++sec}s has passed!\n`), 8125, 'localhost', console.log), 1000)
server.bind(8124)