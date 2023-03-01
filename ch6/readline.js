const readline = require('node:readline')

const rl = readline.createInterface(process.stdin, process.stdout)

rl.question(">>What is the meaning of life? ", function (answer) {
    console.log("About the meaning of life, you said " + answer)
    rl.setPrompt(">> ")
    rl.prompt()
})

function closeInterface() {
    rl.close()
    console.log('Leaving Readline')
}

rl.on('line', function (cmd) {
    if (cmd.trim() == '.leave') {
        closeInterface()
        return
    }
    console.log("rpeating command: ", cmd)
    rl.prompt()
})

rl.on('close', closeInterface)