
const socket = io('http://localhost:5500');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');
var audio = new Audio('event.mp3');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.className = `${messageElement.className} ${position}`;
    messageContainer.append(messageElement);
    if(position!== 'right'){
    audio.play();
    }
};

form.addEventListener('submit', event => {
    event.preventDefault(); 

    const message = messageInput.value;
    append(`You: ${message}`, 'right'); 
    socket.emit('send', message);

    messageInput.value = ''; 
});

const username = prompt('Enter your name to join');
socket.emit('new-user-joined', username);

socket.on('user-joined', data => {
    append(`${data}: joined the chat`, 'right');
});

socket.on('receive', dat => {
    append(`${dat.data }: ${dat.message}`, 'left');
});

socket.on('left', dat => {
    append(`${dat} left the chat`, 'left');
});





