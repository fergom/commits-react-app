import React, { Component } from 'react';
import { Link } from "react-router-dom";
import APP_CONSTANTS from '../../config/app-constants'
import './header.scss';

class HeaderComponent extends Component {
    render() {
        return (
            <div className="centered blue-background padding full-width">
                <Link to={ APP_CONSTANTS.ROUTES.ROOT }><h1 className="no-margin white">{ 'COMMITS REACT APP' }</h1></Link>
            </div>
        );
    }
}

export default HeaderComponent;
