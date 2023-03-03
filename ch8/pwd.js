const spawn = require('child_process').spawn

const pwd = spawn('pwd -g')

pwd.stdout.setEncoding('utf-8')
pwd.stdout.on('data', (data) => console.log('stdout:', data))
pwd.stderr.on('data', (data) => console.log('stderr:', data))

pwd.on('message', (msg) => console.info('message:', msg))
pwd.on('error', (err) => console.error('error:', err))
pwd.on('close', (code) => console.log('exited with code', code))