const event = require('node:events')

class Redis extends event.EventEmitter {
    #store
    constructor() {
        super()
        // setTimeout(() => this.emit('error', new Error('Custom error')), 3000)
        this.#store = {}
    }
    createClient() {
        console.log('client created', this)
        return this;
    }
    select(int) {
        console.log('selected: ', int)
    }
    rpush(name, data) {
        this.#store[name] = data
    }
}

module.exports = new Redis()