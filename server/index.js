const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const router = require('./router');
const {addRoom,removeRoom,getRoomByName,getRoomByID,isRoomExisting,getAllRooms} =require('./modules/Room');
const {addUser,removeUser,getUserByName,isUserExisting,addRoomToUser,getUserRooms} =require('./modules/User');

const app = express();
const server = http.createServer(app)
const io = socketio(server,{
    pingTimeout: 30000,
  });
const PORT = 5000||process.env.PORT;

io.on('connection', (socket) => {
    const rooms = getAllRooms();
    socket.emit('getAllRooms', rooms);
    socket.on('connection', () => {
        console.log("new connect");
    });

    socket.on('addUser', (data,callback)=>{
        const id = socket.id;
        const {error,user} = addUser(data.user,id);
        if (error) {
            callback(error);
            console.log(error);
        }
    });
    
    // socket.on("sendroom", () => {
    //     let {error,room} = addRoom("hello1","p2p");
    //     if (error){
    //         console.log(error);
    //     }
    //     console.log(room);
    //     error,room = addRoom("hello2","p2p");
    //     if (error){
    //         console.log(error);
    //     }
    //     console.log(room);
    //     error,room = addRoom("hello3","p2p");
    //     if (error){
    //         console.log(error);
    //     }
    //     console.log(room);
    // });
    
    socket.on('addRoomToUser', ({userName,roomName},callback) =>{
        console.log(userName); 
        const {error,rooms} = addRoomToUser(userName,roomName);
        if (error){
            callback(error);
        }
        else {
            socket.join(roomName);
            socket.emit('getUserRooms', {rooms});
        }
    });
    socket.on('removeRoomFromUser', ({userName,roomName},callback) =>{
        console.log(userName); 
        const {error,rooms} = removeRoomFromUser(userName,roomName);
        if (error){
            callback(error);
        }
        else {
            console.log(rooms);
            socket.leave(roomName);
            socket.emit('getUserRooms', {rooms});
        }
    });
    socket.on('disconnect', () => {
        console.log(removeUser(socket.id));
        console.log('User had left!!! '+socket.id);
    });
    socket.on('sendMessage', ({userName,userMessage,selectedRoom}) => {
        roomName = selectedRoom;
        console.log("kekek");
        io.to(roomName).emit('sendMessageToRoom',{roomName,userName,userMessage});
    });
    socket.on('reconnect', () => {
        console.log("reconnected");
    });
});

app.use(router);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));