import { FETCH_GLOBAL_DATA, FETCH_GLOBAL_DAILY_DATA, FETCH_COUNTRIES, FETCH_COUNTRY_DATA, FETCH_INDIAN_DATA, 
    SELECT_COUNTRY, SELECT_INDIAN_STATE, SELECT_INDIAN_DISTRICT, SHOW_GLOBAL_DATA, 
    SHOW_COUNTRY_WISE_DATA, SHOW_INDIAN_DATA, OPEN_SIDE_DRAWER, 
    CLOSE_SIDE_DRAWER, SECRECT_KEY_ENTERED, EMPTY_SECRET_KEY, SHOW_MoHFW_TWEETS,
    HIDE_MoHFW_TWEETS, MODIFY_MoHFW_TWEETS_CLASS_NAME } from '../actions/ActionConstants';

/**
 * 
 * @param {*} state 
 * @param {*} action 
 */
export const covid19Reducer = (state = {
    globalData: {infected: 0, recovered: 0, deaths: 0, lastUpdate: ""},
    dailyData: [],
    countries: [],
    userInputKey: [],
    length: 21,
    key: "U2FsdGVkX196IM2EIGFP4XeVB+/pqqVPbX1rHbu6OG8=",
    sideDrawerOpen: false,
    countrySelected: '',
    lastSelectedCountryIndex: 0,
    countrydata: {infected: 0, recovered: 0, deaths: 0, lastUpdate: ""},
    showGlobalData: true,
    showCountryData: false,
    showIndianStateData: false,
    response: null,
    indianStateData: null,
    states: null,
    districts: null,
    note: '',
    districtData: {infected: 0, recovered: 0, deaths: 0, lastUpdate: ""},
    lastUpdateDate: '',
    currentState: '',
    currentDistrict: '',
    firstTimeLoad: true,
    lastSelectedStateIndex: 0,
    lastSelectedDistrictIndex: 0,
    isDistrictPickerDisabled: false,
    showMoHFWTweets: false,
    classNameMoHFWTweets: 'tweeter_handle'
}, action) => {
    let unknownIndex = null;
    let tempDistricts = null;

    let infected = 0;
    let recovered = 0;
    let death = 0;
    let note = '';

    let isDistrictPickerDisabled = false;

    let currentDistrict = '';

    switch(action.type) {
        case FETCH_GLOBAL_DATA:
            state = {
                ...state,
                globalData: action.payload
            }
            break;
        
        case FETCH_GLOBAL_DAILY_DATA:
            state = {
                ...state,
                dailyData: action.payload
            }
            break;
        
        case FETCH_COUNTRIES:
            state = {
                ...state,
                countries: action.payload,
                countrySelected: action.payload[0]
            }
            break;

        case FETCH_COUNTRY_DATA:
            state = {
                ...state,
                countrySelected: action.payload[0],
                countrydata: action.payload[1]
            }
            break;

        case FETCH_INDIAN_DATA:
            const response = action.payload;
            const lastUpdateDate = response.headers['last-modified'];

            const tempStates = Object.keys(response.data).splice(1);

            unknownIndex = Object.keys(response.data[tempStates[0]]['districtData']).findIndex(element => element === 'Unknown');

            tempDistricts = Object.keys(response.data[tempStates[0]]['districtData']);

            if(unknownIndex !== -1) {
                infected = response.data[tempStates[0]]['districtData']['Unknown'].confirmed;
                recovered = response.data[tempStates[0]]['districtData']['Unknown'].recovered;
                death = response.data[tempStates[0]]['districtData']['Unknown'].deceased;
                note = response.data[tempStates[0]]['districtData'][tempDistricts[0]]['notes'];
              
                tempDistricts = tempDistricts.splice(0, unknownIndex);

                isDistrictPickerDisabled = true;
            } else {
                infected = response.data[tempStates[0]]['districtData'][tempDistricts[0]].confirmed;
                recovered = response.data[tempStates[0]]['districtData'][tempDistricts[0]].recovered;
                death = response.data[tempStates[0]]['districtData'][tempDistricts[0]].deceased;

                isDistrictPickerDisabled = false;

                currentDistrict = tempDistricts[0];
            }

            state = {
                ...state,
                response: response,
                indianStateData: response.data,
                states: tempStates,
                currentState: tempStates[0],
                districts: tempDistricts,
                currentDistrict: currentDistrict,
                lastUpdateDate: lastUpdateDate,
                note: note,
                districtData: {infected: infected, recovered: recovered, deaths: death, lastUpdate: lastUpdateDate},
                isDistrictPickerDisabled: isDistrictPickerDisabled
            }
            break;

        case SELECT_COUNTRY:
            state = {
                ...state,
                lastSelectedCountryIndex: state.countries.findIndex(element => element === action.payload[0]),
                countrySelected: action.payload[0],
                countrydata: action.payload[1]
            }
            break;

        case SELECT_INDIAN_STATE:
            unknownIndex = Object.keys(state.response.data[action.payload]['districtData']).findIndex(element => element === 'Unknown');

            tempDistricts = Object.keys(state.response.data[action.payload]['districtData']);

            if(tempDistricts[0] === 'Others') {
                tempDistricts.shift();
            }

            if(unknownIndex !== -1) {
                infected = state.response.data[action.payload]['districtData']['Unknown'].confirmed;
                recovered = state.response.data[action.payload]['districtData']['Unknown'].recovered;
                death = state.response.data[action.payload]['districtData']['Unknown'].deceased;
                note = state.response.data[action.payload]['districtData'][tempDistricts[0]]['notes'];
              
                tempDistricts = tempDistricts.splice(0, unknownIndex);

                if(note !== ''){
                    isDistrictPickerDisabled = true;
                }
            } else {
                infected = state.response.data[action.payload]['districtData'][tempDistricts[0]].confirmed;
                recovered = state.response.data[action.payload]['districtData'][tempDistricts[0]].recovered;
                death = state.response.data[action.payload]['districtData'][tempDistricts[0]].deceased;

                isDistrictPickerDisabled = false;

                currentDistrict = tempDistricts[0];
            }

            state = {
                ...state,
                lastSelectedStateIndex: state.states.findIndex(element => element === action.payload),
                currentState: action.payload,
                districts: tempDistricts,
                currentDistrict: currentDistrict,
                lastSelectedDistrictIndex: 0,
                note: note,
                districtData: {infected: infected, recovered: recovered, deaths: death, lastUpdate: state.lastUpdateDate},
                isDistrictPickerDisabled: isDistrictPickerDisabled
            }
            break;

        case SELECT_INDIAN_DISTRICT:
            const tempInfected = state.response.data[state.currentState]['districtData'][action.payload].confirmed;
            const tempRecovered = state.response.data[state.currentState]['districtData'][action.payload].recovered;
            const tempDeath = state.response.data[state.currentState]['districtData'][action.payload].deceased;
            
            state = {
                ...state,
                lastSelectedDistrictIndex: state.districts.findIndex(element => element === action.payload),
                currentDistrict: action.payload,
                note: '',
                districtData: {infected: tempInfected, recovered: tempRecovered, deaths: tempDeath, lastUpdate: state.lastUpdateDate}
            }
            break;

        case SHOW_GLOBAL_DATA:
            if(!state.showGlobalData) {
                state = {
                    ...state,
                    showGlobalData: true,
                    showCountryData: false,
                    showIndianStateData: false
                }
            }
            break;

        case SHOW_COUNTRY_WISE_DATA:
            if(!state.showCountryData){
                state = {
                    ...state,
                    showGlobalData: false,
                    showCountryData: true,
                    showIndianStateData: false
                }
            }
            break;
            
        case SHOW_INDIAN_DATA:
            if(!state.showIndianStateData){
                state = {
                    ...state,
                    showGlobalData: false,
                    showCountryData: false,
                    showIndianStateData: true
                }
            }
            break;
                
        case OPEN_SIDE_DRAWER:
            state = {
                ...state,
                sideDrawerOpen: true
            }
            break;

        case CLOSE_SIDE_DRAWER:
            state = {
                ...state,
                sideDrawerOpen: false
            }
            break;

        case SECRECT_KEY_ENTERED:
            state = {
                ...state,
                userInputKey: [...state.userInputKey, action.payload]
            }
            break;

        case EMPTY_SECRET_KEY:
            state = {
                ...state,
                userInputKey: []
            }
            break;

        case SHOW_MoHFW_TWEETS:
            state = {
                ...state,
                showMoHFWTweets: true
            }
            break;

        case HIDE_MoHFW_TWEETS:
            state = {
                ...state,
                showMoHFWTweets: false
            }
            break;

        case MODIFY_MoHFW_TWEETS_CLASS_NAME:
            state = {
                ...state,
                classNameMoHFWTweets: action.payload
            }
            break;
            
        default:
            console.log('Invalid action type: ' + action.type)
            break;
    }

    return state;
}