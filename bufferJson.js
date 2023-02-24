'use strict'

let buf = new Buffer.from('Buffer Json example.')
let json = JSON.stringify(buf)

console.log(json)

console.log(buf.toString())
buf = new Buffer.from(JSON.parse(json))
console.log(JSON.parse(json), buf, buf.toString())