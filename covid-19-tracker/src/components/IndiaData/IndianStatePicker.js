import React from 'react';
import { FormControl, NativeSelect } from '@material-ui/core';

import './IndianStatePicker.css';

import { connect } from 'react-redux';

class IndianStatePicker extends React.Component {
    render() {
        return(
            <FormControl className="formControl">
                <NativeSelect defaultValue={this.props.covid19Reducer.currentState} onChange={(event) => {this.props.handleIndianStateChange(event.target.value)}} >
                    {this.props.covid19Reducer.states.map((state, index) => <option key={index} value={state}>{state}</option>)}
                </NativeSelect>
            </FormControl>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        covid19Reducer: state.covid19Reducer
    }
}

export default connect(mapStateToProps)(IndianStatePicker);