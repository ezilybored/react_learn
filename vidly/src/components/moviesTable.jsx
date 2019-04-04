import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "./common/like";
import Table from "./common/table";
import auth from "../services/authService";

class MoviesTable extends Component {
  // Like and Delete can be passed in as objects, include all props to be passed
  columns = [
    {
      path: "title",
      label: "Title",
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" }
  ];

  // Conditionally adds the delete column to the table depending on whether the user is an admin or not
  deleteColumn = {
    key: "delete",
    content: movie => (
      <button
        className="btn btn-danger btn-md deletebutton"
        onClick={() => this.props.onDelete(movie)}
      >
        Delete
      </button>
    )
  };
  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
    if (user && !user.isAdmin) this.columns.push(this.likeColumn);
  }

  // Conditionally adds the like column to the table depending on whether the user is an admin or not
  likeColumn = {
    key: "like",
    content: movie => (
      <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
    )
  };

  render() {
    const { movies, sortColumn, onSort } = this.props;
    const user = auth.getCurrentUser();
    let classes = "tabletext";
    if (user && user.isAdmin) {
      classes = classes + " admin";
      console.log(classes);
    }

    return (
      <div className={classes}>
        <Table
          data={movies}
          sortColumn={sortColumn}
          onSort={onSort}
          columns={this.columns}
        />
      </div>
    );
  }
}

export default MoviesTable;
