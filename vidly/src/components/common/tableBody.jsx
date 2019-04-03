import React, { Component } from "react";
import auth from "../../services/authService";
import _ from "lodash";

// Creating a reusable table hbody component that can take any amount of data
// Needs to take in an array of data, columns, sortColumn and onSort()

class TableBody extends Component {
  // Checks to see if the cell contains data or a function and renders accrodingly
  renderCell = (item, column) => {
    // If the column object has the content key then render as a function passing in the current item (in this case movie)
    // Returns a React element
    if (column.content) return column.content(item);

    // Otherwise return the lodash function to return the data in the item corespopnding to the column
    return _.get(item, column.path);
  };

  // Creates unique keys for each table cell
  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  render() {
    const { data, columns } = this.props;
    const user = auth.getCurrentUser();
    let classes = "tabletext";
    if (user && user.isAdmin) {
      classes = classes + " admin";
      console.log(classes);
    }
    return (
      <tbody className={classes}>
        {/* Dynamically rendering the table using the data and columns props passed in */}
        {data.map(item => (
          <tr key={item._id}>
            {columns.map(column => (
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
