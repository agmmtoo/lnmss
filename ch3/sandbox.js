const vm = require('vm')
c = 1000
const sandbox = {
    process: 'this baby',
    require: 'that',
    c: c,
}

vm.runInNewContext('console.log(c)', sandbox)

global.count1 = 100
var count2 = 100
const txt = 'if (count1 === undefined) {var count1 = 0}; count1++;if (count2 === undefined) {var count2 = 0}; count2++; console.log(count1, count2)'
const script = new vm.Script(txt)
script.runInThisContext({ filename: 'count.vm' })

console.log(c, count1, count2)