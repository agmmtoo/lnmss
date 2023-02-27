const repl = require('repl')

const context = repl.start({
    prompt: ">> ",
    ignoreUndefined: true,
    replMode: repl.REPL_MODE_STRICT
}).context

context.foo = 'bar'
context.baz = 'qux'
context.quux = 'quuz'