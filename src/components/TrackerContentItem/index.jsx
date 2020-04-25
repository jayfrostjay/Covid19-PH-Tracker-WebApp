import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
}));

export const TrackerContentItem = (props) => {
    const classes = useStyles();
    const text = props.text;
    return (
        <React.Fragment>
            <Grid item xs={3}>
                <Paper className={classes.paper}>{text}</Paper>
            </Grid>
            <Grid item xs={3}>
                <Paper className={classes.paper}>{text}</Paper>
            </Grid>
            <Grid item xs={3}>
                <Paper className={classes.paper}>{text}</Paper>
            </Grid>
            <Grid item xs={3}>
                <Paper className={classes.paper}>{text}</Paper>
            </Grid>
        </React.Fragment>
    );
}

TrackerContentItem.propTypes = {
    styles: PropTypes.any.isRequired,
    text: PropTypes.string
}
