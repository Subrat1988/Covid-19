import React from 'react';

import './SideDrawer.css';
import image from '../../images/image.png';

const sideDrawer = props => {
    return(
        <div className="side_drawer">
            <div className="side_drawer_home">
                <button className="side_drawer_button" onClick={() => props.btnClicked()}>
                    <div className="side_drawer_button_line"></div>
                    <div className="side_drawer_button_line"></div>
                    <div className="side_drawer_button_line"></div>
                </button>
                <img className="side_drawer_image" src={image} alt="COVID-19"/>
            </div>
            <hr className="solid"></hr>
            <div className="side_drawer_items">
                <button onClick={() => props.handleShowGlobalData()}>World Wide Data</button>
                <button onClick={() => props.handleShowCountryWiseData()}>Country Wise Data</button>
                <button onClick={() => props.handleShowIndianStateData()}>Indian States Data</button>
            </div>
            <hr className="solid"></hr>
        </div>
    );
}

export default sideDrawer;