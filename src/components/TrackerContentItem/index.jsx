import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import {red, lightBlue, orange, green, blueGrey} from '@material-ui/core/colors/';
import { KeyRecovery, KeyDeaths, KeyActiveCases, KeyConfirmed } from '../../constants/Keys';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LabelNew } from '../../constants/String';
import './index.css';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      textAlign: 'right',
      color: theme.palette.text.secondary,
    },
    dividermargin: {
        marginBottom: theme.spacing(1)
    },
    paperIconHolder: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        width: "80px",
        height: "80px",
        float: "left",
        marginTop: "-40px",
    },
    paperBlue: {
        backgroundColor: "blue",
    },
    subContent: {
        textAlign: "left",
        display: "flex",
        flexDirection: "row",
        fontSize: theme.spacing(2)
    },
    marginLeft: {
        marginLeft: theme.spacing(1)
    },
    label: {
        fontSize: theme.spacing(2)
    },
    content: {
        fontSize: "30px",
        marginTop: "10px",
        marginBottom: "10px"
    },
    contentIcon: {
        width: "100% !important",
        height: "100% !important",
        color: blueGrey[50]
    },
    extraContent: {
        float: 'right'
    },
    flexOne: {
        flex: 1
    },
}));

const IconDetail = (key, classes) => {
    let color, icon;

    switch(key){
        case KeyRecovery:
            color = green[500];
            icon = <FontAwesomeIcon icon="user-shield" className={classes.contentIcon}/>;
            break;
        case KeyDeaths:
            color = red[500];
            icon = <FontAwesomeIcon icon="skull-crossbones" className={classes.contentIcon}/>;
            break;
        case KeyActiveCases:
            color = lightBlue[500];
            icon = <FontAwesomeIcon icon="users" className={classes.contentIcon}/>;
            break;
        case KeyConfirmed:
            color = orange[500];
            icon = <FontAwesomeIcon icon="viruses" className={classes.contentIcon}/>;
            break;
        default:
            color = lightBlue[500];
            icon = <FontAwesomeIcon icon="info-circle" className={classes.contentIcon}/>;
            break;
    }

    return {
        color: color,
        icon: icon
    }
}

const GridItemContent = ({label, color, content, icon, extra, recordDate}) => {
    const classes = useStyles();
    let extraContent = "";
    if( extra != null ){
        extraContent += "+" + extra.value + " " + LabelNew;
    }

    return (
        <Grid item xs={3} className="trackerItem">
            <Paper className={classes.paper}>
                <Paper elevation={3} className={classes.paperIconHolder} style={{backgroundColor: color}}>
                    {icon}
                </Paper>
                <span className={classes.label}>{label}</span>
                <h3 className={classes.content}>{content}</h3>
                <Divider className={classes.dividermargin} />
                <div className={classes.subContent}>
                    <div className={classes.flexOne}>
                        <FontAwesomeIcon icon="history" />
                        <span className={classes.marginLeft}>Date Updated: {recordDate}</span>
                    </div>
                    <span className={classes.extraContent}>
                        <b>{extraContent}</b>
                    </span>
                </div>
            </Paper>
        </Grid>
    )
}

export const TrackerContentItem = (props) => {
    const classes = useStyles();
    const list = props.list;
    const recordDate = props.recordDate;

    let styleDetail = IconDetail("", classes);

    list.map((value, index) => {
        styleDetail = IconDetail(value.key, classes);
        value.icon = styleDetail.icon;
        value.color = styleDetail.color;
    });

    return (
        <React.Fragment>
            {list.map((value, index) => (<GridItemContent  label={value.label} content={value.value} color={value.color} icon={value.icon} extra={value.extra} recordDate={recordDate}/>))}
        </React.Fragment>
    );
}

TrackerContentItem.propTypes = {
    styles: PropTypes.any.isRequired,
    text: PropTypes.string,
    list: PropTypes.array
}
