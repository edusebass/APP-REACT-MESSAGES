import { io } from 'https://cdn.socket.io/4.3.2/socket.io.esm.min.js';
const socket = io();

const messages = document.getElementById('messages');

socket.on('initial messages', (msgs) => {
    msgs.forEach(msg => {
        const item = `<li>${msg.msg}</li>`;
        messages.insertAdjacentHTML('beforeend', item);
    });
});

const form = document.getElementById('form');
const input = document.getElementById('input');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', input.value);
        input.value = '';
    }
});

socket.on('chat message', (msg) => {
    const item = `<li>${msg}</li>`;
    messages.insertAdjacentHTML('beforeend', item);
});
