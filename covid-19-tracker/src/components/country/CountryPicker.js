import React from 'react';
import { FormControl, NativeSelect } from '@material-ui/core';

import './CountryPicker.css';

import { connect } from 'react-redux';

class CountryPicker extends React.Component {
    render() {

        let options = null;
        if(Array.isArray(this.props.covid19Reducer.countries) && this.props.covid19Reducer.countries.length) {
            options = (
                this.props.covid19Reducer.countries.map((country, index) => <option key={index} value={country}>{country}</option>)
            );
        }

        return(
            <FormControl className="formControl">
                <NativeSelect defaultValue={this.props.covid19Reducer.countrySelected} onChange={(event) => this.props.handleCountryChange(event.target.value)}>
                    {options}
                </NativeSelect>
            </FormControl>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        covid19Reducer: state.covid19Reducer
    };
}

export default connect(mapStateToProps)(CountryPicker);