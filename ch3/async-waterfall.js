const fs = require('fs'), async = require('async')

async.waterfall([
    function readData(cb) {
        fs.readFile('./data/data1.txt', 'utf-8', function (err, data) {
            cb(err, data)
        })
    },
    function modify(text, cb) {
        const adjData = text.replace(/old/g, 'new')
        cb(null, adjData)
    },
    function writeData(text, cb) {
        fs.writeFile('./data/data1.txt', text, function (err) {
            cb(err, text)
        })
    }
], function (err, result) {
    if (err) {
        console.log(err.message)
    } else {
        console.log(result)
    }
})