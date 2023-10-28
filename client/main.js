import { io } from 'https://cdn.socket.io/4.3.2/socket.io.esm.min.js';
const socket = io();

const messages = document.getElementById('messages');
const form = document.getElementById('form');
const inputMessage = document.getElementById('input');
const nombreInput = document.getElementById('nombreInput');

socket.on('initial messages', (msgs) => {
    msgs.forEach(msg => {
        const item = `
        <li>
            <div class="cabMsg">
                <span>${msg.nombre}</span><span class="spanFecha">${msg.fecha}</span></p> 
            </div>
            <p>${msg.msg}
        </li>
        `;
        messages.insertAdjacentHTML('beforeend', item);

        messages.scrollTop = messages.scrollHeight;
    });
});


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = nombreInput.value;
    const message = inputMessage.value;
    const fecha = new Date().getFullYear() + "/" + new Date().getMonth() + "/" + new Date().getDate() + " " + new Date().getHours() 
    + ":" + String(new Date().getMinutes()).padStart(2, '0');;
    if (message && nombre) {
        socket.emit('chat message', { 
            messageNombre: nombre, 
            messageChat: message,
            fechaMsg: fecha});
        nombreInput.value = '';
        inputMessage.value = '';
    }
});

socket.on('chat message', (msg) => {
    const item = `
    <li>
        <div>
            <span>${msg.messageNombre}</span> <span class="spanFecha">${msg.fechaMsg}</span> 
        </div>
        <p>${msg.messageChat}</p> 
    </li>
    `;
    messages.insertAdjacentHTML('beforeend', item);

    messages.scrollTop = messages.scrollHeight;
});
