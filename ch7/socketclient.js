const net = require('node:net')

const client = new net.Socket
client.setEncoding('utf-8')

client.connect('/tmp/tcpsocket', function () {
    console.log('connected to server')
    client.write(`Hi from client`)

})

process.stdin.pipe(client)
client.pipe(process.stdout)

client.on('close', () => console.log('server is closed'))