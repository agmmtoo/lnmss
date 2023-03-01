const zlib = require('node:zlib')
const program = require('commander')
const fs = require('node:fs')

program
    .version('0.0.1')
    .option('-s, --source [file name]', 'Source file name')
    .option('-f, --file [file name]', 'Destination file name')
    .option('-t, --type <mode>', /^(gzip|deflate)$/i)
    .parse(process.argv)

const options = program.opts()
let compress
if (options.type === 'deflate') compress = zlib.createDeflate()
else compress = zlib.createGzip()

const inp = fs.createReadStream(options.source)
const out = fs.createWriteStream(options.file)

inp.pipe(compress).pipe(out)