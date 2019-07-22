import React from 'react';
import PropTypes from 'prop-types';


const ArticleSortButton = props => {

    const up = '⇈';
    const down = '⇊';
    const { sortCategory, sort_by, order, changeSort } = props;
    const { id, category } = sortCategory;

    return (
        <div
            className="ArticleSort SortButton"
            id={id}
            key={`category${id}`}
            onClick={changeSort}
        >
        {category}
            {sort_by === id
            ? order === 'asc'
                ? ` ${up}`
                : ` ${down}`
            : null          }
        </div>
    );
};

ArticleSortButton.propTypes = {
    sortCategory: PropTypes.shape({
        category: PropTypes.string,
        id: PropTypes.string
    }).isRequired,
    sort_by: PropTypes.string.isRequired,
    order: PropTypes.string.isRequired,
    changeSort: PropTypes.func.isRequired
};

export default ArticleSortButton;