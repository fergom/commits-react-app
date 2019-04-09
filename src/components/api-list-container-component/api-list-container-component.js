import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import axios from 'axios';
import ApiListItemContainerComponent from "../api-list-item-container-component/api-list-item-container-component";
import './api-list-container-component.css';

class ApiListContainerComponent extends Component {

    componentDidMount() {
        if (!this.props.commits.length) {
            this.props.dispatch({ type: 'LOADING', loading: true });;
            axios.get('https://api.github.com/repositories/19438/commits')
                .then((res) => {
                    this.props.dispatch({ type: 'SET_COMMITS', commits: res.data});;
                    this.props.dispatch({ type: 'LOADING', loading: false });;
                }).catch((error) => {
                this.props.dispatch({ type: 'LOADING', loading: false });;
            });
        }
    }

    render() {
        const commits = this.props.commits;
        const commitsList = commits.length ? (
            commits.map((commit) => {
                return (
                    <div className="col-12 col-md-6 col-lg-4 list-item-container" key={commit.sha}>
                        <Link to={'commits/' + commit.sha}>
                            <ApiListItemContainerComponent commit={commit} />
                        </Link>
                    </div>
                )
            })
        ) : (
            <h1 className="centered">There are no commits yet!</h1>
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
