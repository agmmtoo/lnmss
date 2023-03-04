const spawn = require('node:child_process').spawn
const net = require('node:net')

const client = new net.Socket()
client.setEncoding('utf-8')

client.connect('3000', 'localhost', function () {
    console.log('connected to tcp server')
})

const logs = spawn('tail', [
    '-f',
    '/var/log/redis/redis-server.log',
    '/var/log/syslog',
])

logs.stdout.setEncoding('utf8')
logs.stdout.on('data', function (data) {
    const re = /GET\s(\S+)\sHTTP/g
    const re2 = /\.gif|\.png|\.jpg|\.svg/
    const parts = re.exec(data)
    const tst = re2.test(parts[1])
    if (tst) client.write(parts[1])
})

logs.stderr.on('data', function (data) {
    console.error('stderr:', data)
})

logs.on('exit', function (code) {
    console.log('child process exited with code:', code)
    client.end()
})