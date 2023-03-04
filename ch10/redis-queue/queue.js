const net = require('node:net')

const redis = require('./redis.js')

const server = net.createServer(function (conn) {
    console.log('connected')
    const client = redis.createClient()

    client.on('error', function (err) {
        console.log('Error', err)
    })
    client.select(6)
    conn.on('data', function (data) {
        console.log(data, 'from', conn.remoteAddress, conn.remotePort)
        client.rpush('images', data)
    })
}).listen(3000)

server.on('close', function (err) {
    client.quit()
})

server.on('listening', () => console.log('listening on 3000'))