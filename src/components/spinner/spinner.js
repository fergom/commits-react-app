import React, { Component } from 'react';
import { connect } from 'react-redux';
import './spinner.css';

class SpinnerComponent extends Component {
    render() {
        const loading = this.props.loading;
        const spinner = loading ? (
            <div className="spinner-container centered">
                <div className="bounce1"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div>
            </div>
        ) : (
            <div className="no-display"></div>
        );

        return (
            <div>
                {spinner}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    loading: state.loading
});

export default connect(mapStateToProps)(SpinnerComponent);
