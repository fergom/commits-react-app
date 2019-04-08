import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './header-component.css';

class HeaderComponent extends Component {
    render() {
        return (
            <div className="header-container">
                <Link to="/"><h1>COMMITS REACT APP</h1></Link>
            </div>
        );
    }
}

export default HeaderComponent;
