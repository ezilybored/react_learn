import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";

class Movies extends Component {
  state = {
    // Gets the movie list from fakeMovieServices
    movies: getMovies()
  };

  handleDelete = movie => {
    console.log(movie);
    const movies = this.state.movies.filter(c => c._id !== movie._id);
    this.setState({ movies: movies });
  };

  render() {
    const { length: availableMovies } = this.state.movies;
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
            {this.state.movies.map(movie => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm m-2"
                    onClick={() => this.handleDelete(movie)}
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

export default Movies;
