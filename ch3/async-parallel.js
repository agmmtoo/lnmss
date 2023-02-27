const fs = require('fs')
const async = require('async')

async.parallel({
    data1: function (callback) {
        fs.readFile('./data/fruit1.txt', 'utf-8', function (err, data) {
            callback(err, data)
        })
    },
    data2: function (callback) {
        fs.readFile('./data/fruit2.txt', 'utf-8', function (err, data) {
            callback(err, data)
        })
    },
    data3: function (callback) {
        fs.readFile('./data/fruit3.txt', 'utf-8', function (err, data) {
            callback(err, data)
        })
    },
}, function (err, result) {
    if (err) {
        console.log(err)
    } else {
        console.log(result)
    }
})