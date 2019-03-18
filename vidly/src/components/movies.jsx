import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";

class Movies extends Component {
  state = {
    // Gets the movie list from fakeMovieServices
    movies: getMovies()
  };

  handleDelete = movie => {
    const movies = movies.filter(c => c._id !== movie._id);
    this.setState({ movies: movies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies: movies });

    // Also need to set the values in the server. This does not so far
  };

  render() {
    // Sets the length value from this.state.movies as the variable availableMovies
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
                  <Like
                    liked={movie.liked}
                    onClick={() => this.handleLike(movie)}
                  />
                </td>
                <td>
                  {/* An arrow function is used to pass the movie info to the handleDelete function with onClick */}
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
        <Pagination />
      </React.Fragment>
    );
  }
}

export default Movies;
