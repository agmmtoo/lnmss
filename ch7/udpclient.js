const dgram = require('node:dgram')
const { createReadStream } = require('node:fs')
const { stdout } = require('node:process')

const client = dgram.createSocket('udp4')

process.stdin.on('data', function (data) {
    console.log(data.toString('utf-8'))
    client.send(data, 8124, "localhost", function (err, bytes) {
        if (err) console.error('error', err)
        else console.log(bytes)
    })
})

client.bind(8125)

client.on('message', (buffer) => stdout.write(buffer))