import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/Error.css';

class Error extends Component {

    render() {
        const { message } = this.props.location.state;
        console.log( message ) ;
        return (
            <div>
                <h1>Oops!</h1>
                <h2>
                    {message}
                </h2>
            </div>
        );
    }
}

Error.propTypes = {

};

export default Error;