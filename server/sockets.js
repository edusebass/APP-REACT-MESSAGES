import Note from '../schema/Note.js';
import { Server as WebSocketServer } from 'socket.io';

export function initSocket(server) {
    const io = new WebSocketServer(server, {
        connectionStateRecovery: {}
    });

    io.on('connection', async (socket) => {
        console.log('Un usuario se ha conectado');

        socket.on('disconnect', () => {
            console.log('Un usuario se ha desconectado');
        });

        const emitNotes = async () => {
            try {
                const notes = await Note.find();
                console.log('Mensajes obtenidos de la base de datos:', notes);
                socket.emit('initial messages', notes);
            } catch (error) {
                console.error('Error al obtener mensajes:', error);
            }
        };
        emitNotes();

        socket.on('chat message', async (msg) => {
            io.emit('chat message', msg);
            console.log('Mensaje de chat recibido:', msg.messageNombre, msg.message);
            try {
                const newNote = new Note({ msg: msg.message, nombre: msg.messageNombre });
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
