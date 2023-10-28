import { io } from 'https://cdn.socket.io/4.3.2/socket.io.esm.min.js';
const socket = io();

const messages = document.getElementById('messages');
const form = document.getElementById('form');
const inputMessage = document.getElementById('input');
const nombreInput = document.getElementById('nombreInput');

socket.on('initial messages', (msgs) => {
    msgs.forEach(msg => {
        const item = `<li> <span>${msg.nombre}</span> <br> ${msg.msg}</li>`;
        messages.insertAdjacentHTML('beforeend', item);
    });
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = nombreInput.value;
    const message = inputMessage.value;
    if (message && nombre) {
        socket.emit('chat message', { messageNombre: nombre, message });
        nombreInput.value = '';
        inputMessage.value = '';
    }
});

socket.on('chat message', (msg) => {
    const item = `<li> <span>${msg.messageNombre}</span> <br> ${msg.message}</li>`;
    messages.insertAdjacentHTML('beforeend', item);
});
