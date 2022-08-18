import { FETCH_GLOBAL_DATA, FETCH_GLOBAL_DAILY_DATA, FETCH_COUNTRIES, FETCH_COUNTRY_DATA, FETCH_INDIAN_DATA, 
    SELECT_COUNTRY, SELECT_INDIAN_STATE, SELECT_INDIAN_DISTRICT, SHOW_GLOBAL_DATA, 
    SHOW_COUNTRY_WISE_DATA, SHOW_INDIAN_DATA, OPEN_SIDE_DRAWER, 
    CLOSE_SIDE_DRAWER, SECRECT_KEY_ENTERED, EMPTY_SECRET_KEY, SHOW_MoHFW_TWEETS,
    HIDE_MoHFW_TWEETS, MODIFY_MoHFW_TWEETS_CLASS_NAME } from '../actions/ActionConstants';

export const fetchGlobalDataAction = (globalData) => {
    return {
        type: FETCH_GLOBAL_DATA,
        payload: globalData
    }
}

export const fetchGlobalDailyDataAction = (globalDailyData) => {
    return {
        type: FETCH_GLOBAL_DAILY_DATA,
        payload: globalDailyData
    }
} 

export const fetchCountriesAction = (countries) => {
    return {
        type: FETCH_COUNTRIES,
        payload: countries
    }
}

export const fetchCountryDataAction = (countryData) => {
    return {
        type: FETCH_COUNTRY_DATA,
        payload: [countryData[0], countryData[1]]
    }
}

export const fetchIndianDataAction = (indianData) => {
    return {
        type: FETCH_INDIAN_DATA,
        payload: indianData
    }
}

export const selectCountryAction = (countryData) => {
    return {
        type: SELECT_COUNTRY,
        payload: [countryData[0], countryData[1]]
    }
}

export const selectIndianStateAction = (state) => {
    return {
        type: SELECT_INDIAN_STATE,
        payload: state
    }
}

export const selectIndianDistrictAction = (district) => {
    return {
        type: SELECT_INDIAN_DISTRICT,
        payload: district
    }
}

export const showGlobalDataAction = () => {
    return {
        type: SHOW_GLOBAL_DATA,
    }
}

export const showCountryWiseDataAction = () => {
    return {
        type: SHOW_COUNTRY_WISE_DATA,
    }
}

export const showIndianDataAction = () => {
    return {
        type: SHOW_INDIAN_DATA,
    }
}

export const openSideDrawerAction = () => {
    return {
        type: OPEN_SIDE_DRAWER,
    }
}

export const closeSideDrawerAction = () => {
    return {
        type: CLOSE_SIDE_DRAWER,
    }
}

export const secretKeyEnteredAction = (inputChar) => {
    return {
        type: SECRECT_KEY_ENTERED,
        payload: inputChar
    }
}

export const emptySecretKeyAction = () => {
    return {
        type: EMPTY_SECRET_KEY,
    }
}

export const showMoHFWTweetsAction = () => {
    return {
        type: SHOW_MoHFW_TWEETS
    }
}

export const hideMoHFWTweetsAction = () => {
    return {
        type: HIDE_MoHFW_TWEETS
    }
}

export const modifyMoHFWClassNameAction = (className) => {
    return {
        type: MODIFY_MoHFW_TWEETS_CLASS_NAME,
        payload: className
    }
}