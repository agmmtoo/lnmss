const interval = setInterval(name => console.log('hello ' + name), 3000, 'AMMO')

const timer = setTimeout(i => {
    clearInterval(i)
    console.log('interval cleared')
}, 10000, interval)

timer.unref()

console.log('waiting on first interval...')