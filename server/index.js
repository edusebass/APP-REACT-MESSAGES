import express from 'express';
import logger from 'morgan';

import { Server } from 'socket.io';
import { createServer } from 'node:http';

import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = process.env.PORT ?? 3000;
const app = express();
const server = createServer(app);
const io = new Server(server, {
    connectionStateRecovery: {}
});

app.use(logger('dev'))
app.use(express.static(path.resolve(__dirname, '../client')));

io.on('connection', (socket) => {
    console.log('a user coneccted');

    socket.on('disconnect', () =>{
        console.log('an user disconnected');
    });
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
        console.log('chat message: ' + msg);
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/index.html'));
});


server.listen(port, () => { 
    console.log('Port running on port ' + port);
    console.log('directiorio: ' + __dirname + 'nombre: ' +  __filename)
});