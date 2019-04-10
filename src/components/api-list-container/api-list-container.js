import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import axios from 'axios';
import APP_CONSTANTS from '../../config/app-constants';
import ApiListItemContainerComponent from "../api-list-item-container/api-list-item-container";
import './api-list-container.scss';

class ApiListContainerComponent extends Component {

    componentDidMount() {
        if (!this.props.commits.length) {
            this.props.dispatch({ type: APP_CONSTANTS.ACTIONS.LOADING, loading: true });
            axios.get(APP_CONSTANTS.ENDPOINTS.COMMITS)
                .then((res) => {
                    this.props.dispatch({ type: APP_CONSTANTS.ACTIONS.SET_COMMITS, commits: res.data});
                    this.props.dispatch({ type: APP_CONSTANTS.ACTIONS.LOADING, loading: false });
                }).catch((error) => {
                    this.props.dispatch({ type: APP_CONSTANTS.ACTIONS.LOADING, loading: false });
                });
        }
    }

    render() {
        const commits = this.props.commits;
        const commitsList = commits.length ? (
            commits.map((commit) => {
                return (
                    <div className="col-12 col-md-6 col-lg-4 padding" key={commit.sha}>
                        <Link to={APP_CONSTANTS.ROUTES.COMMITS + '/' + commit.sha}>
                            <ApiListItemContainerComponent commit={commit} />
                        </Link>
                    </div>
                )
            })
        ) : (
            <h1 className="centered">{ 'There are no commits yet!' }</h1>
        );

        return (
            <div className="row">
                {commitsList}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    commits: state.commits
});

export default connect(mapStateToProps)(ApiListContainerComponent);
