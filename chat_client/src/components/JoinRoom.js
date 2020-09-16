import React from 'react';
import {List, ListItem,ListItemText} from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    joinRoom: {
      width: '100%',
      height: '100%',
      backgroundColor: theme.palette.background.paper,
      position: 'relative',
      overflow: 'auto',
      
    },
  }));

const JoinRoom = (props) => {
    const classes = useStyles();
    return(
        <List component="nav" className={classes.joinRoom} aria-label="main mailbox folders">
            {props.joinRooms.map((room) => {
                return(<ListItem button key={room} >
                  <ListItemText primary={room}/>
                  <RemoveIcon onClick={()=>{}}/>
                  </ListItem>);
            })}
        </List>
    );
};

export default JoinRoom;