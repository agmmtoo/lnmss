'use strict'

const {StringDecoder} = require('string_decoder')
const decoder = new StringDecoder('utf8')

let euro = new Buffer.from([0xE2, 0x82])
let euro2 = new Buffer.from([0xAC])

console.log(decoder.write(euro), decoder.write(euro2))
console.log(euro.toString(), euro2.toString())
