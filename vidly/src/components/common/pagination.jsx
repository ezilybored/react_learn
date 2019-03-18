import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = props => {
  // Destructures variables from props
  const { itemsCount, pageSize, currentPage, onPageChange } = props;

  // Calculates how many pages there should be
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <React.Fragment>
      <nav>
        <ul className="pagination">
          {/* The pages are mapped to list elements. one for every {pageSize} number of pages */}
          {pages.map(page => (
            <li
              key={page}
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
            >
              <a className="page-link" onClick={() => onPageChange(page)}>
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </React.Fragment>
  );
};

// Uses a separate package to set the type of each of the props. This allows easy catching of type errors
Pagination.PropTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
