const net = require('net');
const server = net.createServer();

let sockets = {};

server.on('connection', socket => {
    console.log("New connection!");

    socket.write(`Welcome! Please enter your name: `);

    socket.on('data', data => {
        if (!socket.name) {
            socket.name = data.toString().trim();
            sockets[socket.name] = socket;

            Broadcast(socket.name, `MOD: ${socket.name} has joined the chatroom\n`);
        } else {
            Broadcast(socket.name, `${socket.name}: ${data}`);
        }
    });

    socket.on('end', () => {
        if (socket.name) {
            delete sockets[socket.name];
            console.log(`Client '${socket.name}' has disconnected`);

            Broadcast(socket.name, `MOD: ${socket.name} has disconnected\n`);
        } else {
            console.log(`An anonymous client has disconnected`);
        }
    })
});

server.listen(8000, () => console.log("Server is running!"));

function Broadcast (sender, msg) {
    Object.entries(sockets).forEach(([name, socket]) => {
        if (name !== sender) socket.write(msg);
    });
}
