import React from 'react';
import styles from './CountryWiseData.module.css';

import { Grid } from '@material-ui/core';
import CardComponent from '../card/CardComponent';

import CountryPicker from './CountryPicker';

class CountryWiseData extends React.Component {

    render() {
        return(
            <div className={styles.container}>
                <CountryPicker handleCountryChange={this.props.handleCountryPickerChange} />
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
            </div>
        );
    }
}

export default CountryWiseData;