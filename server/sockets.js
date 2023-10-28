import Note from '../schema/Note.js';
import { Server as WebSocketServer } from 'socket.io';

export function initSocket(server) {
    const io = new WebSocketServer(server, {
        connectionStateRecovery: {}
    });

    io.on('connection', async (socket) => {
        console.log('a user connected');

        socket.on('disconnect', () => {
            console.log('a user disconnected');
        });

        // const messages = await Note.find();
        // socket.emit('initial messages', messages);

        const emitNotes = async () => {
            try {
                const notes = await Note.find();
                console.log('Notas obtenidas de la base de datos:', notes);
                socket.emit('initial messages', notes);
            } catch (error) {
                console.error('Error al obtener notas:', error);
            }const notes = await Note.find();
            console.log(notes)
        }
        emitNotes();


        socket.on('chat message', async (msg) => {
            io.emit('chat message', msg);
            console.log('chat message: ' + msg);
            const newNote = new Note({ msg });
            try {
                const savedNote = await newNote.save();
                console.log('Mensaje guardado en la base de datos:', savedNote);
            } catch (error) {
                console.error('Error al guardar el mensaje:', error);
            }
        });

        socket.on('get messages', async () => {
            try {
                const messages = await Note.find();
                socket.emit('chat messages', messages);
            } catch (error) {
                console.error('Error al obtener mensajes:', error);
            }
        });
    });

    return io;
}
