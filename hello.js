const http = require('http')
const fs = require('fs')
const url = require('url')

const server = http.createServer(async (req, res) => {
	const type = url.parse(req.url, true).query.type
	const header = new Headers()
	let response = 'Something wrong!'
	let contentType = 'text/plain'
	let status = 200
	let option = null

	switch (type) {
		case 'text':
			response = 'You asked for text'
			break;
		case 'img':
			try {
				response = await fs.promises.readFile('../Pictures/Screenshots/Screenshot from 2023-02-20 23-33-15.png')
				contentType = 'image/png'
				option = 'binary'
			} catch (e) {
				status = 500
				console.log(e)
			}
			break;
		default:
			response = "Unknown type."
			status = 400
			break;
	}
	header.set('Content-Type', contentType)
	res.writeHead(status, header)
	res.end(response, option)
})

server.listen(8124, () => console.log('http://localhost:8124'))
