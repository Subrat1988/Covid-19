import React from 'react';
import styles from './card.module.css';
import { Grid, Card, CardContent, Typography } from '@material-ui/core';
import CountUp from 'react-countup';
import cx from 'classnames';

class CardComponent extends React.Component {
    render() {
        return(
            <Grid item xs={12} md={3} component={Card} className={cx(styles.card, this.props.className)}>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                        {this.props.cardTitle}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        <CountUp start={0} end={this.props.value} duration={2.75} separator=","/>
                    </Typography>
                    <Typography color="textSecondary">
                        {new Date(this.props.lastUpdate).toDateString()}
                    </Typography>
                    <Typography  variant="body2" component="p">
                        {this.props.cardSubtitle}
                    </Typography>
                </CardContent>
            </Grid>
        );
    }
}

export default CardComponent;