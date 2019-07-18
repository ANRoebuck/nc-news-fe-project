import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/Error.css';

class Error extends Component {

    render() {
        if (this.props.location && this.props.location.state) {
            const { status, message } = this.props.location.state;
            return (
                <div>
                    <h1>Oops!</h1>
                    <h2>
                        Error: {status}
                    </h2>
                    <h2 className="ErrorMessage">
                        {message}
                    </h2>
                </div>
            );
        } else {
            return (
                <div>
                <h1>Oops!</h1>
                <h2>
                    Error: 404
                </h2>
            </div>
            )
        }
    }
}

Error.propTypes = {

};

export default Error;