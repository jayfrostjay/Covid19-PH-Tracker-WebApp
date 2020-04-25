import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import makeStyles from '@material-ui/core/styles/makeStyles';

import BaseComponent from '../common/BaseComponent.ts';
import Container from '@material-ui/core/Container';
import NeroBird from '../../images/test.jpg';
import { AppName, DevelopedIn, ReactJS, DataSources, DataSourceRapidApi, DataSourceHeroku, Version, Copyrights,
         RepositoryLink, ReactJsLink, DataRapidApiLink, DataHerokuLink, DebugText } from '../../constants/String';

const useStyle = makeStyles((theme) => ({
    aboutcontainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        height: '80vh',
        alignItems: 'center'
    },
    aboutinnercontainer: {
        display: 'block',
        width: '100%',
        textAlign: 'center'
    },
    avatar: {
        margin: 'auto',
        height: '180px',
        width: '180px'
    },
    detailMarginTop: {
        margin: '45px'
    },
    textLink: {
        color: 'inherit',
        textDecoration: 'none'
    }
}));

const AboutContainer = () => {
    const classes = useStyle();
    const appendText = (process.env.REACT_APP_IS_DEBUG === "true") ? DebugText : ""; 

    return(
        <Container maxWidth="sm" className={classes.aboutcontainer}>
            <div className={classes.aboutinnercontainer}>
                <div>
                    <a className={classes.textLink} href={RepositoryLink} target="_blank" rel="noopener noreferrer">
                        <Avatar className={classes.avatar} src={NeroBird} />
                    </a>
                    <p>
                        <b>
                            <a className={classes.textLink} href={RepositoryLink} target="_blank" rel="noopener noreferrer">{AppName}</a>
                        </b>
                    </p>
                    <p>{DevelopedIn} <b><a className={classes.textLink} href={ReactJsLink} target="_blank" rel="noopener noreferrer">{ReactJS}</a></b></p>
                </div>
                
                <div className={classes.detailMarginTop}>
                    <p>{DataSources}</p>
                    <p>
                        <b>
                            <a className={classes.textLink} href={DataRapidApiLink} target="_blank" rel="noopener noreferrer">{DataSourceRapidApi}</a>
                        </b>
                    </p>
                    <p>
                        <b>
                            <a className={classes.textLink} href={DataHerokuLink} target="_blank" rel="noopener noreferrer">{DataSourceHeroku}</a>
                        </b>
                    </p>
                </div>

                <div className={classes.detailMarginTop}>
                    <p>{Version} <b>{process.env.REACT_APP_VERSION}{appendText}</b></p>
                    <p>{Copyrights}</p>
                </div>
            </div>
        </Container>
    ) 
};

class About extends BaseComponent {
    render(){
        return(
            <AboutContainer/>
        )
    }
}

export default About;