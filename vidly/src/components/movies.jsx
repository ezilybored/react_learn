import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";

class Movies extends Component {
  state = {
    // Gets the movie list from fakeMovieServices
    movies: getMovies(),
    pageSize: 4,
    currentPage: 1
  };

  handleDelete = movie => {
    const movies = this.state.movies.filter(c => c._id !== movie._id);
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

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  render() {
    // Sets the length value from this.state.movies as the variable availableMovies
    const { length: availableMovies } = this.state.movies;
    // Extracts these values from the state using destructuring
    const { pageSize, currentPage, movies: allMovies } = this.state;
    if (availableMovies === 0)
      return (
        <React.Fragment>
          <h2>BlankBuster Movies</h2>
          <p>There are no movies currently in the database</p>
        </React.Fragment>
      );

    // Calls the paginate function from the utils folder paginate.js
    const movies = paginate(allMovies, currentPage, pageSize);

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
            {/* Applies the map method to the movies array returned from the paginate function */}
            {movies.map(movie => (
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
        <Pagination
          itemsCount={availableMovies}
          pageSize={pageSize}
          onPageChange={this.handlePageChange}
          currentPage={currentPage}
        />
      </React.Fragment>
    );
  }
}

export default Movies;
