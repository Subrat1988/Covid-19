import React from 'react';
import './DrawerToggleButton.css';

const drawerToggleButton = (props) => {
    return(
        <button className="toggle_button" onClick={() => props.btnClicked()}>
            <div className="toggle_button_line"></div>
            <div className="toggle_button_line"></div>
            <div className="toggle_button_line"></div>
        </button>
    );
}

export default drawerToggleButton;