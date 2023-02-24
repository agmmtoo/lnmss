require('os')
process.stdin.setEncoding('utf8');

process.stdin.on('readable', () => {
    const input = process.stdin.read()
    if (input !== null) {
        process.stdout.write(input)
        const command = input.trim()
        if (command == 'exit') process.exit(0)
    }
})