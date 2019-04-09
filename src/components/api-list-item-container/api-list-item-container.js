import React, { Component } from 'react';
import Moment from 'moment';
import APP_CONSTANTS from '../../config/app-constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './api-list-item-container.css';

class ApiListItemContainerComponent extends Component {
    render() {
        const commit = this.props.commit;
        
        return (
            <div className="list-item">
                <div className="avatar-container">
                    <img src={ commit.author.avatar_url } alt={ commit.author.login } title={ commit.author.login } />
                </div>
                <div className="info-container">
                    <h4 title={ commit.commit.message }>{ commit.commit.message }</h4>
                    <p>{ Moment(commit.commit.author.date).format(APP_CONSTANTS.FORMAT.DATE) }</p>
                    { commit.commit.comment_count } <FontAwesomeIcon icon="comment" />
                </div>
            </div>
        );
    }
}

export default ApiListItemContainerComponent;