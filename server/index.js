import { createServer } from 'node:http';
import { Server as WebSocketServer } from 'socket.io';
import app from './app.js';
import { connectDB } from './db.js';

connectDB();

const server = createServer(app);
const io = new WebSocketServer(server, {
    connectionStateRecovery: {}
});

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

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});




























// import express from 'express';
// import logger from 'morgan';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// import { Server } from 'socket.io';
// import { createServer } from 'node:http';

// import { connectDB } from './db.js'

// connectDB()

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// const port = process.env.PORT ?? 3000;
// const app = express();
// const server = createServer(app);
// const io = new Server(server, {
//     connectionStateRecovery: {}
// });

// app.use(express.static(path.join(__dirname, '../client')));

// io.on('connection', (socket) => {
//     console.log('a user coneccted');

//     socket.on('disconnect', () =>{
//         console.log('an user disconnected');
//     });
//     socket.on('chat message', (msg) => {
//         io.emit('chat message', msg);
//         console.log('chat message: ' + msg);
//     });
// });

// app.use(logger('dev'))

// app.get('/', (req, res) => {
//     res.sendFile(process.cwd() + '../client/index.html')
// });

// server.listen(port, () => { 
//     console.log('Port running on port ' + port);
// });


