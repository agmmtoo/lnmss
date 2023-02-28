const http = require('node:http')
const qs = require('node:querystring')

const postData = qs.stringify({
    'msg': 'Hello World!'
})

const options = {
    hostname: 'localhost',
    port: 8124,
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': postData.length
    }
}

const req = http.request(options, (res) => {
    console.log('STATUS: ', res.statusCode)
    console.log('HEADERS: ', JSON.stringify(res.headers))
    res.setEncoding('utf8')
    res.on('data', (chunk) => console.log('BODY: ', chunk))
    res.on('end', () => console.log('No more data in response.'))
    res.on('error', console.error)
})

req.write(postData)
req.end()