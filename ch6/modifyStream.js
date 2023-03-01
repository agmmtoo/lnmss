const fs = require('fs')

fs.open('./working.txt', 'r+', function (err, fd) {
    if (err) return console.error(err)

    const writable = fs.createWriteStream(null, {
        fd,
        start: 10,
        encoding: 'utf-8'
    })
    writable.write(' inserting that line')
})