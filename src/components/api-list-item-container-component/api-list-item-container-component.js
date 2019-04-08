import React, { Component } from 'react';
import Moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './api-list-item-container-component.css';

class ApiListItemContainerComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            commit: props.commit
        }
    }

    render() {
        return (
            <div className="list-item">
                <div className="avatar-container">
                    <img src={ this.state.commit.author.avatar_url } alt={ this.state.commit.author.login } title={ this.state.commit.author.login } />
                </div>
                <div className="info-container">
                    <h4 title={ this.state.commit.commit.message }>{ this.state.commit.commit.message }</h4>
                    <p>{ Moment(this.state.commit.commit.author.date).format('DD/MM/YYYY') }</p>
                    { this.state.commit.commit.comment_count } <FontAwesomeIcon icon="comment" />
                </div>
            </div>
        );
    }
}

export default ApiListItemContainerComponent;
