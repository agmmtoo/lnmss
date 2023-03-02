const net = require('node:net')
const fs = require('node:fs')

const unixsocket = '/tmp/tcpsocket'

const server = net.createServer(function (conn) {
    console.log('connected')
    conn.on('data', function (data) {
        conn.write(Buffer.from(`Repeating: ${data}`))
    })
    conn.on('close', () => console.log(`client disconnected`))

    let s = 0
    setInterval(() => conn.write(`${++s}s has passed.\n`), 1000)
}).listen(unixsocket)

server.on('listening', () => `listening on ${unixsocket}`)

server.on('error', function (err) {
    if (err.code === 'EADDRINUSE') {
        fs.unlink(unixsocket, () => server.listen(unixsocket))
    } else console.error(err)
})

process.on('uncaughtException', console.error)