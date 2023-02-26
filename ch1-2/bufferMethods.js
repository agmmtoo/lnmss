require('process')
let cat = new Buffer.alloc(4)

cat.writeUInt8(0x63,0)
cat.writeUInt8(0x61,1)
cat.writeUInt8(0x74,2)
cat[3] = 0x73

console.log(cat.toString())

const originalBuf = new Buffer.from('this is the original array')
const olength = originalBuf.length
const cloneBuf = originalBuf.slice(12, olength)
cloneBuf.fill('*', 0, 8)
console.log(originalBuf.toString(),'\n', cloneBuf.toString())

const buf1 = new Buffer.from('1 is number one')
const buf2 = new Buffer.from('2 is number two')
const buf3 = new Buffer.alloc(buf1.length)
buf1.copy(buf3);

[buf1, buf2, buf3].forEach(b => console.log(b.toString()))

console.log(buf1.compare(buf2))
console.log(buf2.compare(buf1))
console.log(buf1.compare(buf3))
