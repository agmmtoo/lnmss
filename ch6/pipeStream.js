const fs = require('fs')

const readable = fs.createReadStream('./working.txt')
const writable = fs.createWriteStream('./working2.txt')

readable.pipe(writable)