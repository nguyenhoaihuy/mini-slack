import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    alert: {
      marginBottom: "20px"
    },
  }));

const Popup = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    useEffect(()=>{
        // console.log(props.notification.status)
        setOpen(props.notification.status=="show");
        // const timer = setTimeout(() => {
        //     setStatus("hide");
        // }, 5000);
          
    },[props]);
    return(
        <div className={classes.root}>
            <Collapse in={open}>
                <Alert className={classes.alert} severity={props.notification.severity}
                action={
                    <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        setOpen(false);
                        props.disableAlert();
                    }}
                    >
                    <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                >
                {props.notification.message}
                </Alert>
            </Collapse>
        </div>
    );
};

export default Popup;