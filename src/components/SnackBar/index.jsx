import React from 'react';
import PropTypes from 'prop-types';
import { Snackbar, SnackbarContent, IconButton } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';  

const VERTICAL_BOTTOM = 'bottom';
const VERTICAL_CENTER = 'center';
const VERTICAL_TOP = 'top';

const HORIZONTAL_LEFT = 'left';
const HORIZONTAL_CENTER = 'center';
const HORIZONTAL_RIGHT = 'right';

const DEFAULT_DURATION = 3000;

const TYPE_DEFAULT = "info";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SnackBar(open, vertical, horizontal, duration, message, type, closeCallback){
    return (
        <Snackbar 
        anchorOrigin={{vertical: vertical, horizontal: horizontal}}
        open={open}
        autoHideDuration={duration}
        onClose={closeCallback}>
            <Alert severity={type} onClose={closeCallback}>{message}</Alert>
        </Snackbar>
    )
}

export const BottomRightSnackBar = (props) => {
    const duration = (props.duration != null) ? props.duration : DEFAULT_DURATION;
    const message = props.message;
    const open = props.open;
    const onClose = props.onClose;
    const type = (props.type != null) ? props.type : TYPE_DEFAULT;
    return SnackBar(open, VERTICAL_BOTTOM, HORIZONTAL_RIGHT, duration, message, type, onClose);
}

BottomRightSnackBar.propTypes = {
    duration: PropTypes.int,
    color: PropTypes.string,
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
}
