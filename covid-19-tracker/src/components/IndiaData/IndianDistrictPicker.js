import React from 'react';

import './IndianDistrictPicker.css';

import { FormControl, NativeSelect } from '@material-ui/core';

import { connect } from 'react-redux';

class IndianDistrictPicker extends React.Component {
    render() {
        return(
            <FormControl className="formControl">
                <NativeSelect value={this.props.covid19Reducer.currentDistrict} disabled={this.props.covid19Reducer.isDistrictPickerDisabled} onChange={(event) => {this.props.handleIndianDistrictChange(event.target.value)}} >
                    {this.props.covid19Reducer.districts.map((district, index) => <option key={index} value={district} >{district}</option>)}
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

export default connect(mapStateToProps)(IndianDistrictPicker);