const {addRoom,removeRoom,getRoomByName,getRoomByID,isRoomExisting} =require('./Room');
users = [];

addUser = (name,id) => {
    name = name.trim().toLowerCase();
    console.log(users)
    const existingUser = users.findIndex((user) => user.name === name);
    if (existingUser!==-1) {
        return {error:`The user ${name} already existed`};
    }
    const existingSocket = users.findIndex((user) => user.id === id);
    if (existingSocket!==-1) {
        users[existingSocket].name = name;
        return {user:users[existingSocket]};
    }

    let rooms = [];
    let user = {name,rooms,id};
    users.push(user);
    console.log(users);
    return {user}
}

removeUser = (id) => {
    const index = users.findIndex((user)=>user.id === id);

    if (index !== -1){
        return users.splice(index,1)[0];
    }
}

getUserByName = (name) => {
    name = name.trim().toLowerCase();
    return users.find((user) => user.name === name)
};

isUserExisting = (id) => {
    return users.findIndex((user)=>user.id === id) !== -1
}

addRoomToUser = (username,roomname) => {
    username = username.trim().toLowerCase();
    const existingUser = users.findIndex((user) => user.name === username);
    if (existingUser === -1) return {error: `The user ${username} does not exist`};
    const foundroom = users[existingUser].rooms.findIndex((room) => room===roomname);
    if (foundroom !== -1) return {error: `The user ${username} is already in the room ${roomname}`};
    
    users[existingUser].rooms.push(roomname);
    return {rooms:users[existingUser].rooms};
}

removeRoomFromUser = (username,roomname) => {
    username = username.trim().toLowerCase();
    const existingUser = users.findIndex((user) => user.name === username);
    if (existingUser === -1) return {error: `The user ${username} does not exist`};
    const foundroom = users[existingUser].rooms.findIndex((room) => room===roomname);
    if (foundroom === -1) return {error: `The user ${username} is not in the room ${roomname}`};
    
    users[existingUser].rooms = users[existingUser].rooms.filter((room) => room !== roomname);
    console.log(users);
    return {rooms:users[existingUser].rooms};
}

getUserRooms = (name) => {
    const existingUser = users.findIndex((user) => user.name === username);
    if (existingUser === -1) return {error: `The user ${username} does not exist`};
    return {rooms:users[existingUser].rooms};
}

module.exports = {addUser,removeUser,getUserByName,isUserExisting,addRoomToUser,getUserRooms};