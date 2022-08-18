import React from 'react';
import CardComponent from '../card/CardComponent';
import { Grid } from '@material-ui/core';

import styles from  './home.module.css';
import { connect } from 'react-redux';

class Home extends React.Component {
    render() {
        return(
            <div className={styles.container}>
                <Grid container spacing={3} justify="center">
                    <CardComponent 
                        className={styles.infected}
                        cardTitle="Infected"
                        value={this.props.covid19Reducer.globalData.infected}
                        lastUpdate={this.props.covid19Reducer.globalData.lastUpdate}
                        cardSubtitle="Number of active cases from COVID-19."
                    />
                
                    <CardComponent
                        className={styles.recovered}
                        cardTitle="Recovered"
                        value={this.props.covid19Reducer.globalData.recovered}
                        lastUpdate={this.props.covid19Reducer.globalData.lastUpdate}
                        cardSubtitle="Number of recoveries from COVID-19."
                    />
                
                    <CardComponent
                        className={styles.deaths}
                        cardTitle="Deaths"
                        value={this.props.covid19Reducer.globalData.deaths}
                        lastUpdate={this.props.covid19Reducer.globalData.lastUpdate}
                        cardSubtitle="Number of deaths caused by COVID-19."
                    />
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        covid19Reducer: state.covid19Reducer
    };
}

export default connect(mapStateToProps)(Home);