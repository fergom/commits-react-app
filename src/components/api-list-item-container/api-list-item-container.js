import React, { Component } from 'react';
import Moment from 'moment';
import APP_CONSTANTS from '../../config/app-constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './api-list-item-container.scss';
import { get } from 'lodash';

class ApiListItemContainerComponent extends Component {
    render() {
        const commit = this.props.commit;

        return (
            <div className="list-item">
                <div className="avatar-container">
                    <img className="full-width rounded-image" src={ get(commit, 'author.avatar_url') } alt={ get(commit, 'author.login') } title={ get(commit, 'author.login') } />
                </div>
                <div className="info-container">
                    <h4 title={ get(commit, 'commit.message') }>{ get(commit, 'commit.message') }</h4>
                    <p className="no-margin">{ Moment(get(commit, 'commit.author.date')).format(APP_CONSTANTS.FORMAT.DATE) }</p>
                    <span>{ get(commit, 'commit.comment_count') }</span> <FontAwesomeIcon icon="comment" />
                </div>
            </div>
        );
    }
}

export default ApiListItemContainerComponent;
