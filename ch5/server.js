const http = require('node:http')
const qs = require('node:querystring')

const server = http.createServer().listen(8124, () => console.info(`Server running at http://127.0.0.1:8124`))

server.on('request', (req, res) => {
    if(req.method === 'POST') {
        let body = ''
        req.on('data', (chunk) => body += chunk)
        req.on('end', () => {
            const post = qs.parse(body)
            console.log(post)
            res.writeHead(200, {'Content-Type': 'text/plain'})
            res.end('Hello World\n')
        })
    }
})