import React from 'react';
import PropTypes from 'prop-types';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.appBar + 1,
        color: '#fff',
    },
}));

export const BackDropBlock = (props) => {
    const backDropOpen = props.status;
    const classes = useStyles();
    const backDropClassname = (props.bdclass != null) ? props.bdclass : classes.backdrop;
    return (
        <Backdrop className={backDropClassname} open={backDropOpen} >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

BackDropBlock.propTypes = {
    styles: PropTypes.bool.isRequired
}
