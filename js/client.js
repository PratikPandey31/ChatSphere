
const socket = io('http://localhost:5500');
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');
var audio = new Audio('event.mp3');



const threeDots = document.getElementById('threeDots');
messageInp.addEventListener("focus", function (e) {
    threeDots.classList.toggle('typing');
});
messageInp.addEventListener("blur", function (e) {
    threeDots.classList.toggle('typing');
});


const append = (message, position) => {
    const innerDiv = document.createElement('div');
    messageContainer.appendChild(innerDiv);
    const messageElement = document.createElement('div');
    const senderName = message.split(':')
    messageElement.className = `${messageElement.className} ${position}`;
    messageContainer.append(messageElement);
    if(position==='right'){
        messageElement.innerText = message;       
        innerDiv.className = 'leftCorner';
        innerDiv.innerText = 'You';
    } else if(position==='left'){
            messageElement.innerText = senderName[1];
            innerDiv.className = 'rightCorner';
            innerDiv.innerText = senderName[0];            
        } else {
            messageElement.innerText =  message;
        }
    if(position!== 'right'){
    audio.play();
    }
};

form.addEventListener('submit', event => {
    event.preventDefault(); 

    const message = messageInput.value;
    append(`${message}`, 'right'); 
    socket.emit('send', message);

    messageInput.value = ''; 
});

const username = prompt('Enter your name to join');
socket.emit('new-user-joined', username);

socket.on('user-joined', data => {
    append(`${data} joined the chat`, 'center');
});

socket.on('receive', dat => {
    append(`${dat.data }: ${dat.message}`, 'left');
});

socket.on('left', dat => {
    append(`${dat} left the chat`, 'center');
});





