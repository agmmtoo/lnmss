const redis = require('./redis.js')
const http = require('node:http')

const messageServer = http.createServer()

messageServer.on('request', function (req, res) {
    if (req.url === '/favicon.ico') {
        res.writeHead(200, { 'Content-Type': 'image/x-icon' })
        res.end()
        return;
    }
    const client = redis.createClient()
    client.on('error', (err) => console.error('Error: ', err))
    client.select(6)
    client.lpop('images', function (err, reply) {
        if (err) return console.error('Error: ', err)
        if (reply) {
            res.write(reply, '\n')
        } else {
            res.write('No images in queue')
        }
        res.end()
    })

})

messageServer.listen(8124, () => console.log('listening on 8124'))