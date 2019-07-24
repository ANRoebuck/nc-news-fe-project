import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { getTopics } from '../utils/utils';
import '../css/Nav.css';

class Nav extends Component {

    state = {
        topics: []
      };

    render() {
        const { topics } = this.state;

        return (
            <nav className="Nav">
                <Link to={'/'} className="NavLink">{`< All Articles />`}</Link>
                {topics.map(topic => {
                    const { slug } = topic;
                    return (
                        <Link 
                            key={slug}
                            to={`topics/${slug}`}
                            className="NavLink"
                        >
                            {`< ${slug} />`}
                        </Link>
                    )   
                })}
            </nav>
        );
    };

    componentDidMount () {
        this.fetchTopics();
    };
      
    fetchTopics = async () => {
        const topics = await getTopics();
        this.setState({ topics });
    };
      
};

    
Nav.propTypes = {
    topics: PropTypes.arrayOf(
        PropTypes.shape({
            description: PropTypes.string,
            slug: PropTypes.string
        })
    ).isRequired
};

export default Nav;