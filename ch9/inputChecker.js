'use strict'

const util = require('util')
const eventEmitter = require('events').EventEmitter
const fs = require('fs')

class InputChecker extends eventEmitter {
    constructor(name, file) {
        super()
        this.name = name
        this.writeStream = fs.createWriteStream(`./${file}.txt`, {
            'flags': 'a',
            'encoding': 'utf-8',
            'mode': 0o666
        })
    }
    check(input) {
        let command = input.trim().substr(0, 3)
        switch (command) {
            case 'wr:':
                this.emit('write', input.substr(3, input.length))
                break
            case 'en:':
                this.emit('end')
                break
            default:
                this.emit('echo', input)
                break
        }
    }
}


let ic = new InputChecker('Shelley', 'output')

ic.on('write', function (data) {
    this.writeStream.write(data, 'utf8')
})
ic.on('echo', (data) => process.stdout.write(ic.name + ' wrote ' + data))
ic.on('end', process.exit)

process.stdin.setEncoding('utf8')
process.stdin.on('readable', function () {
    let input = process.stdin.read()
    if (input !== null) ic.check(input)
})