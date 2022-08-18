import axios from 'axios';
import { url, url_India_Data } from './APIConstants';

/**
 * 
 */
export const fetchData = async () => {
    return await axios.get(url)
    .then(
        response => {
            return {
                infected: response.data.confirmed.value,
                recovered: response.data.recovered.value,
                deaths: response.data.deaths.value,
                lastUpdate: response.data.lastUpdate
            }
        },
        error => {
            console.log(error);
        }
    );
}

/**
 * 
 */
export const fetchDailyData = async ()  => {
    return await axios.get(url+'/daily')
    .then (response => {
        return response.data.map(({confirmed, deaths, reportDate}) => ({confirmed: confirmed.total, deaths: deaths.total, reportDate}));
    }, error => {
        console.log(error);
    });
}

/**
 * 
 */
export const fetchCountries = async () => {
    return await axios.get(url + '/countries')
    .then(response => {
        return response.data.countries.map(({name}) => name);
    }, error => {
        console.log(error);
    });
}

/**
 * 
 * @param {*} countryName 
 */
export const fetchCountryData = async (countryName) => {
    return await axios.get(url + '/countries/' + countryName)
    .then(response => {
        return {
            infected: response.data.confirmed.value,
            recovered: response.data.recovered.value,
            deaths: response.data.deaths.value,
            lastUpdate: response.data.lastUpdate
        }
    }, error => {
        console.log(error);
    });
}

/**
 * 
 */
export const fetchDataForIndia = async () => {
    return await axios.get(url_India_Data)
    .then(response => {
        return response;
    }, error => {
        console.log(error);
    });
}