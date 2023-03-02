const net = require('node:net')

const client = new net.Socket()
client.setEncoding('utf-8')

client.connect('8124', 'localhost', function () {
    console.log('connected to server')
    client.write('Who needs a browser to communicate?')
})

process.stdin.pipe(client)

client.on('data', console.log)
client.on('close', () => console.log('connection is closed'))