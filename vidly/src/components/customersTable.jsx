import React, { Component } from "react";
import Table from "./common/table";

class CustomersTable extends Component {
  // columns holds the titles of each table column
  // Could add some extra functionality here to track any rentals made or liked movies
  columns = [
    { path: "name", label: "Name" },
    { path: "email", label: "Email" },
    {
      key: "delete",
      content: user => (
        <button
          className="btn btn-danger btn-sm deletebutton"
          onClick={() => this.props.onDelete(user)}
        >
          Delete
        </button>
      )
    }
  ];

  render() {
    const { users, sortColumn, onSort } = this.props;
    return (
      <div>
        <h1 className="table-heading-text">Customers page</h1>
        <Table
          data={users}
          sortColumn={sortColumn}
          onSort={onSort}
          columns={this.columns}
        />
      </div>
    );
  }
}

export default CustomersTable;
