import React, { useRef, useState, useEffect } from 'react';
import {Paper,List,ListItemText} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    chatScreen: {
        height: '80%',
        padding: '10px',
        overflowY: 'auto'
    }
  }));

const ChatBox = (props) => {
    const classes = useStyles();
    const messagesEnd = useRef(null);
    const scrollToBottom = () => {
        if (messagesEnd && messagesEnd.current) {
            messagesEnd.current.scrollIntoView({ behavior: "smooth" });
        }
    };
    useEffect(() => {
        if (document.getElementById("chatScreen")!=null && document.getElementById("scroll")!=null)
        document.getElementById("chatScreen").scrollTop = document.getElementById("scroll")==null?0:document.getElementById("scroll").scrollHeight;
    },[props]);
    useEffect(()=>{
        // props.allMessage.find((room)=>room.room===props.seletedRoom).map((item)=>{
        //     console.log(item.user);
        // })
        console.log(props.allMessage.filter(i=>i.room===props.selectedRoom));
        // if (props.allMessage.length !== 0)
        //     console.log(props.allMessage.find((room)=>{
        //         return room.room===props.selectedRoom;}).messages);
    },[props]);
    
    if (!props.isEmpty){
        return(
            <Paper className={classes.chatScreen} elevation={0} id="chatScreen" >
                <List id="scroll" component="nav">
                    {
                        props.allMessage.filter(i=>i.room===props.selectedRoom).map((item)=>{
                            return(<ListItemText><span>{item.user}: </span><span>{item.message}</span></ListItemText>);
                        })
                        
                    }
                </List>
            </Paper>
        );
    }
    
    else 
    return(
        <Paper className={classes.chatScreen} elevation={0}  >
            <List component="nav">
            </List>
        </Paper>
    );
};

export default ChatBox;