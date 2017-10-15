const http = require('http');

http.createServer((req, res) => {
    for (let i = 0; i < 1e7; i++) ;
    res.end("Hi there!");
}).listen(8000, () => {
    console.log(`PID ${process.pid}: Server listening on port 8000`);
});

// setTimeout(() => {
//     console.log(`PID ${process.pid} is crashing`);
//     process.exit(1);
// }, Math.random() * 10000);
