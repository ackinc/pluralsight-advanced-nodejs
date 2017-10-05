const fs = require('fs');
const server = require('https').createServer({
    key: fs.readFileSync('./ssl_creds/key.pem'),
    cert: fs.readFileSync('./ssl_creds/cert.pem')
});

const PORT = 443;
const DATA = {"name": "Anirudh", "age": 26, "sex": "male"};

server.on('request', (req, res) => {
    console.log("Received a request!");

    switch (req.url) {
        case "/home":
        case "/about":
        case "/acknowledgements":
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(fs.readFileSync(`.${req.url}.html`));
            break;
        case "/api":
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(DATA));
            break;
        case "/":
            res.writeHead(301, {"Location": "/home"})
            res.end();
            break;
        default:
            res.writeHead(404);
            res.end();
            break;
    }

    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.end('Hello world!\n');
});

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
});
