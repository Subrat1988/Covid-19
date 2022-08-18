import React from 'react';

import styles from './IndianStateData.module.css';

import IndianStatePicker from './IndianStatePicker';
import IndianDistrictPicker from './IndianDistrictPicker';

import { Grid } from '@material-ui/core';
import CardComponent from '../card/CardComponent';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Overlay } from 'react-bootstrap';

import { connect } from 'react-redux';

import { modifyMoHFWClassNameAction } from '../../actions/Covid19Actions';

class IndianStateData extends React.Component {

    componentDidMount() {
        this.props.modifyMoHFWClassName('tweeter_handle');

        window.addEventListener('resize', (event) => {
            this.props.modifyMoHFWClassName('tweeter_handle_active');
        });
    }

    handleStatePickerChange = () => {
        this.props.modifyMoHFWClassName('tweeter_handle_active');
    }

    render() {
        let label = null
        if(this.props.note !== '') {
            label = (
                <label>{this.props.note}</label>
            );
        }

        return(
            <div className={styles.container} id="parent">
                <IndianStatePicker handleIndianStateChange={this.props.handleIndianStateChange}  />
                <IndianDistrictPicker handleIndianDistrictChange={this.props.handleIndianDistrictChange} />
                {label}
                <Grid container spacing={3} justify="center">
                    <CardComponent 
                        className={styles.infected}
                        cardTitle="Infected"
                        value={this.props.data.infected}
                        lastUpdate={this.props.data.lastUpdate}
                        cardSubtitle="Number of active cases from COVID-19."
                    />
                
                    <CardComponent
                        className={styles.recovered}
                        cardTitle="Recovered"
                        value={this.props.data.recovered}
                        lastUpdate={this.props.data.lastUpdate}
                        cardSubtitle="Number of recoveries from COVID-19."
                    />
                
                    <CardComponent
                        className={styles.deaths}
                        cardTitle="Deaths"
                        value={this.props.data.deaths}
                        lastUpdate={this.props.data.lastUpdate}
                        cardSubtitle="Number of deaths caused by COVID-19."
                    />
                </Grid>
                <Overlay target={document.getElementById('parent')} show={this.props.covid19Reducer.showMoHFWTweets} placement="right">
                    <div className={styles.tweeter_handle} style={{boxShadow: "5px 5px 8px 8px #888888", height: "95vh", width: "220px"}}>
                        <a className="twitter-timeline" data-lang="en" data-width="220" data-height="95vh" href="https://twitter.com/MoHFW_INDIA?ref_src=twsrc%5Etfw">Tweets by MoHFW_INDIA</a> 
                    </div>
                </Overlay>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        covid19Reducer: state.covid19Reducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    modifyMoHFWClassName: (className) => dispatch(modifyMoHFWClassNameAction(className))
})

export default connect(mapStateToProps, mapDispatchToProps)(IndianStateData);