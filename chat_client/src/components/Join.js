import React, {useState, useEffect} from 'react';
import {ListItem,Divider,Grid,TextField,Button} from '@material-ui/core';
import PublicRoom from './PublicRoom';
import JoinRoom from './JoinRoom';
import ChatBox from './ChatBox';
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
        marginLeft: '10px'
    }
    
  }));

const ENDPOINT = 'localhost:5000';

let socket;
let disconnect = false;
const Join = () => {
    const [userName, setUserName] = useState('');
    let [rooms, setRooms] = useState([]);
    let [joinRooms, setJoinRooms] = useState([]);
    const classes = useStyles();
    const name_default = "huy";
    
    const addRoom = (roomName) => {
        socket.emit("addRoomToUser",{userName,roomName},(message)=>{
            console.log(message);
        });
    };
    useEffect(()=>{
        socket = io(ENDPOINT);
        // console.log(name);
        setUserName(name_default);
        console.log(1);
        // console.log(name);
        socket.on("getAllRooms", (data) =>{
            // console.log(data.rooms.map(ele=>ele.name));
            // console.log(data.rooms);
            setRooms(data.rooms);
        });

        socket.on("getUserRooms", (data) =>{
            setJoinRooms(data.rooms);
        });

        // socket.on("connect", () => {
            
        // })
        

        // socket.on('sendroom', (data)=>{
            
        //     //console.log(rooms);
        // });
        // socket.on('disconnect',() => {
        //     console.log(socket)
        // });
    },[]);

    // useEffect(()=>{
    //     socket.emit("addUser", {user:userName}, (message) => {
    //         console.log(message);
    //     });
    // },[userName]);

    const changeNameHandler = ()=>{
        const username = document.getElementById('username').value;
        if (username == "") console.log("Username cannot be empty string");
        else
        socket.emit("addUser", {user:username}, (message) => {
            console.log(message);
            return
        });
        setUserName(username);
    };
    return(
        <div className={classes.join}>
            <TextField id="username" className={classes.username} label="Outlined" variant="outlined" />
            <Button variant="contained" id="changename" onClick={changeNameHandler} className={classes.changename} color="primary">Change Name</Button>
            <Grid container className={classes.grid} spacing={1}>
                <Grid item className={classes.roomArea} xs={3} >
                    <Grid container className={classes.joinRoom} spacing={1}>
                        <Grid item xs={12}>
                            <JoinRoom joinRooms={joinRooms} />
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
                    <ChatBox />
                </Grid>
            </Grid>
            
        </div>
        
    );
};

export default Join;