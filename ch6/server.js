const http = require('node:http')
const zlib = require('node:zlib')
const fs = require('node:fs')

const server = http.createServer().listen(8124, () => console.info('server started at http://127.0.0.1:8127'))

server.on('request', function (req, res) {
    if (req.method === 'POST') {
        const chunks = []

        req.on('data', (chunk) => chunks.push(chunk))

        req.on('end', () => {
            const buf = Buffer.concat(chunks)
            zlib.unzip(buf, (err, result) => {
                if (err) {
                    res.writeHead(500)
                    res.end()
                    return console.error('unzip error', err)
                }
                const timestamp = Date.now()
                const filename = `./done${timestamp}.png`
                fs.createWriteStream(filename).write(result)
            })
            res.writeHead(200, { 'Content-Type': 'text/plain' })
            res.end('Received and uncompressed file\n')
        })
    }
})