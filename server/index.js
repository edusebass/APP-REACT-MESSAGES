import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(process.cwd(), 'client')));

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('a user disconnected');
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
        console.log('chat message: ' + msg);
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'client', 'index.html'));
});

export default server;
