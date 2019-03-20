import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

// Destructures variables from props in the function
const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
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
              <button className="page-link" onClick={() => onPageChange(page)}>
                {page}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </React.Fragment>
  );
};

// Uses a separate package to set the type of each of the props. This allows easy catching of type errors
Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
