import React, { Component } from "react";

// Creating a reusable table header component that can take any number or title columns
// Needs to take in an array of columns, sortColumn and onSort()
class TableHeader extends Component {
  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn };
    // Checks to see how the column is sorted at present. If there is a sort then toggle
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else if (path !== undefined) {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = column => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc" />;
    return <i className="fa fa-sort-desc" />;
  };

  // Renders the number and headings of th elements dynamically. Maps each column to a new th element
  render() {
    return (
      <thead className="tablehead-color">
        <tr>
          {this.props.columns.map(column => (
            <th
              className="clickable table-heading-text"
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
