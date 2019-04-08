import React, { Component } from 'react';
import axios from 'axios';
import ApiListItemContainerComponent from "../api-list-item-container-component/api-list-item-container-component";
import './api-list-container-component.css';

class ApiListContainerComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            commits: []
        };
    }

    componentDidMount() {
        axios.get('https://api.github.com/repositories/19438/commits')
            .then((res) => {
                this.setState({
                    commits: res.data
                });
            });
    }

    render() {
        const commits = this.state.commits;
        const commitsList = commits.length ? (
            commits.map((commit) => {
                return (
                    <div className="list-item-container" key={commit.sha}>
                        <ApiListItemContainerComponent commit={commit} />
                    </div>
                )
            })
        ) : (
            <h1 className="centered">There are no commits yet!</h1>
        );

        return (
            <div className="list-container centered">
                {commitsList}
            </div>
        );
    }
}

export default ApiListContainerComponent;
