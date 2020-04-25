import React from 'react';

import Grid from '@material-ui/core/Grid';

import Container from '@material-ui/core/Container';
import BaseComponent from '../common/BaseComponent.ts';
import { getLatestStatisticsByCountry } from '../../repository/CovidRepository';

import { TrackerContentItem } from '../../components/TrackerContentItem/index';
import { BottomRightSnackBar } from '../../components/SnackBar/index';
import { BackDropBlock } from '../../components/BackDrop/index';

import { KeyRecovery, KeyDeaths, KeyActiveCases, KeyConfirmed } from '../../constants/Keys';
import { LabelTotalConfirmed, LabelTotalRecovered, LabelTotalDeaths, LabelActiveCases } from '../../constants/String';
import { FormatDateFromString } from '../../utils/Date';

class Tracker extends BaseComponent {

    constructor(props){
        super(props);

        this.state = {
            countryKey: 'Philippines',

            rawResult: null,
            list: [],
            recordDate: '',

            isPageLoading: false,

            snackBarOpen: false,
            snakBarMessage: '',
            snackBarType: '',
        }
    }

    componentDidMount(){
        this.setPageLoading(true);
        getLatestStatisticsByCountry(
            this.state.countryKey, 
            (result) => {
                this.buildTrackerData(result);
            }, 
            (error) => {
                this.showErrorSnackBar(error);
            }
        )
    }

    setPageLoading = (status) => {
        this.setState({
            ...this.state,
            isPageLoading: status
        })
    }

    buildTrackerData = (result) =>{
        let list = [];
        list.push({
            key: KeyConfirmed,
            label: LabelTotalConfirmed,
            value: (result.total_cases != null) ? result.total_cases : "",
            extra: {
                value: result.new_cases
            }
        })
        list.push({
            key: KeyRecovery,
            label: LabelTotalRecovered,
            value: (result.total_recovered != null) ? result.total_recovered : "",
        })
        list.push({
            key: KeyDeaths,
            label: LabelTotalDeaths,
            value: (result.total_deaths != null) ? result.total_deaths : "0",
            extra: {
                value: result.new_deaths
            }
        })
        list.push({
            key: KeyActiveCases,
            label: LabelActiveCases,
            value: (result.active_cases != null) ? result.active_cases : "",
        })

        this.setState({
            ...this.state,
            rawResult: result,
            list: list,
            recordDate: FormatDateFromString(result.record_date_pure)
        })
        this.setPageLoading(false);
    }

    showErrorSnackBar = (error) =>{
        this.setState({
            ...this.state,
            snackBarOpen: true,
            snackBarMessage: error.toString(),
            snackBarType: "error"
        })
        this.setPageLoading(false);
    }

    hideErrorSnackBar = () =>{
        this.setState({
            ...this.state,
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
                            <TrackerContentItem 
                                list={this.state.list} 
                                recordDate={this.state.recordDate}
                                />
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