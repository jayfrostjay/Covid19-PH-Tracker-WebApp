import React from 'react';

import Grid from '@material-ui/core/Grid';

import Container from '@material-ui/core/Container';
import BaseComponent from '../common/BaseComponent.ts';
import { getLatestStatisticsByCountry, getHistoryByCountry } from '../../repository/CovidRepository';

import { TrackerInfoBox } from '../../components/TrackerInfoBox/index';
import { BottomRightSnackBar } from '../../components/SnackBar/index';
import { BackDropBlock } from '../../components/BackDrop/index';
import { TrackerGraphBox } from '../../components/TrackerGraphBox/index';

import { KeyRecovery, KeyDeaths, KeyActiveCases, KeyConfirmed } from '../../constants/Keys';
import { LabelTotalConfirmed, LabelTotalRecovered, LabelTotalDeaths, LabelActiveCases,
         LabelNewCases, LabelNewDeaths, LabelNew, LabelTest } from '../../constants/String';
import { FormatDateFromString, FormatToMiniDate } from '../../utils/Date';
import { IsUndefined } from '../../utils/Type';
import { StringToInt } from '../../utils/String';

class Tracker extends BaseComponent {

    constructor(props){
        super(props);

        this.state = {
            countryKey: 'Philippines',

            list: [],
            recordDate: '',

            isPageLoading: false,

            snackBarOpen: false,
            snakBarMessage: '',
            snackBarType: '',
            graphItemCount: 10,
            graphLoader: {
                recovery: false,
                newDeaths: false,
                newCases: false,
            },
            graphData: {
                recovery: {},
                newDeaths: {},
                newCases: {},
                extraCases: 0,
                extraDeaths: 0,
                extraRecoveries: 0
            },
        }
    }

    componentDidMount(){
        this.defaultListState([]);
        this.pullCountryLatestStatistics();
        this.pullCountryHistoryData();
    }

    defaultListState = (result) => {
        let newList = [
            {
                key: KeyConfirmed,
                label: LabelTotalConfirmed,
                value: ( !IsUndefined(result.total_cases) ) ? result.total_cases : "0",
                extra: {
                    value: ( !IsUndefined(result.new_cases) ) ? result.new_cases : "",
                    label: LabelNew,
                    prepend: "+",
                }
            },{
                key: KeyRecovery,
                label: LabelTotalRecovered,
                value: ( !IsUndefined(result.total_recovered) ) ? result.total_recovered : "0",
            },{
                key: KeyDeaths,
                label: LabelTotalDeaths,
                value: ( !IsUndefined(result.total_deaths) ) ? result.total_deaths : "0",
                extra: {
                    value: ( !IsUndefined(result.new_deaths) ) ? result.new_deaths : "",
                    label: LabelNew,
                    prepend: "+",
                }
            },
            {
                key: KeyActiveCases,
                label: LabelActiveCases,
                value: ( !IsUndefined(result.active_cases) ) ? result.active_cases : "0",
                extra: {
                    value: ( !IsUndefined(result.total_tests) ) ? result.total_tests : "",
                    label: LabelTest,
                }
            }
        ];

        this.setState({
            list: newList
        });
    }

    pullCountryLatestStatistics = () => {
        this.setPageLoading(true);
        getLatestStatisticsByCountry(
            this.state.countryKey, 
            (result) => {
                this.buildTrackerData(result);
            }, 
            (error) => {
                this.showErrorSnackBar(error);
                this.setPageLoading(false);
                this.buildTrackerData("");
            }
        )
    }

    pullCountryHistoryData = () => {
        this.setGraphLoaders(true);
        getHistoryByCountry(
            this.state.countryKey,
            (result) => {
                this.buildHistoryData(result);
            },
            (error) => {
                this.showErrorSnackBar(error);
            }
        )
    }

    setGraphLoaders = (status) => {
        this.setState({
            graphLoader: {
                recovery: status,
                newDeaths: status,
                newCases: status,
            }
        })
    }

    buildHistoryData = (data) => {
        let dateList = [];
        const filterCallback = (item) => {
            if( !dateList.includes(item.record_date_pure) ){
                dateList.push(item.record_date_pure);
                return true;
            }
            return false;
        }

        let graphData = this.state.graphData;
        let labelsArray = [], newCasesArray = [], newDeathsArray = [], totalRecoveredArray = [];
        const items = (data.reverse()).filter(filterCallback);

        (items).map((value, index) => {
            if( this.state.graphItemCount >= index ){
                labelsArray.push( FormatToMiniDate(value.record_date_pure) );
                newCasesArray.push( StringToInt(value.new_cases) );
                newDeathsArray.push( StringToInt(value.new_deaths) );
                totalRecoveredArray.push( StringToInt(value.total_recovered) );
            }
        });

        labelsArray = labelsArray.reverse();
        newCasesArray = newCasesArray.reverse();
        newDeathsArray = newDeathsArray.reverse();
        totalRecoveredArray = totalRecoveredArray.reverse();

        graphData.recovery = {
            labels: labelsArray,
            series: [totalRecoveredArray]
        }
        graphData.newCases = {
            labels: labelsArray,
            series: [newCasesArray]
        }
        graphData.newDeaths = {
            labels: labelsArray,
            series: [newDeathsArray]
        }
        graphData.extraCases = this.getDifferenceFromYesterdayStats(newCasesArray);
        graphData.extraDeaths = this.getDifferenceFromYesterdayStats(newDeathsArray)
        graphData.extraRecoveries = this.getDifferenceFromYesterdayStats(totalRecoveredArray)
        
        this.setState({
            graphData: graphData
        });
        this.setGraphLoaders(false);
    }

    getDifferenceFromYesterdayStats = (list) => {
        let listCount = list.length;
        const filterOption = (value, index) => {
            return ( (index === (listCount-1)) || (index === (listCount-2)) )
        }
        return (list.filter(filterOption)).reduce((a,b) => (b - a));
    }

    setPageLoading = (status) => {
        this.setState({
            isPageLoading: status
        })
    }

    buildTrackerData = (result) =>{
        this.setPageLoading(false);
        this.defaultListState(result);
        this.setState({
            recordDate: ( !IsUndefined(result.record_date_pure) ) ? FormatDateFromString(result.record_date_pure): ""
        })
    }

    showErrorSnackBar = (error) =>{
        this.setState({
            snackBarOpen: true,
            snackBarMessage: error.toString(),
            snackBarType: "error"
        })

    }

    hideErrorSnackBar = () =>{
        this.setState({
            snackBarOpen: false
        })
    }

    render(){
        return(
            <React.Fragment>
                <BackDropBlock status={this.state.isPageLoading} />
                <Container maxWidth="xl" style={{padding: 0}}>
                    <Grid container spacing={1}>
                        <Grid container item xs={12} spacing={3}>
                            <TrackerInfoBox 
                                span="3"
                                list={this.state.list} 
                                recordDate={this.state.recordDate}
                                />
                        </Grid>
                    </Grid>
                </Container>
                <Container maxWidth="xl" style={{padding: 0}}>
                    <Grid container spacing={1}>
                        <Grid container item xs={12} spacing={3}>
                            <TrackerGraphBox type="Line" 
                                dataKey={KeyActiveCases} 
                                span="4" 
                                label={LabelNewCases} 
                                data={this.state.graphData.newCases}
                                loader={this.state.graphLoader.newCases}
                                recordDate={this.state.recordDate}
                                extra="Cases"
                                extraContent={this.state.graphData.extraCases}/> 
                            <TrackerGraphBox type="Bar" 
                                dataKey={KeyDeaths} 
                                span="4" 
                                label={LabelNewDeaths}
                                data={this.state.graphData.newDeaths}
                                loader={this.state.graphLoader.newDeaths}
                                recordDate={this.state.recordDate}
                                extra="Deaths"
                                extraContent={this.state.graphData.extraDeaths}/>
                            <TrackerGraphBox type="Line" 
                                dataKey={KeyRecovery} 
                                span="4" 
                                label={LabelTotalRecovered} 
                                data={this.state.graphData.recovery}
                                loader={this.state.graphLoader.recovery}
                                recordDate={this.state.recordDate}
                                extra="Recoveries"
                                extraContent={this.state.graphData.extraRecoveries}/>
                        </Grid>
                    </Grid>
                </Container>
                <BottomRightSnackBar 
                    open={this.state.snackBarOpen}
                    message={this.state.snackBarMessage}
                    onClose={this.hideErrorSnackBar}
                    type={this.state.snackBarType}
                />
            </React.Fragment>
        )
    }
}

export default Tracker; 