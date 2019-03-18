import React, { Component } from "react";

class Movies2 extends Component {
  render() {
    // Sets the length value from this.state.movies as the variable availableMovies
    const { length: availableMovies } = this.props.movies;
    if (availableMovies === 0)
      return (
        <React.Fragment>
          <h2>BlankBuster Movies</h2>
          <p>There are no movies currently in the database</p>
        </React.Fragment>
      );

    return (
      <React.Fragment>
        <h2>BlankBuster Movies</h2>
        <p>Showing {availableMovies} movies currently available for rental</p>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.movies.map(movie => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  {/* An arrow function is used to pass the movie info to the handleDelete function with onClick */}
                  <button
                    className="btn btn-danger btn-sm m-2"
                    onClick={() => this.props.onDelete(movie)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Movies2;
