import React, {useState, useEffect} from 'react';
import {ListItem,Divider,Grid,TextField,Button} from '@material-ui/core';
import PublicRoom from './PublicRoom';
import JoinRoom from './JoinRoom';
import ChatBox from './ChatBox';
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/core/styles';
import io from 'socket.io-client';

const useStyles = makeStyles((theme) => ({
    join: {
      width: '50%',
      backgroundColor: theme.palette.background.paper,
      height: '500px',
      margin: 'auto',
      marginTop: '50px',
    },
    roomArea: {
        height: '100%',
        position: 'relative',
    },
    chatArea: {
        height: '100%',
    },
    grid: {
        backgroundColor: '#4fb9ff',
        position: 'relative',
        height: '100%'
    },
    joinRoom: {
        height:'40%',
    },
    publicRoom: {
        height: '59%',
        borderTop: '2px solid #4fb9ff',
    },
    username: {
        marginBottom: '20px'
    },
    changename: {
        marginBottom: '20px',
        marginLeft: '10px',
        height: '56px'
    },
    userMessage: {
        marginTop: '15px',
        backgroundColor: 'white',
        width: '80%'
    },
    sendMessage: {
        marginTop: "20px",
        marginLeft: "15px"
    }
    
  }));

const ENDPOINT = 'http://192.168.1.119:5000/';

let socket;
const Join = () => {
    const [userName, setUserName] = useState('');
    const [rooms, setRooms] = useState([]);
    const [joinRooms, setJoinRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState('');
    // let selectedRoom = '';
    const [allMessage,setAllMessage] = useState([])
    const classes = useStyles();
    
    const addRoom = (roomName) => {
        if (userName === ""){
            console.log("You have to select an username!");
        } else {
            setSelectedRoom(roomName);
            socket.emit("addRoomToUser",{userName,roomName},(message)=>{
                console.log(message);
                return
            });
            console.log(`Room ${selectedRoom} selected`);
        }
        
    };

    const leaveRoom = (roomName) => {
        socket.emit("removeRoomFromUser",{userName,roomName},(message)=>{
            console.log(message);
        });
        setAllMessage((prep)=>prep.filter(item=>item.room!==roomName));
    }
    

    useEffect(()=>{
        socket = io(ENDPOINT);
        // console.log(name);
        // console.log(name);
        socket.on("getAllRooms", (data) =>{
            // console.log(data.rooms.map(ele=>ele.name));
            // console.log(data.rooms);
            setRooms(data.rooms);
        });

        socket.on("getUserRooms", (data) =>{
            setJoinRooms(data.rooms);
        });
        socket.on("sendMessageToRoom",(data)=>{
            console.log("hello1");
            const user = data.userName;
            const message = data.userMessage;
            const room = data.roomName;
            setAllMessage((prep)=>[...prep,{room,user,message}]);
        });
    },[]);


    useEffect(()=>{
        
    },[selectedRoom])

    useEffect(()=>{
        if (!joinRooms.includes(selectedRoom) && joinRooms.length != 0)
            setSelectedRoom(joinRooms[0]);
        if (joinRooms.length == 0)
            setSelectedRoom("");
    },[joinRooms]);

    useEffect(()=>{
        // console.log(allMessage);
    },[allMessage]);

    useEffect(()=>{
        socket.emit("addUser", {user:userName}, (message) => {
            console.log(message);
            return
        });
    },[userName]);

    const changeNameHandler = ()=>{
        const username = document.getElementById('username').value;
        if (username == "") console.log("Username cannot be empty string");
        else setUserName(username);
    };
    const sendMessageHandler = () => {
        const userMessage = document.getElementById('message').value;
        if (userMessage == "") return;
        else if (selectedRoom === "") console.log("Need to select a room!");
        else
        socket.emit("sendMessage", {userName,userMessage,selectedRoom}, (message) => {
            console.log(message);
            return;
        });
        document.getElementById('message').value = "";
    };

    const selectRoomChat = (name) => {
        setSelectedRoom(name);

        console.log(`Room ${selectedRoom} selected`);
    };

    return(
        <div className={classes.join}>
            <TextField id="username" className={classes.username} label="Username" variant="outlined" />
            <Button variant="contained" id="changename" onClick={changeNameHandler} className={classes.changename} color="primary">Change Name</Button>
            <Grid container className={classes.grid} spacing={1}>
                <Grid item className={classes.roomArea} xs={3} >
                    <Grid container className={classes.joinRoom} spacing={1}>
                        <Grid item xs={12}>
                            <JoinRoom joinRooms={joinRooms} leaveRoom={leaveRoom} selectRoom={selectRoomChat}/>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid container className={classes.publicRoom} spacing={1}>
                        <Grid item xs={12}>
                        <PublicRoom rooms={rooms} joinRooms={joinRooms} addRoom={addRoom}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item className={classes.chatArea} xs={9}>
                    <ChatBox allMessage={allMessage} selectedRoom={selectedRoom} isEmpty={allMessage.length==0}/>
                    <TextField id="message" className={classes.userMessage} variant="outlined" 
                                onKeyDown={(ev) => {
                                    ev.target.blur();
                                    if (ev.key === 'Enter') {
                                       
                                        document.getElementById('sendMessage').click();
                                    }
                                    ev.target.focus();
                                }} />
                    <Button variant="contained" id="sendMessage" onClick={sendMessageHandler} className={classes.sendMessage} color="primary">
                        <SendIcon />
                    </Button>
                </Grid>
            </Grid>
            
        </div>
        
    );
};

export default Join;