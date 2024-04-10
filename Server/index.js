const { Server } = require("socket.io");
const http = require("http");

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"] 
  }
});

const users = {};

io.on('connection', socket => {
    socket.on('new-user-joined', data => {
        users[socket.id] = data;
        socket.broadcast.emit("user-joined", data);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, data: users[socket.id] });
    });
    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
});

server.listen(5500, () => {
  console.log('Socket.IO server listening on port 5500');
});
