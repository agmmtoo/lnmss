const vm = require('vm')
const util = require('util')

const sandbox = {
    count1: 1
}

vm.createContext(sandbox)
if (vm.isContext(sandbox)) console.log(sandbox, 'contextualized')

vm.runInContext('count1++; counter=true;', sandbox, {filename: 'context.vm'})

console.log(util.inspect(sandbox))