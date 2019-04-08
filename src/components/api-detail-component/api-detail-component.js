import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';
import { get } from 'lodash';
import './api-detail-component.css';

class ApiDetailComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            commitDetail: {}
        };
    }

    componentDidMount() {
        this.setState({
            commitDetail: this.getCommitDetail()
        });
    }

    getCommitDetail() {
        const sha = this.props.match.params.sha;
        return this.props.commits.find((commit) => commit.sha === sha);
    }

    render() {
        const commitDetail = this.state.commitDetail;
        return (
            <div className="detail-container">
                <h1>{ get(commitDetail, 'commit.message') }</h1>
                <h4>{ get(commitDetail, 'sha') }</h4>
                <img src={ get(commitDetail, 'author.avatar_url') } alt={ get(commitDetail, 'author.login') } />
                <p>{ Moment(get(commitDetail, 'author.date')).format('DD/MM/YYYY') }</p>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    commits: state.commits
});

export default connect(mapStateToProps)(ApiDetailComponent);
