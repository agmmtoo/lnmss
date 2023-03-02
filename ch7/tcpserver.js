const net = require('node:net')

const PORT = 8124

const server = net.createServer({
    allowHalfOpen: false,
    pauseOnConnect: false,
}, function (socket) {
    console.log('connected')

    socket.on('data', function (data) {
        console.log(data, ' from ', socket.remoteAddress, socket.remotePort)
        socket.write(`Repeating: ${data}`)
    })

    socket.on('close', () => console.log('client closed connection'))
}).listen(PORT)

server.on('listening', () => console.log(`listening on ${PORT}`))

server.on('error', function (err) {
    if (err.code === 'EADDRINUSE') {
        console.warn('Address in use, retrying...')
        setTimeout(() => {
            server.close()
            server.listen(PORT)
        }, 1000)
    } else console.error(err)
})