import React from 'react';

import styles from './chart.module.css';
import { Line } from 'react-chartjs-2';
import { red } from '@material-ui/core/colors';

class Chart extends React.Component {
    render() {
        let lineChart = null;
        if(this.props.dailyData !== null) {
            lineChart = (
                <Line
                    data={{
                            labels: this.props.dailyData.map(({reportDate}) => reportDate),
                            datasets: [{
                                label: 'Infected',
                                data: this.props.dailyData.map((data) => data.confirmed),
                                borderColor: '#3333ff',
                                borderWidth: 0.5,
                                fill: true
                            }, {
                                label: 'Deaths',
                                data: this.props.dailyData.map((data) => data.deaths),
                                borderColor: red,
                                borderWidth: 0.5,
                                backgroundColor: 'rgb(255, 0, 0, 0.5)',
                                fill: true
                            },],
                        }
                    }
                />
            ); 
        }
        return(
            <div className={styles.container}>
                {lineChart}
            </div>
        );
    }
}

export default Chart;