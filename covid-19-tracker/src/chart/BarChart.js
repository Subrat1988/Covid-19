import React from 'react';

import styles from './BarChart.module.css';

import { Bar } from 'react-chartjs-2';

class BarChart extends React.Component {
    render() {
        let barChart = null;
        let name = this.props.country;
        if(this.props.district !== '') {
            name = this.props.district;
        }
        if(this.props.data !== null) {
            barChart = (
                <Bar
                    data={{
                        labels: ['Infected', 'Recovered', 'Deaths'],
                        datasets: [
                            {
                                label: 'People',
                                backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
                                data: [this.props.data.infected, this.props.data.recovered, this.props.data.deaths],
                            },
                        ],
                    }}
                    options={{
                        legend: { display: false },
                        title: { display: true, text: `Current state in ${name}` },
                    }}
                />
            );
        }
        return(
            <div className={styles.container}>
                {barChart}
            </div>
        );
    }
}

export default BarChart;