const http = require('node:http')
const fs = require('node:fs')

const base = '/home/thuyainsoe/lnmss/ch5/public'

http.createServer((req, res) => {
    const pathname = base + req.url
    console.log(pathname)

    fs.stat(pathname, (err, stats) => {
        if (err) {
            console.error(err)
            res.writeHead(404)
            res.write('Resource missing 404\n')
            res.end()
        } else {
            res.setHeader('Content-Type', 'text/html')
            console.info(stats)
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