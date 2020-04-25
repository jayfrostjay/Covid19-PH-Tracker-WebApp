import React from 'react';

import Grid from '@material-ui/core/Grid';

import Container from '@material-ui/core/Container';
import BaseComponent from '../common/BaseComponent.ts';
import { getLatestStatisticsByCountry } from '../../repository/CovidRepository';

import { TrackerContentItem } from '../../components/TrackerContentItem/index';
import { BottomRightSnackBar } from '../../components/SnackBar/index';
import { BackDropBlock } from '../../components/BackDrop/index';


class Tracker extends BaseComponent {

    constructor(props){
        super(props);

        this.state = {
            countryKey: 'Philippines',
            rawResult: null,

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
        this.setState({
            ...this.state,
            rawResult: result
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
                
                <Container maxWidth="xl">
                    <Grid container spacing={1}>
                        <Grid container item xs={12} spacing={3}>
                            <TrackerContentItem text={this.state.countryKey} />
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