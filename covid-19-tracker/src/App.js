import React from 'react';
import './App.css';
import image from './images/image.png';

import Home from './components/home/Home';

import Chart from './chart/Chart';
import BarChart from './chart/BarChart';

import 'bootstrap/dist/css/bootstrap.min.css';

import DrawerToggleButton from './components/sideDrawer/DrawerToggleButton';
import SideDrawer from './components/sideDrawer/SideDrawer';
import Backdrop from './components/backdrop/Backdrop';

import CountryWiseData from './components/country/CountryWiseData';

import CryptoJS from 'crypto-js';

import IndianStateData from './components/IndiaData/IndianStateData';

import { connect, Provider } from 'react-redux';

import { Overlay } from 'react-bootstrap';

import { fetchGlobalDailyDataAction, fetchGlobalDataAction, fetchCountriesAction, 
  fetchCountryDataAction, fetchIndianDataAction, openSideDrawerAction, 
  closeSideDrawerAction, secretKeyEnteredAction, emptySecretKeyAction,
  showGlobalDataAction, showCountryWiseDataAction, showIndianDataAction, 
  selectCountryAction, selectIndianStateAction, selectIndianDistrictAction,
  showMoHFWTweetsAction, hideMoHFWTweetsAction } from './actions/Covid19Actions';

import { fetchData, fetchDailyData, fetchCountries, fetchCountryData, 
    fetchDataForIndia } from './ServiceAPI/APIServices';

class App extends React.Component {

  componentDidMount() {
    /**
     * For fetching global data
     */
    (async () => {
      const response = await fetchData();

      this.props.fetchGlobalData(response);
    })();

    /**
     * For fetching daily global covid-19 data
     */
    (async () => {
      const response = await fetchDailyData();

      this.props.fetchGlobalDailyData(response);
    })();

    /**
     * For fetching the countries
     */
    (async () => {
      const response = await fetchCountries();

      this.props.fetchCountries(response);
    })();

    /**
     * For fetching the initial country data
     */
    if(this.props.covid19Reducer.countrySelected !== '') {
      (async () => {
        const response = await fetchCountryData(this.props.covid19Reducer.countrySelected);

        this.props.fetchCountryData([this.props.covid19Reducer.countrySelected, response]);
      })();
    }

    /**
     * for fetching India covid-19 data
     */
    (async () => {
      const response = await fetchDataForIndia();

      this.props.fetchIndianData(response);
    })();

    /**
     * Code block for printing developer details
     */
    window.addEventListener('keypress', (event) => {
      this.props.secretKeyEntered(String.fromCharCode(event.keyCode));

      if(this.props.covid19Reducer.userInputKey.length === 21) {
        const userInputKey = this.props.covid19Reducer.userInputKey.join('');
        const tempArray = userInputKey.split('#');
        if(tempArray.length === 2){
          const decryptedBytes = CryptoJS.AES.decrypt(this.props.covid19Reducer.key, tempArray[1]);

          if(tempArray[0] === decryptedBytes.toString(CryptoJS.enc.Utf8)) {
            console.log('Successfully authenticated');
            console.log('************************************');
            console.log('*******  Developer Details  ********');
            console.log('************************************');
            console.log('****** G Subrat Kumar Patra ********');
            console.log('************************************');
          }
        }

        this.props.emptySecretKey();
      }
    });
  }

  /**
   * 
   */
  handleDrawerToggleButton = () => {
    if(this.props.covid19Reducer.sideDrawerOpen) {
      this.props.closeSideDrawer();
    } else {
      this.props.openSideDrawer();
    }
  };

  /**
   * 
   */
  handleShowCountryWiseData = () => {
    /**
     * For fetching the initial country data
     */
    if(this.props.covid19Reducer.countrySelected !== '') {
      (async () => {
        const response = await fetchCountryData(this.props.covid19Reducer.countrySelected);

        this.props.fetchCountryData([this.props.covid19Reducer.countrySelected, response]);
      })();
    }
    
    this.props.showCountryWiseData();

    this.handleDrawerToggleButton();

    this.props.hideMoHFWTweets();
  }

  /**
   * 
   */
  handleShowGlobalData = () => {
    this.props.showGlobalData();

    this.handleDrawerToggleButton();

    this.props.hideMoHFWTweets();
  }

  handleShowIndianStateData = () => {
    /**
     * Code snippet for showing MoHFW tweets
     */
    var fileref=document.createElement('script')
    fileref.setAttribute("type","text/javascript")
    fileref.setAttribute("src", 'https://platform.twitter.com/widgets.js')
    if (typeof fileref!="undefined")
      document.getElementsByTagName("head")[0].appendChild(fileref);

    this.props.showIndianData();

    this.handleDrawerToggleButton();

    this.props.showMoHFWTweets();

  }

  /**
   * 
   */
  handleCountryPickerChange = (country) => {
    (async () => {
      const response = await fetchCountryData(country);

      this.props.selectCountry([country, response]);
    })();
  };

  /**
   * 
   * @param {*} state 
   */
  handleIndianStateChange = (state) => {
    this.props.selectIndianState(state);
  }

  /**
   * 
   * @param {*} district 
   */
  handleIndianDistrictChange = (district) => {
    this.props.selectIndianDistrict(district);
  }

  render() {
    let sideDrawer = null;
    let backdrop = null;
    if(this.props.covid19Reducer.sideDrawerOpen) {
      sideDrawer = (
        <SideDrawer btnClicked={this.handleDrawerToggleButton} handleShowGlobalData={this.handleShowGlobalData}
          handleShowCountryWiseData={this.handleShowCountryWiseData} 
          handleShowIndianStateData={this.handleShowIndianStateData} />
      );

      backdrop = (
        <Backdrop clicked={this.handleDrawerToggleButton} />
      );
    }

    let displayData = null;
    if(this.props.covid19Reducer.showGlobalData) {
      displayData = (
        <div className="body">
          <Provider store={this.props.store}>
            <Home/>
          </Provider>
          <Chart dailyData={this.props.covid19Reducer.dailyData} />
        </div>
      );
    } else if(this.props.covid19Reducer.showCountryData) {
      displayData = (
        <div className="body">
          <CountryWiseData handleCountryPickerChange={this.handleCountryPickerChange} data={this.props.covid19Reducer.countrydata}/>
          <BarChart data={this.props.covid19Reducer.countrydata} country={this.props.covid19Reducer.countrySelected} district={''} />
        </div>
      );
    } else if(this.props.covid19Reducer.showIndianStateData) {
      if(null !== this.props.covid19Reducer.indianStateData && null !== this.props.covid19Reducer.states 
          && null !== this.props.covid19Reducer.districts){
        displayData = (
          <div className="body">
            <IndianStateData note={this.props.covid19Reducer.note} 
              data={this.props.covid19Reducer.districtData} 
              handleIndianStateChange={this.handleIndianStateChange}
              handleIndianDistrictChange={this.handleIndianDistrictChange} />
              <BarChart data={this.props.covid19Reducer.districtData} 
              country={this.props.covid19Reducer.currentState} 
              district={this.props.covid19Reducer.currentDistrict} />
          </div>
        );
      }
    }

    return (
      <div className="App">
        <div className="header">
          <DrawerToggleButton btnClicked = {this.handleDrawerToggleButton}/>
          <div style={{flex: "0.45"}}></div>
          <img className="image" src={image} alt="COVID-19"/>
        </div>
        {sideDrawer}
        {backdrop}
        {displayData}
        <Overlay target={document.getElementById('parent')} show={false} style={{margin:"auto auto"}} placement="right">
          <div style={{height: "95vh", width: "220px"}} className="tweeter-handle">
            <a className="twitter-timeline" data-width="220" data-height="95vh" href="https://twitter.com/MoHFW_INDIA?ref_src=twsrc%5Etfw">Tweets by MoHFW_INDIA</a> 
          </div>
        </Overlay>
        <div className="footer">
          {/* &copy; COVID-19 2020 */}
          <div>
            Powered by:&nbsp;&nbsp; <a href="https://covid19.mathdro.id/api" target="_blank" rel="noopener noreferrer">covid19.mathdro.id</a>
          </div>
          <div style={{marginLeft: "100px"}}>
            <a href="https://api.covid19india.org/" target="_blank" rel="noopener noreferrer">api.covid19india.org</a>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    covid19Reducer: state.covid19Reducer
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchGlobalData: (globalData) => dispatch(fetchGlobalDataAction(globalData)),
  fetchGlobalDailyData: (globalDailyData) => dispatch(fetchGlobalDailyDataAction(globalDailyData)),
  fetchCountries: (countries) => dispatch(fetchCountriesAction(countries)),
  fetchCountryData: (country) => dispatch(fetchCountryDataAction(country)),
  fetchIndianData: (indianData) => dispatch(fetchIndianDataAction(indianData)),
  showGlobalData: () => dispatch(showGlobalDataAction()),
  showCountryWiseData: () => dispatch(showCountryWiseDataAction()),
  showIndianData: () => dispatch(showIndianDataAction()),
  openSideDrawer: () => dispatch(openSideDrawerAction()),
  closeSideDrawer: () => dispatch(closeSideDrawerAction()),
  secretKeyEntered: (inputChar) => dispatch(secretKeyEnteredAction(inputChar)),
  emptySecretKey: () => dispatch(emptySecretKeyAction()),
  selectCountry: (country) => dispatch(selectCountryAction(country)),
  selectIndianState: (state) => dispatch(selectIndianStateAction(state)),
  selectIndianDistrict: (district) => dispatch(selectIndianDistrictAction(district)),
  showMoHFWTweets: () => dispatch(showMoHFWTweetsAction()),
  hideMoHFWTweets: () => dispatch(hideMoHFWTweetsAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
