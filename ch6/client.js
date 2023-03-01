const http = require('node:http')
const fs = require('node:fs')
const zlib = require('node:zlib')

const gzip = zlib.createGzip()

const options = {
    hostname: 'localhost',
    port: 8124,
    method: 'POST',
    headers: {
        'Content-Type': 'application/javascript',
        'Content-Encoding': 'gzip,deflate'
    }
}

const req = http.request(options, function (res) {
    res.setEncoding('utf8')
    let data = ''
    res.on('data', (chunk) => data += chunk)
    res.on('end', () => console.log(data))
})

req.on('error', function (e) {
    console.error('problem with request', e.message)
})

const readable = fs.createReadStream('/home/ammo/Pictures/FfsWY1HaUAUVRoJ.jpeg')
readable.pipe(gzip).pipe(req)