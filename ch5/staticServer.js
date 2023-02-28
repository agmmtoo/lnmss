const http = require('node:http')
const fs = require('node:fs')
const path = require('node:path')
const mime = require('mime')

const base = '/home/thuyainsoe/'

http.createServer((req, res) => {
    const pathname = path.normalize(base + req.url)
    console.log(pathname)

    fs.stat(pathname, (err, stats) => {
        if (err) {
            console.error(err)
            res.writeHead(404)
            res.write('Resource missing 404\n')
            res.end()
        } else {
            const type = mime.getType(pathname)
            console.log(type)
            res.setHeader('Content-Type', type)
            const file = fs.createReadStream(pathname)
            file.on('open', () => {
                res.statusCode = 200
                file.pipe(res)
            })
            file.on('error', (err) => {
                res.writeHead(403)
                res.write('file missing, or permission problem')
                console.log(err)
                res.end()
            })
        }
    })

}).listen(8124, () => console.log('listening at 127.0.0.1:8124'))