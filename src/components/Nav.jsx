import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

class Nav extends Component {

    render() {
        const { topics } = this.props;

        return (
            <nav className="Nav">
                <Link to={'/'} className="NavLink">{`< All Articles />`}</Link>
                {topics.map(topic => {
                    const { slug } = topic;
                    return (
                    <Link 
                        key={slug}
                        to={`topics/${slug}`}
                        className="NavLink" >
                    {`< ${slug} />`}
                    </Link>
                    )
                })}
            </nav>
        );
    };

};

Nav.propTypes = {

};

export default Nav;