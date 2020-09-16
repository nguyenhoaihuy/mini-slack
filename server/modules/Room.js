rooms = [{ id: 'id1600114015791', name: 'hello1', status: 'p2p' },
        { id: 'id1600114015793', name: 'hello2', status: 'p2p' },
        { id: 'id1600114015799', name: 'hello3', status: 'p2p' }]

addRoom = (name,status) => {
    name = name.trim().toLowerCase();

    const existingRoom = rooms.find((room,status) => room.name === name);
    if (existingRoom) {
        return {error: 'Room is existing'};
    }

    const id = 'id' + (new Date()).getTime();
    const room = {id,name,status};
    rooms.push(room);
    return {room}
}

removeRoom = (id) => {
    const index = rooms.findIndex((room)=>room.id === id);

    if (index !== -1){
        return rooms.splice(index,1)[0];
    }
}

getRoomByName = (name) => rooms.find((room) => room.name === name);

getRoomByID = (id) => rooms.find((room) => room.id === id)

isRoomExisting = (id) => {
    return rooms.findIndex((room)=>room.id === id) !== -1
}

getAllRooms = () => {return {rooms}}

module.exports = {addRoom,removeRoom,getRoomByName,getRoomByID,isRoomExisting,getAllRooms};