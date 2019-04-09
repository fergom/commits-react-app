import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import axios from 'axios';
import APP_CONSTANTS from '../../config/app-constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Moment from 'moment';
import { get } from 'lodash';
import './api-detail.css';

class ApiDetailComponent extends Component {

    componentDidMount() {
        this.loadCommitDetail();
    }

    loadCommitDetail() {
        if (this.props.commitDetail.sha !== this.props.match.params.sha) {
            this.props.dispatch({type: APP_CONSTANTS.ACTIONS.LOADING, loading: true});
            axios.get(APP_CONSTANTS.ENDPOINTS.COMMITS + '/' + this.props.match.params.sha)
                .then((res) => {
                    this.props.dispatch({type: APP_CONSTANTS.ACTIONS.SET_COMMIT_DETAIL, commitDetail: res.data});
                    this.props.dispatch({type: APP_CONSTANTS.ACTIONS.LOADING, loading: false});
                }).catch((error) => {
                    this.props.dispatch({type: APP_CONSTANTS.ACTIONS.LOADING, loading: false});
                });
        }
    }

    getGoBackTemplate() {
        return (
            <div className="col-12 margin-bottom go-back">
                <FontAwesomeIcon icon="chevron-left" />
                <span className="margin-left">
                        <Link to={ APP_CONSTANTS.ROUTES.ROOT }>{ 'GO BACK' }</Link>
                    </span>
            </div>
        );
    }

    getTitleTemplate(commitDetail) {
        return (
            <div className="col-12 margin-bottom">
                <a href={get(commitDetail, 'html_url')} target="blank"><h1>{ get(commitDetail, 'commit.message') }</h1></a>
                <h4>{ get(commitDetail, 'sha') }</h4>
                <p>{ 'Commited on ' + Moment(get(commitDetail, 'author.date')).format(APP_CONSTANTS.FORMAT.DATE_TIME) }</p>
            </div>
        );
    }

    getProfileSlot(commitDetail) {
        return (
            <div className="col-12 col-lg-4 margin-bottom">
                <div className="commit-info-slot">
                    <h4 className="margin-bottom">{ 'Author' }</h4>
                    <div className="profile-container">
                        <a href={ get(commitDetail, 'author.html_url') } target="blank">
                            <div className="image-container">
                                <img src={ get(commitDetail, 'author.avatar_url') } alt={ get(commitDetail, 'author.login') } />
                            </div>
                        </a>
                        <div className="profile-info-container">
                            <div className="margin-bottom">
                                <FontAwesomeIcon icon="user" /><span className="margin-left">{ 'Name: ' + get(commitDetail, 'commit.author.name') }</span>
                            </div>
                            <div className="margin-bottom">
                                <FontAwesomeIcon icon="id-card-alt" /><span className="margin-left">{ 'Username: ' + get(commitDetail, 'author.login') }</span>
                            </div>
                            <div className="margin-bottom">
                                <FontAwesomeIcon icon="envelope" /><a href={'mailto:' + get(commitDetail, 'commit.author.email')}><span className="margin-left">{ 'e-mail: ' + get(commitDetail, 'commit.author.email') }</span></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    getStatsSlot(commitDetail) {
        return (
            <div className="col-12 col-lg-4 margin-bottom">
                <div className="commit-info-slot">
                    <h4 className="margin-bottom">Stats</h4>
                    <div className="margin-bottom">
                        <FontAwesomeIcon icon="plus-circle" /><span className="margin-left">{ 'Additions: ' + get(commitDetail, 'stats.additions') }</span>
                    </div>
                    <div className="margin-bottom">
                        <FontAwesomeIcon icon="minus-circle" /><span className="margin-left">{ 'Deletions: ' + get(commitDetail, 'stats.deletions') }</span>
                    </div>
                    <div>
                        <FontAwesomeIcon icon="equals" /><span className="margin-left">{ 'Total: ' + get(commitDetail, 'stats.total') }</span>
                    </div>
                </div>
            </div>
        );
    }

    getFilesSlot(commitDetail) {
        return (
            <div className="col-12 col-lg-4 margin-bottom">
                <div className="commit-info-slot">
                    <h4 className="margin-bottom">Files</h4>
                    { commitDetail.files.map((file) => {
                        return (
                            <div key={file.sha}>
                                <FontAwesomeIcon icon="file-code" />
                                <a href={file.blob_url} target="blank">
                                    <span className="margin-left filename">{file.filename}</span>
                                </a>
                            </div>
                        )
                    }) }
                </div>
            </div>
        );
    }

    getCommitTemplate() {
        const commitDetail = this.props.commitDetail;

        return commitDetail.commit ? (
            <div className="row">
                { this.getGoBackTemplate() }
                { this.getTitleTemplate(commitDetail) }
                { this.getProfileSlot(commitDetail) }
                { this.getStatsSlot(commitDetail) }
                { this.getFilesSlot(commitDetail) }
            </div>
        ) : (
            <h1 className="centered">{ 'There is no commit with this sha!' }</h1>
        );
    }

    render() {
        return (
            this.getCommitTemplate()
        );
    }
}

const mapStateToProps = (state) => ({
    commits: state.commits,
    commitDetail: state.commitDetail
});

export default connect(mapStateToProps)(ApiDetailComponent);