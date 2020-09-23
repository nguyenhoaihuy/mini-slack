import React, { useState, useEffect } from 'react';
import {List, ListItem,ListItemText,Icon} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    publicRoom: {
      width: '100%',
      height: '100%',
      backgroundColor: theme.palette.background.paper,
      position: 'relative',
      overflow: 'auto',
      borderTop: '4px solid #4fb9ff',
    },
    addIcon: {
      color: "#0aab4d"
    }
  }));

const PublicRoom = (props) => {
    const classes = useStyles();
    const [rooms,setRooms] = useState([]);
    const [joinRooms,setJoinRooms] = useState([]);
    useEffect(()=>{
      setRooms(props.rooms);
      setJoinRooms(props.joinRooms);
    },[props]);
    return(
        <List component="nav" className={classes.publicRoom} aria-label="main mailbox folders">
            {rooms.map((room) => {
              if (joinRooms.includes(room.name)){
                return(<ListItem button disabled key={room.id} >
                  <ListItemText primary={room.name}/>
                  <AddIcon onClick={()=>{props.addRoom(room.name)}}/>
                  </ListItem>);
              } else {
                return (<ListItem button  key={room.id} >
                  <ListItemText primary={room.name}/>
                  <AddIcon className={classes.addIcon} onClick={()=>{props.addRoom(room.name)}} />
                  </ListItem>);
              }
              
            })}
            
            {/* <ListItem button>
            <ListItemText primary="Room 2" />
            </ListItem>
            <ListItem button>
            <ListItemText primary="Room 1" />
            </ListItem>
            <ListItem button>
            <ListItemText primary="Room 2" />
            </ListItem>
            <ListItem button>
            <ListItemText primary="Room 1" />
            </ListItem>
            <ListItem button>
            <ListItemText primary="Room 1" />
            </ListItem>

            <ListItem button>
            <ListItemText primary="Room 1" />
            </ListItem>
            <ListItem button>
            <ListItemText primary="Room 1" />
            </ListItem> */}
        </List>
    );
};

export default PublicRoom;