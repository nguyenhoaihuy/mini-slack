import React from 'react';
import {Paper,List,ListItemText} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    chatScreen: {
        height: '80%',
        padding: '10px',
    }
  }));

const ChatBox = () => {
    const classes = useStyles();
    return(
        <Paper className={classes.chatScreen} elevation={0}  >
            <List component="nav">
                <ListItemText><span>Message1</span></ListItemText>
                <ListItemText><span>Message1</span></ListItemText>
                <ListItemText><span>Message1</span></ListItemText>
                <ListItemText><span>Message1</span></ListItemText>
                <ListItemText><span>Message1</span></ListItemText>
                <ListItemText><span>Message1</span></ListItemText>
            </List>
        </Paper>
    );
};

export default ChatBox;