const fs = require('fs')

const writeStream = fs.createWriteStream('./log.txt', {
    flags: 'a',
    encoding: 'utf-8',
    mode: '0666'
})

writeStream.on('open', function () {
    let counter = 0
    fs.readdir('./data/', function (err, files) {
        if (err) {
            console.error(err.message)
        } else {
            files.forEach(function (name) {
                fs.stat('./data/' + name, function (err, stats) {
                    if (err) return err
                    if (!stats.isFile()) {
                        counter++
                        return
                    }
                    fs.readFile('./data/' + name, 'utf-8', function (err, data) {
                        if (err) {
                            console.error(err.message)
                        } else {
                            const adjData = data.replace(/somecompany\.com/g, 'othercompany.org')
                            fs.writeFile('./data/' + name, adjData, function (err) {
                                if (err) {
                                    console.log(err.message)
                                } else {
                                    console.log('finished ' + name)
                                    counter++
                                    if (counter >= files.length) {
                                        console.log('all done')
                                    }
                                }
                            })
                        }
                    })
                })
            })
        }
    })
})

writeStream.on('error', (err) => console.error('ERROR:' + err))