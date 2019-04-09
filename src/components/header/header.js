import React, { Component } from 'react';
import { Link } from "react-router-dom";
import APP_CONSTANTS from '../../config/app-constants'
import './header.css';

class HeaderComponent extends Component {
    render() {
        return (
            <div className="header-container">
                <Link to={ APP_CONSTANTS.ROUTES.ROOT }><h1>{ 'COMMITS REACT APP' }</h1></Link>
            </div>
        );
    }
}

export default HeaderComponent;
