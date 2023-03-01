const chokidar = require('chokidar')

const watcher = chokidar.watch('.', {
    ignored: /[\/\\]\./,
    persistent: true,
})

const log = console.log.bind(console)

watcher
    .on('add', p => log(p, 'added'))
    .on('unlink', p => log(p, 'removed'))
    .on('addDir', p => log('dir', p, 'added'))
    .on('unlinkDir', p => log('dir', p, 'removed'))
    .on('error', e => log('error', e))
    .on('ready', () => log('initialized'))
    .on('raw', (ev, p, detail) => log('Raw event:', ev, p, detail))
    .on('change', (p, stat) => log(p, 'changed size to', stat.size))