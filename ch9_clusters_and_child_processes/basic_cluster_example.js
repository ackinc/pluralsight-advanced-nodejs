const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
    console.log(`Master: ${process.pid}`);
    for (let i = 0; i < os.cpus().length; i++) cluster.fork();
} else {
    console.log(`Child: ${process.pid}`);
    require('./server');
}
