const fs = require('fs')
const async = require('async')
const _dir = './data/'

const writeStream = fs.createWriteStream('./log.txt', {
    flags: 'a',
    'encoding': 'utf-8',
    'mode': 0666
})

async.waterfall([
    (callback) => fs.readdir(_dir, callback),
    (files, callback) => files.forEach((name) => callback(null, name)),
    (file, callback) => fs.stat(_dir + file, (err, stats) => callback(err, stats, file)),
    (stats, file, callback) => {
        if (stats.isFile()) {
            fs.readFile(_dir + file, 'utf8', (err, data) => callback(err, file, data))
        }
    },
    (file, text, callback) => callback(null, file, text.replace(/somecompany\.com/g, 'burningbird.net')),
    (file, text, callback) => fs.writeFile(_dir + file, text, (err) => callback(err, file)),
    (file, callback) => writeStream.write('changed ' + file + '\n', 'utf-8', callback)
], (err) => err ? console.error(err.message) : console.log('modified files'))