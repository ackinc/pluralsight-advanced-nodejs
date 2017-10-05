const EventEmitter = require('events');
const readline = require('readline');

const client = new EventEmitter();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (input) => {
    let [command, ...args] = input.split(' ');
    client.emit('command', command, args);
});

const server = require('./server')(client);

server.on('response', (result) => {
    if (result === 'EXIT') rl.close();
    else console.log(`${result}`);
});
