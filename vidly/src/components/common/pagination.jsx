import React, { Component } from "react";

class Pagination extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                3
              </a>
            </li>
          </ul>
        </nav>
      </React.Fragment>
    );
  }
}

export default Pagination;
