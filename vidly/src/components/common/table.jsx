import React from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

// Can destructure the props variable within the function. Neat
const Table = ({ columns, sortColumn, onSort, data }) => {
  return (
    <table className="table table-bordered text-center">
      <TableHeader
        className="thead-light"
        columns={columns}
        sortColumn={sortColumn}
        onSort={onSort}
      />
      <TableBody data={data} columns={columns} />
    </table>
  );
};

export default Table;
