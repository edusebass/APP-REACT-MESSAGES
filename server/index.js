const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
});

app.use(express.static(path.resolve(__dirname, '../client/')));

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
        console.log('chat message: ' + msg);
    });
});

// Ruta para servir el archivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log('Server running on port ' + port);
});
