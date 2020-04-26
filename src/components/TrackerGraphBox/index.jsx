import React from 'react';
import ChartistGraph from 'react-chartist'; 
import Chartist from 'chartist'
import PropTypes from 'prop-types';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import {red, cyan, green, grey} from '@material-ui/core/colors/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Divider } from '@material-ui/core';
import AnimatedNumber from 'animated-number-react';

import {KeyRecovery, KeyDeaths, KeyActiveCases} from '../../constants/Keys';
import {IsUndefined} from '../../utils/Type';
import './index.css';

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      marginTop: theme.spacing(2),
      textAlign: 'right',
      color: theme.palette.text.secondary,
      marginTop: theme.spacing(5),
      paddingBottom: 0
    },
    paperGraph: {
        paddingBottom: 0,
        marginTop: -(theme.spacing(5))
    },
    subContent: {
      textAlign: "left",
      display: "flex",
      flexDirection: "row",
      fontSize: theme.spacing(2),
      padding: theme.spacing(1)
  },
  marginLeft: {
    marginLeft: theme.spacing(1),
    fontSize: '13px'
  },
  flexOne: {
    flex: 1
  },
  graphLoading: {
    flex: 0,
  },
  subTitle: {
    fontSize: '13px'
  }
}));

const boxStyle = (key) => {
    let color;

    switch(key){
        case KeyRecovery:
          color = green[500];
          break;
        case KeyDeaths:
          color = red[500];
          break;
        case KeyActiveCases:
          color = cyan[500];
          break;
        default: 
          color = cyan[500];
            break;
    }
    
    return {
        color: color,
    };
} 

const animatedValueFormat = (value) => value.toFixed(0).replace(/(\d)(?=(\d{3})+\b)/g,'$1,');

export const TrackerGraphBox = (props) => {
    const classes = useStyles();
    const key = (props.dataKey != null) ? props.dataKey : "";
    const style = boxStyle(key);
    const color = style.color
    const type = (props.type != null) ? props.type : 'Line'; 
    const span = (props.span != null) ? props.span : 4;
    const label = props.label;
    const showLoader = (props.loader != null) ? props.loader : false;
    const recordDate = props.recordDate;
    const extraContent = props.extraContent

    let data = props.data;
    const options = {
      high: props.max,
      low: 0,
      axisX: {
        labelInterpolationFnc: function(value, index) {
          return index % 2 === 0 ? value : null;
        }
      }
    };

    let numberSign = (extraContent > 0) ? "+" : (extraContent === 0) ? "" : "-";
    
    return (
        <React.Fragment>
          <Grid item xs={span} className="trackerBox">
              <Paper elevation={2} >
                  <div className={classes.paper}>
                    <Paper elevation={5} className={[classes.paper, classes.paperGraph]} style={{backgroundColor: color}}>
                        <ChartistGraph data={data} options={options} type={type} className="tracker-graphBox"
                        listener={
                          {"draw" : function(data) {
                            if(data.type === 'line' || data.type === 'area') {
                              data.element.animate({
                                d: {
                                  begin: 2000 * data.index,
                                  dur: 1500,
                                  from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                                  to: data.path.clone().stringify(),
                                  easing: Chartist.Svg.Easing.easeOutQuint
                                }
                              });
                            }else if(data.type === 'bar'){
                              data.element.animate({
                                y2: {
                                    begin: 0,
                                    dur: 1500,
                                    from: data.y1,
                                    to: data.y2,
                                    easing: Chartist.Svg.Easing.easeOutSine,
                              }});
                            } 
                          }}
                        }
                        />
                    </Paper>
                    <h2>{label}</h2>
                      <Divider/>
                    <div className={classes.subContent}>
                      <div className={classes.flexOne}>
                          <FontAwesomeIcon icon="history" />
                          <span className={classes.marginLeft}>{recordDate}</span>
                          
                      </div>
                      <span className={classes.subTitle}>
                      <b>{numberSign}<AnimatedNumber value={Math.abs(extraContent)} formatValue={animatedValueFormat} duration="1500" startFrom="0"/> {props.extra}</b>
                      </span>
                    </div>
                  </div>
                  {
                    (showLoader) ? (<LinearProgress variant="query" />) : ("")
                  }
              </Paper>
          </Grid>
        </React.Fragment>
    );
}

TrackerGraphBox.propTypes = {
  key: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  span: PropTypes.string.isRequired,
  max: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired
}